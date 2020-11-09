import {
    GET,
    GET_SUCCESS,
    GET_ERROR,
    GET_NOTIFICACION,
    GET_NOTIFICACION_SUCCESS,
    GET_NOTIFICACION_ERROR,
    ADD,
    ADD_SUCCESS,
    ADD_ERROR,
    UPDATE,
    UPDATE_SUCCESS,
    UPDATE_ERROR,
    PATCH,
    PATCH_SUCCESS,
    PATCH_ERROR,
    REMOVE,
    REMOVE_SUCCESS,
    REMOVE_ERROR,
    CLEAR_STORAGE,
    getNotificacion as get_notifi,
    WS_CONEXION,
    WS_CONEXION_SUCCESS,
    WS_CONEXION_ERROR

} from "./actions";

import {
    OdataNotifiFetch
} from "../fetchs"
import {
    uuidv4
} from "../../libs/funciones"
import {
    apiRequest
} from "../api/actions"
import {wsConexion as actWsConecion, prendeNotificacion, apagaNotificacion, clearStorage} from "./actions"
import { showWarning } from "../ui/actions";

export const get = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === GET) {
        dispatch(apiRequest(OdataNotifiFetch, action.options, GET_SUCCESS, GET_ERROR))
    }
    if (action.type === GET_NOTIFICACION) {
        dispatch(apiRequest(OdataNotifiFetch, action.options, GET_NOTIFICACION_SUCCESS, GET_NOTIFICACION_ERROR))
    }
};

export const storage = ({
    dispatch, getState
}) => next => action => {
    next(action);
    if (action.type === CLEAR_STORAGE) {
        localStorage.removeItem("notifi");
        dispatch(get_notifi({filter: "FechaPublicacion ge " + getState().notifi.fechaDesdeGet}, getState().notifi.fechaDesdeGet));
    }
};

export const wsConexion = ({
    dispatch, getState
}) => next => action => {
    next(action);
    if (action.type === WS_CONEXION) {
        if (typeof action.conexion === 'undefined' || action.conexion == null){
            action.conexion = new WebSocket('wss://ws.notificaciones.dimodo.ga:9099');

            action.conexion.onopen = () => {
                var wsId = ""
                if (localStorage.getItem("wsId") == null){
                    wsId = uuidv4()
                    localStorage.setItem("wsId", wsId);
                }else{
                    wsId = localStorage.getItem("wsId");
                }
                action.conexion.send(JSON.stringify({
                    type: "new",
                    id: wsId,
                    rol: "client",
                    data: ""
                }));
                dispatch({
                    type: WS_CONEXION_SUCCESS, action: action.conexion
                })
            };
            
            action.conexion.onmessage = (msg) => {
                //let data = JSON.parse(msg.data);
                //console.log(msg.data)
                if (msg.data.substring(0,1) =="{"){
                    let data = JSON.parse(msg.data);
                    if (data.action == "prender"){
                        dispatch(prendeNotificacion())
                    }
                    if (data.action == "apagar"){
                        dispatch(apagaNotificacion())
                    }
                    if (data.action == "clearstorage"){
                        dispatch(clearStorage())
                    }
                }
            };
            
            action.conexion.onclose = function(e) {
                console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
                // setTimeout(function() {
                //     getState().notifi.wsConexion = null;
                //     dispatch(actWsConecion(getState().notifi.wsConexion));
                //     dispatch(showWarning("warning", 0, "fondoError", 1500))
                // }, 1000);
            };
            
            action.conexion.onerror = (err) => {
                console.log("Got error", err);
                // setTimeout(function() {
                //     connect();
                // }, 2000);
                dispatch({
                    type: WS_CONEXION_ERROR
                })
            }; 
        }
    }
};

export const processGet = ({
    dispatch, getState
}) => next => action => {
    next(action);
    if (action.type === GET_SUCCESS) {

    }
    if (action.type === GET_NOTIFICACION_SUCCESS) {

    }
};

export const processComand = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === ADD_SUCCESS || action.type === UPDATE_SUCCESS || action.type === REMOVE_SUCCESS || action.type === PATCH_SUCCESS) {

    }
    if (action.type === WS_CONEXION_SUCCESS){

    }
};

export const processError = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === GET_ERROR || action.type === ADD_ERROR || action.type === UPDATE_ERROR || action.type === REMOVE_ERROR || action.type === PATCH_ERROR) {

    }
    if (action.type === GET_NOTIFICACION_ERROR){

    }
    if (action.type === WS_CONEXION_ERROR){

    }
};

export const middleware = [get, processGet, processComand, processError, storage, wsConexion];