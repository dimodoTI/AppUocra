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
    get as get_menu, set as set_menu
} from "../../redux/menu/actions"
import {
    get as get_noticia, set as set_noticia
} from "../../redux/noticia/actions"
import {
    get as get_version, set as set_version
} from "../../redux/version/actions"
import { showWarning, setMenu } from "../../redux/ui/actions";


const MENU_TIMESTAMP = "menu.timeStamp"
const MENU_ERRORGETTIMESTAMP = "menu.errorTimeStamp"
const NOTICIA_TIMESTAMP = "noticia.timeStamp"
const NOTICIA_ERRORGETTIMESTAMP = "noticia.errorTimeStamp"
const VERSION_TIMESTAMP = "version.timeStamp"
const VERSION_ERRORGETTIMESTAMP = "version.errorTimeStamp"
const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";
export class principalScreen extends connect(store, VERSION_TIMESTAMP, VERSION_ERRORGETTIMESTAMP, MENU_TIMESTAMP, MENU_ERRORGETTIMESTAMP, NOTICIA_TIMESTAMP, NOTICIA_ERRORGETTIMESTAMP, MEDIA_CHANGE, SCREEN)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.area = "body"
        this.current = ""
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
            grid-gap:2vh;
        }
        :host([media-size="large"]) .punto{
            grid-template-rows: 25vw auto;        
        }
        .texto{
            font-size: var(--font-label-size);
            font-weight: var(--font-label-weight);
            color: var(--color-blanco);
            justify-self:center;
            cursor: pointer;
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
            cursor: pointer;
        }
        .imagen:active{
            -webkit-tap-highlight-color: transparent;
            background-size:  24vh;           
        }
        :host([media-size="large"]) .imagen{
            background-size:  18vw;           
            background-position: center;
        }
        :host([media-size="large"]) .imagen:active{
            background-size:  20vw;           
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
        <div id="cuerpo">
            <div id="titulo"></div>
            <div >
                <hr id="linea" />
            </div>
            <div id="contenido">
                <div id="uocra" class="punto" @click="${this.clickGremio}">
                    <div id="uocraImg" class="imagen" >.</div>
                    <div id="uocraTxt" class="texto" >MI SINDICATO</div>
                </div>
                <div id="salud" class="punto" @click="${this.clickSalud}">
                    <div id="saludImg" class="imagen" ></div>
                    <div id="saludTxt" class="texto">CONSTRUIR SALUD</div>
                </div>
                <div id="capacitacion" class="punto" @click="${this.clickCapacitacion}">
                    <div id="capacitacionImg" class="imagen"></div>
                    <div id="capacitacionTxt" class="texto">CAPACITACION Y CULTURA</div>
                </div>
                <div id="red" class="punto" @click="${this.clickRed}">
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
        if (name == VERSION_TIMESTAMP && this.current == "principal") {
            // if (localStorage.getItem("version") == null) {
            //     localStorage.setItem("version", JSON.stringify(state.version.entities));
            // }
            //let sVersion = JSON.parse(localStorage.getItem("version"));
            if (localStorage.getItem("version") == null || JSON.parse(localStorage.getItem("version"))[0].numero != state.version.entities[0].numero) {
                localStorage.clear();
                localStorage.setItem("version", JSON.stringify(state.version.entities));
                store.dispatch(get_menu({ orderby: "origen,idMenu,orden", filter: "Activo" }))
            } else {
                let sMenu = JSON.parse(localStorage.getItem("menu"));
                if (sMenu != null) {
                    store.dispatch(set_menu(sMenu))
                } else {
                    store.dispatch(get_menu({ orderby: "origen,idMenu,orden", filter: "Activo" }))
                }
            }
        }
        if (name == VERSION_ERRORGETTIMESTAMP && this.current == "principal") {
            let sMenu = localStorage.getItem("menu");
            let sNoticia = localStorage.getItem("noticia");
            if (sMenu != null && sNoticia != null) {
                store.dispatch(set_menu(JSON.parse(sMenu)))
            } else {
                store.dispatch(showWarning(store.getState().screen.name, 0))
            }
        }

        if (name == MENU_TIMESTAMP && this.current == "principal") {
            if (localStorage.getItem("menu") == null) {
                localStorage.setItem("menu", JSON.stringify(state.menu.entities));
            }
            let sNoticia = localStorage.getItem("noticia");
            if (sNoticia != null) {
                store.dispatch(set_noticia(JSON.parse(sNoticia)))
            } else {
                store.dispatch(get_noticia({ orderby: "id", filter: "Activo" }))
            }
        }
        if (name == NOTICIA_TIMESTAMP && this.current == "principal") {
            if (localStorage.getItem("noticia") == null) {
                localStorage.setItem("noticia", JSON.stringify(state.noticia.entities));
            }
            if (state.menu.entities) {
                store.dispatch(goTo(state.ui.menu.estilo));
            }
        }
        if (name == MENU_ERRORGETTIMESTAMP && this.current == "principal") {
            if (!state.menu.entities || !state.noticia.entities) {
                store.dispatch(showWarning(store.getState().screen.name, 0))
            }
        }
        if (name == NOTICIA_ERRORGETTIMESTAMP && this.current == "principal") {
            if (!state.menu.entities || !state.noticia.entities) {
                store.dispatch(showWarning(store.getState().screen.name, 0))
            }
        }
    }

    clickGremio() {
        this.clickIr("gremio", 1);
    }
    clickSalud() {
        this.clickIr("salud", 2);
    }
    clickCapacitacion() {
        this.clickIr("capacitacion", 3);
    }
    clickRed() {
        this.clickIr("red", 4);
    }
    clickIr(pagina, origen) {
        store.dispatch(setMenu(pagina, [{ id: 0, idMenu: 0, idNota: 0, origen: origen, web: "" }]))
        if (!store.getState().menu.entities || !store.getState().noticia.entities) {
            store.dispatch(get_version({}))
        } else {
            store.dispatch(goTo(store.getState().ui.menu.estilo));
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