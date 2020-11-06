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
import { TRASH } from "../../../assets/icons/icons";
import {
    goTo
} from "../../redux/routing/actions"
import {
    isInLayout
} from "../../redux/screens/screenLayouts";
import {
    CHECK
} from "../../../assets/icons/icons"
import { setMenu, showWarning } from "../../redux/ui/actions";
import {getNotificacion as get_notifi} from "../../redux/notifi/actions"
import { prendeNotificacion, apagaNotificacion } from "../../redux/notifi/actions";

const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";
const NOTIFI_TIMESTAMP = "notifi.entityNotificacionesTimeStamp"
const NOTIFI_ERRORGETTIMESTAMP = "notifi.entityNotificacionesErrorTimeStamp"

export class notificacionScreen extends connect(store, NOTIFI_TIMESTAMP, NOTIFI_ERRORGETTIMESTAMP, MEDIA_CHANGE, SCREEN)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.area = "body"
        this.current = ""
        this.notif = []

    }

    static get styles() {
        return css`
        :host{
            display: grid;
            position:relative;
            background-color:var(--primary-color) !important;
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
        #divEtiqueta{
            position:relative;
            display: grid; 
            height: auto;
            width: 92vw;
            background-color:rgba(21, 21, 21, .6) ;;
            grid-auto-flow: row;
            grid-gap:.5vh;
            align-items: center;
            border-radius: .6rem;  
            opacity:1;
            padding: 2vw;
            box-shadow: var(--shadow-elevation-3-box);
        }
        #divEliminar{
            justify-self: right;
        }
        #divTitulo{
            font-size:.7rem;
            color: var(--color-gris);
        }
        #divCuerpo{
            font-size:.8rem;
        }
        #divFecha{
            font-size:.4rem;
            text-align: right;
        }
        svg {
            height: 3vh;
            width: 3vh;
            fill: white;
        }
        svg:hover {
            cursor: pointer;
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
               ${this.notif.filter(item => {return item.Activo}).map((item) => { return html` 
                        <div id="divEtiqueta">
                            <div id="divEliminar" .item=${item} @click="${this.eliminar}">${TRASH}</div>
                            <div id="divTitulo">${item.Titulo}</div>
                            <div id="divCuerpo">${item.Cuerpo}</div>
                            <div id="divFecha">${this.verFecha(item.FechaPublicacion)}</div>
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
            const SeMuestraEnUnasDeEstasPantallas = "-notificacion-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false
                this.notif = state.notifi.entityNotificaciones
            }
            this.update();
        }
        if (name == NOTIFI_TIMESTAMP) {
            this.notif = state.notifi.entityNotificaciones
            this.update();
        }
        if (name == NOTIFI_ERRORGETTIMESTAMP) {
        }
    }
    proximo(e) {
    }

    eliminar(e) {
        let mId = e.currentTarget.item.Id
        let mFecha = new Date(e.currentTarget.item.FechaPublicacion)
        var mBorrados = {}     
        if (localStorage.getItem("notifi") != null) {
            mBorrados = JSON.parse(localStorage.getItem("notifi"))
        } 
        if(!mBorrados[mId]){
            mBorrados[mId]={"fecha": mFecha.getTime()}
        }
        localStorage.setItem("notifi", JSON.stringify(mBorrados));
        store.dispatch(get_notifi({filter: "FechaPublicacion ge " + store.getState().notifi.fechaDesdeGet}, store.getState().notifi.fechaDesdeGet));
    }

    verFecha(fecha) {
        const f = fecha.toString();
        return f.substring(8, 10) + "/" + f.substring(5, 7) + "/" + f.substring(0, 4);
    }
    atras() {
        store.dispatch(goTo("principal"));
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
window.customElements.define("notificacion-screen", notificacionScreen);