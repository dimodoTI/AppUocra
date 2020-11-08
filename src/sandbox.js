import { } from "../css/main.css"
import { } from "../css/media.css"
import { } from "../css/quicksand.css"
import { } from "../css/fontSizes.css"
import { } from "../css/colors.css"
import { } from "../css/shadows.css"
import { } from "../css/imagenes.css"
import {
    store
} from "../src/redux/store"
import {
    viewManager
} from "./views/manager"
import {
    captureMedia
} from "./redux/ui/actions";
import {
    goTo
} from "./redux/routing/actions"
import {
    getNotificacion as get_notifi
} from "./redux/notifi/actions"
import {
    connect as connectWs
} from "./redux/ws"

import {wsConexion, prendeNotificacion, apagaNotificacion, clearStorage} from "./redux/notifi/actions"
store.dispatch(captureMedia())
store.dispatch(goTo("splash"))

var d = new Date();
d.setDate(d.getDate()-10);
let fecha =  d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);

//let fecha = "2020-11-02"
store.dispatch(get_notifi({filter: "FechaPublicacion ge " + fecha}, fecha));
//let myWs = new WebSocket('wss://ws.notificaciones.dimodo.ga:9099')
//let myWs = null
//store.dispatch(wsConexion(myWs))
//connectWs();


//store.dispatch(goToNode("3"))

/*
const largeScreenRoute = [
    "1      -splash",
    "2      -inicioSesion",
    "3/1    -misConsultas",
    "3/2/1  -agendas",
    "3/2/2  -videos",
    "3/2/3  -diagnosticos",
    "3/2/4  -diagnosticosDetalle",
    "3/3/1  -atencionesMascotas",
    "3/3/2  -listaReservas",
    "3/3/3  -igualDiagnosticosDetalle",
    "4/1    -recuperaClave",
    "4/2    -recuperaClaveMsg",
    "5/1    -crearClave",
    "5/2    -crearClaveMsg"
]


let pointer = 0

const isBrother = (codeA, codeB) => {
    const elementsCodeA = codeA.split("/")
    const elementsCodeB = codeB.split("/")
    elementsCodeA.pop()
    elementsCodeB.pop()
    return elementsCodeA.join() == elementsCodeB.join()
}

const isParent = (currentCode, prevCode) => {
    return currentCode.trim().split("/").length - 1 == prevCode.trim().split("/").length
}

const next = (pointer) => {
    let originalPointer = pointer
    let currentCode = largeScreenRoute[pointer].split("-")[0]
    while (pointer < largeScreenRoute.length - 1) {
        pointer += 1
        let nextCode = largeScreenRoute[pointer].split("-")[0]
        if (isBrother(currentCode, nextCode)) {
            return pointer
        }
    }
    return originalPointer
}
const prev = (pointer) => {
    let currentCode = largeScreenRoute[pointer].split("-")[0]
    while (pointer > 0) {
        pointer -= 1
        let prevCode = largeScreenRoute[pointer].split("-")[0]
        if (isBrother(currentCode, prevCode) || isParent(currentCode, prevCode)) {
            return pointer
        }
    }
    return pointer
}

const goTo = (option) => {
    return largeScreenRoute.findIndex(item => {
        return item.split("-")[1] == option
    })
}

console.log("test Next")
pointer = goTo("videos")
console.log(largeScreenRoute[pointer])
pointer = prev(pointer)
console.log(largeScreenRoute[pointer])
pointer = prev(pointer)
console.log(largeScreenRoute[pointer])
pointer = goTo("opcion 41")
console.log(largeScreenRoute[pointer])
pointer = prev(pointer)
console.log(largeScreenRoute[pointer])
pointer = prev(pointer)
console.log(largeScreenRoute[pointer])
*/
/* pointer = goTo("opcion 31")
console.log(largeScreenRoute[pointer])
pointer = next(pointer)
console.log(largeScreenRoute[pointer])
pointer = next(pointer)
console.log(largeScreenRoute[pointer])
pointer = next(pointer)
console.log(largeScreenRoute[pointer])
pointer = prev(pointer)
console.log(largeScreenRoute[pointer])
pointer = prev(pointer)
console.log(largeScreenRoute[pointer])
pointer = prev(pointer)
console.log(largeScreenRoute[pointer])
pointer = prev(pointer)
console.log(largeScreenRoute[pointer])
pointer = prev(pointer)
console.log(largeScreenRoute[pointer])
pointer = prev(pointer)
console.log(largeScreenRoute[pointer])



console.log("test Prev")

pointer = goTo("opcion 1")

pointer = next(pointer)
console.log(largeScreenRoute[pointer])

pointer = next(pointer)
console.log(largeScreenRoute[pointer])

pointer = next(pointer)
console.log(largeScreenRoute[pointer])

pointer = goTo("opcion 3121")
console.log(largeScreenRoute[pointer])

pointer = prev(pointer)
console.log(largeScreenRoute[pointer])

pointer = prev(pointer)
console.log(largeScreenRoute[pointer])

pointer = prev(pointer)
console.log(largeScreenRoute[pointer])

pointer = next(pointer)
console.log(largeScreenRoute[pointer])

pointer = next(pointer)
console.log(largeScreenRoute[pointer]) */