import {
    html,
    LitElement,
    css
} from "lit-element";
import {
    connect
} from "@brunomon/helpers"
import {
    store
} from "../redux/store";

import {
    layoutsCSS
} from "./ui/layouts"

import {
    getLayout
} from "../redux/screens/screenLayouts";
import {
    goTo
} from "../redux/routing/actions"
import {
    dimodoSpinner
} from "./componentes/spinner"
import {
    splashScreen
} from "./bodies/splash"
import {
    principalScreen
} from "./bodies/principal"
import {
    menuScreen
} from "./bodies/menu"
import {
    pantallaWarning
} from "./bodies/warning"
import {
    noticiaScreen
} from "./bodies/noticia"
import {
    webScreen
} from "./bodies/web"
import {
    pantallaHorizontalScreen
} from "./bodies/pantallaHorizontal"
import {
    notificacionScreen
} from "./bodies/notificacion"

const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";
export class viewManager extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
    constructor() {
        super();

    }


    static get styles() {
        return css`
        :host{
            display: grid;
            position:relative;
            height:100%;
            width: 100%;
            padding:0;
            background-color:var(--color-gris-claro);
            overflow:hidden;
        }

        ${layoutsCSS};


        `
    }



    render() {
        return html`

            <splash-screen class="body"></splash-screen>
            <principal-screen class="body"></principal-screen>
            <menu-screen class="body"></menu-screen>
            <noticia-screen class="body"></noticia-screen>
            <web-screen class="body"></web-screen>
            <notificacion-screen class="body"></notificacion-screen>

            <pantalla-horizontal-screen  class="body"></pantalla-horizontal-screen>
            <pantalla-warning ></pantalla-warning>
            <dimodo-spinner type="spinner2"></dimodo-spinner>
      
        `
    }

    stateChanged(state, name) {

        if ((name == MEDIA_CHANGE || name == SCREEN)) {
            this.mediaSize = state.ui.media.size
            this.orientation = state.ui.media.orientation
            this.layout = getLayout(state).name
            if (!window.MSStream && /iPad|iPhone|iPod/.test(navigator.userAgent)) {
                //                
                if (('standalone' in window.navigator) && (window.navigator.standalone)) {
                    this.style.height = document.documentElement.offsetHeight ? document.documentElement.offsetHeight : window.innerHeight + "px"
                } else {
                    if (state.ui.media.orientation == "portrait") {
                        this.style.height = window.innerHeight < window.innerWidth ? window.innerWidth : window.innerHeight + "px"
                    } else {
                        this.style.height = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight + "px"
                    }
                }

            }
        }
        this.update();
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
            orientation: {
                type: String,
                reflect: true,
            }
        }
    }
}

window.customElements.define("view-manager", viewManager);