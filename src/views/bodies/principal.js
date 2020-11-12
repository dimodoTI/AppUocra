/** @format */

import { html, LitElement, css } from "lit-element";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { goTo } from "../../redux/routing/actions";
import { isInLayout } from "../../redux/screens/screenLayouts";
import { get as get_menu, set as set_menu } from "../../redux/menu/actions";
import { get as get_noticia, set as set_noticia } from "../../redux/noticia/actions";
import { get as get_version, set as set_version } from "../../redux/version/actions";
import { getNotificacion as get_notifi } from "../../redux/notifi/actions";
import { showWarning, setMenu } from "../../redux/ui/actions";
import { mostrarNotificaciones, apagaNotificacion } from "../../redux/notifi/actions";

const MENU_TIMESTAMP = "menu.timeStamp";
const MENU_ERRORGETTIMESTAMP = "menu.errorTimeStamp";
const NOTICIA_TIMESTAMP = "noticia.timeStamp";
const NOTICIA_ERRORGETTIMESTAMP = "noticia.errorTimeStamp";
const NOTIFI_TIMESTAMP = "notifi.entityNotificacionesTimeStamp";
const NOTIFI_ERRORGETTIMESTAMP = "notifi.entityNotificacionesErrorTimeStamp";
const VERSION_TIMESTAMP = "version.timeStamp";
const VERSION_ERRORGETTIMESTAMP = "version.errorTimeStamp";
const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const PRENDE_NOTIFICACION = "notifi.prendeNotificacionTimeStamp";
const APAGA_NOTIFICACION = "notifi.apagaNotificacionTimeStamp";

export class principalScreen extends connect(store, NOTIFI_TIMESTAMP, NOTIFI_ERRORGETTIMESTAMP, PRENDE_NOTIFICACION, APAGA_NOTIFICACION, VERSION_TIMESTAMP, VERSION_ERRORGETTIMESTAMP, MENU_TIMESTAMP, MENU_ERRORGETTIMESTAMP, NOTICIA_TIMESTAMP, NOTICIA_ERRORGETTIMESTAMP, MEDIA_CHANGE, SCREEN)(LitElement) {
	constructor() {
		super();
		this.hidden = true;
		this.area = "body";
		this.current = "";
	}

	static get styles() {
		return css`
			:host {
				display: grid;
				position: relative;
				background-color: transparent !important;
				background-image: var(--imagen-fondo-principal);
				background-repeat: no-repeat;
				background-position: center;
				background-size: cover;
				overflow: hidden;
			}
			:host([hidden]) {
				display: none;
			}
			#cuerpo {
				display: grid;
				height: 95%;
				width: 100%;
				grid-gap: 0rem;
				grid-template-rows: 15% 2% 71% 2% 10%;
				border-radius: 2rem;
				background-color: transparent;
				align-self: center;
			}
			#divVersion {
				position: absolute;
				top: 2px;
				right: 4px;
				font-size: 2vh;
				color: var(--color-gris);
			}
			#titulo {
				height: 100%;
				width: 100%;
				background-image: var(--imagen-titulo-principal);
				background-repeat: no-repeat;
				background-position: center;
				background-size: auto 10vh;
			}
			#linea {
				color: var(--color-blanco);
				width: 80%;
			}
			#notificacion {
				height: 100%;
				background-image: var(--imagen-campana);
				background-repeat: no-repeat;
				background-position: bottom;
				background-size: 6vh;
				cursor: pointer;
			}
			#notificacion[si] {
				background-image: var(--imagen-campana-notificacion);
				cursor: pointer;
			}
			#contenido {
				display: grid;
				position: relative;
				height: 90%;
				width: 100%;
				grid-template-columns: 50% 50%;
				grid-template-rows: 50% 50%;
				align-self: center;
			}
			:host([media-size="large"]) #contenido {
				height: 30vw;
				grid-template-columns: 25% 25% 25% 25%;
				grid-template-rows: 100%;
			}
			.punto {
				display: grid;
				position: relative;
				grid-template-rows: 90% 10%;
				grid-gap: 2vh;
			}
			:host([media-size="large"]) .punto {
				grid-template-rows: 25vw auto;
			}
			.texto {
				font-size: var(--font-label-size);
				font-weight: var(--font-label-weight);
				color: var(--color-blanco);
				justify-self: center;
				cursor: pointer;
			}
			:host([media-size="large"]) .texto {
				font-size: 1.5vw;
			}
			.imagen {
				height: 100%;
				width: 100%;
				background-repeat: no-repeat;
				background-position: bottom;
				background-size: 20vh;
				cursor: pointer;
			}
			.imagen:active {
				-webkit-tap-highlight-color: transparent;
				background-size: 24vh;
			}
			:host([media-size="large"]) .imagen {
				background-size: 18vw;
				background-position: center;
			}
			:host([media-size="large"]) .imagen:active {
				background-size: 20vw;
			}
			#uocraImg {
				background-image: var(--imagen-gremio);
			}

			#saludImg {
				background-image: var(--imagen-salud);
			}
			#capacitacionImg {
				background-image: var(--imagen-capacitacion);
			}
			#redImg {
				background-image: var(--imagen-red);
			}
		`;
	}
	render() {
		return html`
			<div id="cuerpo">
				<div id="divVersion">V.: 1.2</div>
				<div id="titulo"></div>
				<div>
					<hr id="linea" />
				</div>
				<div id="contenido">
					<div id="uocra" class="punto" @click="${this.clickGremio}">
						<div id="uocraImg" class="imagen">.</div>
						<div id="uocraTxt" class="texto">MI SINDICATO</div>
					</div>
					<div id="salud" class="punto" @click="${this.clickSalud}">
						<div id="saludImg" class="imagen"></div>
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
				<div id="notificacion" @click="${this.notif}"></div>
			</div>
		`;
	}
	stateChanged(state, name) {
		if (name == SCREEN || name == MEDIA_CHANGE) {
			this.mediaSize = state.ui.media.size;
			this.hidden = true;
			this.current = state.screen.name;
			const haveBodyArea = isInLayout(state, this.area);
			const SeMuestraEnUnasDeEstasPantallas = "-principal-".indexOf("-" + state.screen.name + "-") != -1;
			if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
				this.hidden = false;

				if (state.notifications.ws && state.notifications.ws.readyState == WebSocket.OPEN) {
					console.log("conectado");
				} else {
					if (state.notifications.ws) {
						console.log("desconectado " + state.notifications.ws.readyState);
						// WSconnect();
					}
				}
				//connectWs();
				//if (state.notifi.wsConexion!=null){
				/*  if (typeof state.notifi.wsConexion === 'undefined' || state.notifi.wsConexion == null){
                    let myWs = null
                    store.dispatch(wsConexion(myWs))
                }else{
                    if (state.notifi.wsConexion.action.readyState !== WebSocket.OPEN){
                        let myWs = null
                        store.dispatch(wsConexion(myWs))   

                        this.irNotificacion = false
                        var d = new Date();
                        d.setDate(d.getDate()-10);
                        let fecha =  d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
                        store.dispatch(get_notifi({filter: "FechaPublicacion ge " + fecha}, fecha));
                       
                    }
                } */
				//store.dispatch(wsConexion(state.notifi.wsConexion))
				//}
			}
			this.update();
		}
		if (name == VERSION_TIMESTAMP && this.current == "principal") {
			// if (localStorage.getItem("version") == null) {
			//     localStorage.setItem("version", JSON.stringify(state.version.entities));
			// }
			//let sVersion = JSON.parse(localStorage.getItem("version"));
			if (localStorage.getItem("version") == null || JSON.parse(localStorage.getItem("version"))[0].numero != state.version.entities[0].numero) {
				//localStorage.clear();
				localStorage.removeItem("version");
				localStorage.removeItem("menu");
				localStorage.removeItem("noticia");
				localStorage.setItem("version", JSON.stringify(state.version.entities));
				store.dispatch(get_menu({ orderby: "origen,idMenu,orden", filter: "Activo" }));
			} else {
				let sMenu = JSON.parse(localStorage.getItem("menu"));
				if (sMenu != null) {
					store.dispatch(set_menu(sMenu));
				} else {
					store.dispatch(get_menu({ orderby: "origen,idMenu,orden", filter: "Activo" }));
				}
			}
		}
		if (name == VERSION_ERRORGETTIMESTAMP && this.current == "principal") {
			let sMenu = localStorage.getItem("menu");
			let sNoticia = localStorage.getItem("noticia");
			if (sMenu != null && sNoticia != null) {
				store.dispatch(set_menu(JSON.parse(sMenu)));
			} else {
				store.dispatch(showWarning(store.getState().screen.name, 0));
			}
		}

		if (name == MENU_TIMESTAMP && this.current == "principal") {
			if (localStorage.getItem("menu") == null) {
				localStorage.setItem("menu", JSON.stringify(state.menu.entities));
			}
			let sNoticia = localStorage.getItem("noticia");
			if (sNoticia != null) {
				store.dispatch(set_noticia(JSON.parse(sNoticia)));
			} else {
				store.dispatch(get_noticia({ orderby: "id", filter: "Activo" }));
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
				store.dispatch(showWarning("warning", 0, "fondoError", 1500));
			}
		}
		if (name == NOTICIA_ERRORGETTIMESTAMP && this.current == "principal") {
			if (!state.menu.entities || !state.noticia.entities) {
				store.dispatch(showWarning("warning", 0, "fondoError", 1500));
			}
		}
		if (name == NOTIFI_TIMESTAMP && this.current == "principal") {
			if (state.notifi.mostrarNotificaciones) {
				store.dispatch(mostrarNotificaciones(false));
				let ir = false;
				for (var i = 0; i < state.notifi.entityNotificaciones.length; i++) {
					if (state.notifi.entityNotificaciones[i].Activo) {
						ir = true;
						break;
					}
				}
				if (ir) {
					store.dispatch(goTo("notificacion"));
				} else {
					store.dispatch(showWarning("notificacion", 0, "fondoError", 2500));
				}
			}
		}
		if (name == NOTIFI_ERRORGETTIMESTAMP) {
			store.dispatch(mostrarNotificaciones(false));
			store.dispatch(apagaNotificacion());
			store.dispatch(showWarning("warning", 0, "fondoError", 1500));
		}
		if (name == PRENDE_NOTIFICACION) {
			this.shadowRoot.querySelector("#notificacion").setAttribute("si", "");
		}
		if (name == APAGA_NOTIFICACION) {
			this.shadowRoot.querySelector("#notificacion").removeAttribute("si");
		}
	}

	notif() {
		store.dispatch(mostrarNotificaciones(true));
		store.dispatch(get_notifi({ filter: "FechaPublicacion ge " + store.getState().notifi.fechaDesdeGet, orderby: "Id desc" }, store.getState().notifi.fechaDesdeGet));
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
		store.dispatch(setMenu(pagina, [{ id: 0, idMenu: 0, idNota: 0, origen: origen, web: "" }]));
		if (!store.getState().menu.entities || !store.getState().noticia.entities) {
			store.dispatch(get_version({}));
		} else {
			store.dispatch(goTo(store.getState().ui.menu.estilo));
		}
	}
	static get properties() {
		return {
			mediaSize: {
				type: String,
				reflect: true,
				attribute: "media-size",
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
				type: String,
			},
			current: {
				type: String,
				reflect: true,
			},
		};
	}
}
window.customElements.define("principal-screen", principalScreen);
