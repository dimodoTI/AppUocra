import {
    css
} from "lit-element"

export const cardMenu = css`
        #ciDivEtiqueta{
            position:relative;
            display: grid; 
            height:12vh;
            width:100%;
            background-color:var(--color-gris-oscuro);
            grid-template-columns: 10vw 84vw;
            grid-gap:.5rem;
            align-items: center;
            border-radius: .4rem;  
            opacity:.7;
            cursor: pointer;
        }
        #ciDivIcomo{
            justify-self: center;
            align-self: center;
        }
        #ciDivIcomo svg{
            height:4vh;
            width:4vh;
            stroke: var(--color-blanco);
            fill: var(--color-negro);
        }
        #ciDivNombre{
            width:100%;
            font-size: .8rem;
            font-weight: 200;   
            color: var(--color-celeste);            
        }
        :host(:not([media-size="small"])) #ciDivNombre{
            font-size: 1.2rem;
        }


`