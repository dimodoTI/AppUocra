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

const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";
export class splashScreen extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.area = "body"
    }

    static get styles() {
        return css`
        :host{
            display: grid;
            position:relative;
            background-color:var(--primary-color) !important;
        }
        :host([hidden]){
            display:none ;
        }
        #cuerpo{
            display: grid;
            height: 100%;
            width: 100%;
            grid-gap:1rem;
            grid-template-rows: 25% 20% 15% 40%;
            background-color:var(--color-blanco) !important;
        }
        #uno{
            background-image:var(--imagen-splash1);
            background-repeat: no-repeat;
            background-position: center;
            background-size:  contain;
        }
        #dos{
            background-image:var(--imagen-splash2);
            background-repeat: no-repeat;
            background-position: center;
            background-size:  contain;
        }
        `
    }
    render() {
        return html`
        <div id="cuerpo" @click=${this.proximo}>
            <div style="padding: 1vh 0 0 2vw">v.3</div>
            <div id="uno">
        
            </div>
            <div id="dos">
            </div>
            <div></div>
        </div>
        `
    }
    stateChanged(state, name) {
        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = true
            const haveBodyArea = isInLayout(state, this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-splash-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false
            }
            this.update();
        }
    }

    proximo() {
        //        store.dispatch(goNext());
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
            }
        }
    }

}
window.customElements.define("splash-screen", splashScreen);