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
    CHECK
} from "../../../assets/icons/icons"
import {
    cardMenu
} from "../css/cardMenu"
import { setMenu } from "../../redux/ui/actions";

const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";
export class webScreen extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.area = "body"
        this.current = ""
        this.estilo = ""
        this.mMenu = []
        this.mOrigen = 0
        this.mIdMenu = 0
        this.mIdNota = 0
        this.noticia = { titulo: "", imagen: "", cuerpo: "", descripcionlink: "", link: "" }
    }

    static get styles() {
        return css`
        ${cardMenu}
        :host{
            display: grid;
            position:relative;
            background-color:transparent !important;
            background-image:var(--imagen-fondo-principal);
            background-repeat: no-repeat;
            background-position: center;
            background-size:  cover;
            overflow-x:none;
            overflow-y:auto;
            grid-template-rows:100%;
            
        }
        :host([hidden]){
            display:none ;
        }
        :host([estilo="salud"]){
            background-image:var(--imagen-fondo-salud);
        }
        :host([estilo="capacitacion"]){
            background-image:var(--imagen-fondo-capacitacion);
        }
        :host([estilo="red"]){
            background-image:var(--imagen-fondo-red);
        }
        #cuerpo{
            display: grid;
            position: relative;
            grid-template-rows:15% 85%;
            width: 100%;
            height: 100%;
        }
        #titulo{
            display: grid;
            position:relative;
            width: 100%;
            grid-gap:.1rem;
            grid-template-columns: 15% 85%;
            background-color:var(--color-blanco) !important;
            background-image:var(--imagen-cabecera-uocra);
            background-repeat: no-repeat;
            background-position: center;
            background-size:  auto 8vh;
            border-bottom: solid 4px var(--primary-color)
        }
        :host([estilo="salud"]) #titulo{
            background-image:var(--imagen-cabecera-salud);
        }
        :host([estilo="capacitacion"]) #titulo{
            background-image:var(--imagen-cabecera-capacitacion);
        }
        :host([estilo="red"]) #titulo{
            background-image:var(--imagen-cabecera-red);
        }

        #atras{
            background-image:var(--imagen-atras-gremio);
            background-repeat: no-repeat;
            background-position: center;
            background-size:  6vh;
        }
        :host([estilo="salud"]) #atras{
            background-image:var(--imagen-atras-salud);
        }
        :host([estilo="capacitacion"]) #atras{
            background-image:var(--imagen-atras-capacitacion);
        }
        :host([estilo="red"]) #atras{
            background-image:var(--imagen-atras-red);
        }
        #texto{
            align-self:center;
            font-size: var(--font-header-h1-size);
            font-weight: var(--font-header-h1-weight);
        }
        #noticia{
            display:grid;
            position:relative;
            padding: 0 0 0 0;
            font-size: var(--font-header-h1-size);
            font-weight: var(--font-header-h1-weight);
            color:var(--color-blanco);  
            grid-gap:.8rem;
            align-content: flex-start;
            overflow-y: auto;
            overflow-x: hidden;
            grid-auto-flow: row;
        }
        #noticia::-webkit-scrollbar {
            display: none;
        }
        #noticia iframe{
            display: block; 
            width: 100%; 
            height: 100%; 
            border: none;
        }

        #nTitulo{
            display:grid;
            font-size: var(--font-header-h1-menos-size);
            font-weight: bolder;
            color: var(--color-blanco);
            text-align: center;
            width:95%;
            justify-self:center;
            background-image:var(--imagen-cabecera-uocra);
            background-repeat: no-repeat;
            background-position: center;
            background-size:  auto 8vh;
            border-bottom: solid 4px var(--primary-color)
        }
        :host([estilo="salud"]) #titulo{
            background-image:var(--imagen-cabecera-salud);
        }
        :host([estilo="capacitacion"]) #titulo{
            background-image:var(--imagen-cabecera-capacitacion);
        }
        :host([estilo="red"]) #titulo{
            background-image:var(--imagen-cabecera-red);
        }
        #nImagen{
          
        }
        #nCuerpo{
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);
            color: var(--color-blanco);
            justify-self:center;              
            text-align: justify;
            width:95%;
            -webkit-user-modify: read-write-plaintext-only;
            background-color:var(--color-gris-oscuro);
            padding: 1rem;
            opacity:.8;
            border-radius: 1rem;
       }
        #nLink{
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);              
            text-align: left;
            text-decoration: underline;
        }
        #myFrame::-webkit-scrollbar {
            display: none;
        }
        `
    }
    render() {
        return html`
        <div id="cuerpo">
            <div id="titulo">
                <div id="atras"  @click=${this.atras}></div>
                <div id="texto"></div>
            </div>
            <div id="noticia">
                <iframe id="myFrame" style="background-color:var(--color-blanco)"></iframe>
            </div>
        </div>
        `
    }
    stateChanged(state, name) {
        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.current = state.screen.name
            this.estilo = state.ui.menu.estilo
            this.hidden = true
            const haveBodyArea = isInLayout(state, this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-web-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false
                this.mMenu = state.menu.entities
                this.mIdMenu = 0;
                this.mOrigen = 0;
                this.noticia = state.ui.menu.items[state.ui.menu.items.length - 1];
                this.mIdNota = this.noticia.idNota;
                var myLink = this.noticia.web
                if (myLink.toUpperCase().indexOf("HTTP:") == -1 || myLink.toUpperCase().indexOf("HTTPS:") == -1) {
                    myLink = "https://" + this.noticia.web
                }
                this.shadowRoot.querySelector("#myFrame").src = myLink

            }
        }
        this.update();
    }

    atras() {
        var item = store.getState().ui.menu.items
        item.splice(item.length - 1, 1);
        store.dispatch(goTo("noticia"));
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
            },
            estilo: {
                type: String,
                reflect: true
            }
        }

    }
}
window.customElements.define("web-screen", webScreen);