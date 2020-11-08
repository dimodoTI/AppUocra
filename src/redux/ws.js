import {
    store
} from "./store";
import {prendeNotificacion, apagaNotificacion, clearStorage} from "../redux/notifi/actions"

var connection = new WebSocket('wss://ws.notificaciones.dimodo.ga:9099');

export const connect = () => {

    if (typeof connection === 'undefined' || connection.readyState == WebSocket.CLOSED || connection.readyState == WebSocket.CONNECTING ){

        connection.onopen = () => {
            var wsId = ""
            if (localStorage.getItem("wsId") == null){
                wsId = uuidv4()
                localStorage.setItem("wsId", wsId);
            }else{
                wsId = localStorage.getItem("wsId");
            }
            connection.send(JSON.stringify({
                type: "new",
                id: wsId,
                rol: "client",
                data: ""
            }));
        };
        
        connection.onmessage = (msg) => {
            //let data = JSON.parse(msg.data);
            //console.log(msg.data)
            if (msg.data.substring(0,1) =="{"){
                let data = JSON.parse(msg.data);
                if (data.action == "prender"){
                    store.dispatch(prendeNotificacion())
                }
                if (data.action == "apagar"){
                    store.dispatch(apagaNotificacion())
                }
                if (data.action == "clearstorage"){
                    store.dispatch(clearStorage())
                }
            }
        };
        
        connection.onclose = function(e) {
            console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
            setTimeout(function() {
                connect();
            }, 1000);
        };
        
        connection.onerror = (err) => {
            console.log("Got error", err);
            setTimeout(function() {
                connect();
            }, 2000);
        };    
    }
}

const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}