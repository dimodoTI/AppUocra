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
export class menuScreen extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.area = "body"
        this.current = ""
        this.mMenu = []
        this.mOrigen = 0
        this.mIdMenu = 0
        this.mIdNota = 0
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
        :host::-webkit-scrollbar {
            display: none;
        }
        :host([current="salud"]){
            background-image:var(--imagen-fondo-salud);
        }
        :host([current="capacitacion"]){
            background-image:var(--imagen-fondo-capacitacion);
        }
        :host([current="red"]){
            background-image:var(--imagen-fondo-red);
        }
        #cuerpo{
            display: grid;
            position: relative;
            grid-template-rows:15% 85%;
            width: 100%;
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
        :host([current="salud"]) #titulo{
            background-image:var(--imagen-cabecera-salud);
        }
        :host([current="capacitacion"]) #titulo{
            background-image:var(--imagen-cabecera-capacitacion);
        }
        :host([current="red"]) #titulo{
            background-image:var(--imagen-cabecera-red);
        }
        #atras{
            background-image:var(--imagen-atras-gremio);
            background-repeat: no-repeat;
            background-position: center;
            background-size:  6vh;
            cursor: pointer;
        }

        :host([current="salud"]) #atras{
            background-image:var(--imagen-atras-salud);
        }
        :host([current="capacitacion"]) #atras{
            background-image:var(--imagen-atras-capacitacion);
        }
        :host([current="red"]) #atras{
            background-image:var(--imagen-atras-red);
        }
        #texto{
            align-self:center;
            font-size: var(--font-header-h1-size);
            font-weight: var(--font-header-h1-weight);
        }
        #menu{
            display:grid;
            position:relative;
            width:100%;
            font-size: var(--font-header-h1-size);
            font-weight: var(--font-header-h1-weight);
            color:var(--color-blanco);  
            justify-content: center;     
            grid-gap:.8rem;
            align-content: flex-start;
            overflow-y: auto;
            overflow-x: hidden;
        }
        #menu::-webkit-scrollbar {
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
            <div id="menu">
                ${!this.mMenu ? "" : this.mMenu.filter(item => { return item.origen == this.mOrigen && item.idMenu == this.mIdMenu }).map((item) => {
            return html` 
                        <div id="ciDivEtiqueta" .item=${item} @click="${this.proximo}">
                            <div id="ciDivIcomo">${CHECK}</div>
                            <div id="ciDivNombre">${item.descripcion}</div>
                        </div>

                    `})}
            </div>
        </div>
        `
    }
    stateChanged(state, name) {
        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.current = state.screen.name
            this.hidden = true
            const haveBodyArea = isInLayout(state, this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-gremio-salud-capacitacion-red-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false
                this.mMenu = state.menu.entities
                this.mIdMenu = 0;
                this.mOrigen = 0;
                if (state.ui.menu.items.length == 1) {
                    this.mIdMenu = 0;
                    this.mOrigen = state.ui.menu.items[0].origen;
                } else {
                    this.mIdMenu = state.ui.menu.items[state.ui.menu.items.length - 1].id;
                    this.mOrigen = 0;
                }
                //if (this.menu.)
            }
        }
        this.update();
    }
    proximo(e) {
        let arr = e.currentTarget.item;
        if (arr.idNota == 0) {
            var item = store.getState().ui.menu.items
            item.push({ id: arr.id, idMenu: arr.idMenu, idNota: arr.idMenu, origen: this.mOrigen, web: "" })
            store.dispatch(setMenu(this.current, item))
            store.dispatch(goTo(this.current));
        } else {
            var item = store.getState().ui.menu.items
            item.push({ id: arr.id, idMenu: arr.idMenu, idNota: arr.idNota, origen: this.mOrigen, web: "" })
            store.dispatch(setMenu(this.current, item))
            store.dispatch(goTo("noticia"));
        }
    }

    atras() {
        if (store.getState().ui.menu.items.length == 1) {
            store.dispatch(setMenu("", []))
            store.dispatch(goTo("principal"));
        } else {
            var item = store.getState().ui.menu.items
            item.splice(item.length - 1, 1);
            store.dispatch(setMenu(this.current, item))
            store.dispatch(goTo(this.current));
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
window.customElements.define("menu-screen", menuScreen);