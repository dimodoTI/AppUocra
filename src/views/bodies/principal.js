import {
    html,
    LitElement,
    css
} from "lit-element";
import {
    store
} from "../../redux/store";
import {
    connect
} from "@brunomon/helpers";
import {
    goTo
} from "../../redux/routing/actions"
import {
    isInLayout
} from "../../redux/screens/screenLayouts";
import {
    get as get_menu
} from "../../redux/menu/actions"
import {
    get as get_noticia
} from "../../redux/noticia/actions"
import { showWarning, setMenu } from "../../redux/ui/actions";


const MENU_TIMESTAMP = "menu.timeStamp"
const MENU_ERRORGETTIMESTAMP = "menu.errorTimeStamp"
const NOTICIA_TIMESTAMP = "noticia.timeStamp"
const NOTICIA_ERRORGETTIMESTAMP = "noticia.errorTimeStamp"
const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";
export class principalScreen extends connect(store, MENU_TIMESTAMP, MENU_ERRORGETTIMESTAMP, NOTICIA_TIMESTAMP, NOTICIA_ERRORGETTIMESTAMP, MEDIA_CHANGE, SCREEN)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.area = "body"
        this.current = ""
        this.paginaSiguiente = ""
        this.errorGet = 0
    }

    static get styles() {
        return css`
        :host{
            display: grid;
            position:relative;
            background-color:transparent !important;
            background-image:var(--imagen-fondo-principal);
            background-repeat: no-repeat;
            background-position: center;
            background-size:  cover;
            overflow: hidden;
        }
        :host([hidden]){
            display:none ;
        }
        #cuerpo{
            display: grid;
            height: 95%;
            width: 100%;
            grid-gap:0rem;
            grid-template-rows: 15% 2% 71% 2% 10%;
            border-radius:2rem;
            background-color:transparent;
            align-self:center;
        }
        #titulo{
            height: 100%;
            width: 100%;
            background-image:var(--imagen-titulo-principal);
            background-repeat: no-repeat;
            background-position: center;
            background-size:  auto 10vh;
        }
        #linea{
            color: var(--color-blanco); 
            width:80%;
        }
        #notificacion{
            height:100%;
            background-image:var(--imagen-campana-notificacion);
            background-repeat: no-repeat;
            background-position: bottom;
            background-size:  6vh;
        }
        #contenido{
            display:grid;
            position:relative;
            height:90%;
            width:100%;
            grid-template-columns: 50% 50%;
            grid-template-rows: 50% 50%;
            align-self:center;
        }
        :host([media-size="large"]) #contenido{
            height:30vw;
            grid-template-columns: 25% 25% 25% 25%;
            grid-template-rows: 100%;        
        }
        .punto{
            display:grid;
            position:relative;
            grid-template-rows: 90% 10%;
            grid-gap:2vh
        }
        :host([media-size="large"]) .punto{
            grid-template-rows: 25vw auto;        
        }
        .texto{
            font-size: var(--font-label-size);
            font-weight: var(--font-label-weight);
            color: var(--color-blanco);
            justify-self:center;
        }
        :host([media-size="large"]) .texto{
            font-size: 1.5vw;
        }
        .imagen{
            height:100%;
            width:100%;
            background-repeat: no-repeat;
            background-position: bottom;
            background-size:  20vh;           
        }
        :host([media-size="large"]) .imagen{
            background-size:  18vw;           
            background-position: center;
        }
        #uocraImg{
            background-image:var(--imagen-gremio);
        }
        #saludImg{
            background-image:var(--imagen-salud);
        }
        #capacitacionImg{
            background-image:var(--imagen-capacitacion);
        }
        #redImg{
            background-image:var(--imagen-red);
        }
        `
    }
    render() {
        return html`
        <div id="cuerpo" @click=${this.proximo}>
            <div id="titulo"></div>
            <div >
                <hr id="linea" />
            </div>
            <div id="contenido">
                <div id="uocra" class="punto" @click="${function () { this.clickIr('gremio', 1) }}">
                    <div id="uocraImg" class="imagen">.</div>
                    <div id="uocraTxt" class="texto">MI GREMIO</div>
                </div>
                <div id="salud" class="punto" @click="${function () { this.clickIr('salud', 2) }}">
                    <div id="saludImg" class="imagen"></div>
                    <div id="saludTxt" class="texto">CONSTRUIR SALUD</div>
                </div>
                <div id="capacitacion" class="punto" @click="${function () { this.clickIr('capacitacion', 3) }}">
                    <div id="capacitacionImg" class="imagen"></div>
                    <div id="capacitacionTxt" class="texto">CAPACITACION Y CULTURA</div>
                </div>
                <div id="red" class="punto" @click="${function () { this.clickIr('red', 4) }}">
                    <div id="redImg" class="imagen"></div>
                    <div id="redTxt" class="texto">NUESTRA RED</div>
                </div>
            </div>
            <div>
                <hr id="linea" />
            </div>
            <div id="notificacion"></div>
        </div>
        `
    }
    stateChanged(state, name) {

        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = true
            this.current = state.screen.name
            const haveBodyArea = isInLayout(state, this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-principal-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false
            }
            this.update();
        }
        if (name == MENU_TIMESTAMP && this.current == "principal") {
            if (state.noticia.entities) {
                store.dispatch(goTo(this.paginaSiguiente));
            }
        }
        if (name == NOTICIA_TIMESTAMP && this.current == "principal") {
            if (state.menu.entities) {
                store.dispatch(goTo(this.paginaSiguiente));
            }
        }
        if (name == MENU_ERRORGETTIMESTAMP && this.current == "principal") {
            this.errorGet = this.errorGet + 1
            if (this.errorGet == 1) store.dispatch(showWarning(store.getState().screen.name, 0))
        }
        if (name == NOTICIA_ERRORGETTIMESTAMP && this.current == "principal") {
            this.errorGet = this.errorGet + 1
            if (this.errorGet == 1) store.dispatch(showWarning(store.getState().screen.name, 0))
        }
    }

    clickIr(pagina, origen) {
        store.dispatch(setMenu(pagina, [{ id: 0, idMenu: 0, idNota: 0, origen: origen, web: "" }]))
        this.paginaSiguiente = pagina;
        if (!store.getState().menu.entities || !store.getState().noticia.entities) {
            this.errorGet = 0
            store.dispatch(get_menu({ orderby: "origen,idMenu,orden", filter: "Activo" }))
            store.dispatch(get_noticia({ orderby: "id", filter: "Activo" }))
        } else {
            store.dispatch(goTo(this.paginaSiguiente));
        }
    }

    static get properties() {
        return {
            mediaSize: {
                type: String,
                reflect: true,
                attribute: 'media-size'
            },
            layout: {
                type: String,
                reflect: true,
            },
            hidden: {
                type: Boolean,
                reflect: true,
            },
            area: {
                type: String
            },
            current: {
                type: String,
                reflect: true
            }
        }
    }

}
window.customElements.define("principal-screen", principalScreen);