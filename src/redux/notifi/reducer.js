import {
    GET_NOTIFICACION,
    GET_NOTIFICACION_SUCCESS,
    GET_NOTIFICACION_ERROR,
    GET_SUCCESS,
    GET_ERROR,
    PATCH_SUCCESS,
    PATCH_ERROR,
    UPDATE_SUCCESS,
    UPDATE_ERROR,
    ADD_SUCCESS,
    ADD_ERROR,
    REMOVE_SUCCESS,
    REMOVE_ERROR,
    EDIT,
    SET,
    PRENDE_NOTIFICACION,
    APAGA_NOTIFICACION
} from "./actions";
import { prendeNotificacion, apagaNotificacion } from "../notifi/actions";


const initialState = {
    fechaDesdeGet: null,
    entities: null,
    timeStamp: null,
    removeTimeStamp: null,
    updateTimeStamp: null,
    addTimeStamp: null,
    errorTimeStamp: null,
    commandErrorTimeStamp: null,
    editTimeStamp: null,
    entityNotificaciones: null,
    entityNotificacionesTimeStamp: null,
    entityNotificacionesErrorTimeStamp: null,
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state
    };

    switch (action.type) {
        case GET_NOTIFICACION:
            newState.fechaDesdeGet = action.fecha;
            break;
        case GET_SUCCESS:
            newState.entities = action.payload.receive
            newState.timeStamp = (new Date()).getTime();
            break;
        case GET_NOTIFICACION_SUCCESS:
            let mfec = new Date(state.fechaDesdeGet)
            let fechaDesdeGet = mfec.getTime();
            let campanaPrendida = false;
            let mLocalStorage = localStorage.getItem("notifi")
            if ( mLocalStorage != null && mLocalStorage!="{}") {   
                var totalBorrados = 0
                var mBorradosAnt = JSON.parse(mLocalStorage)
                var mBorrados = {}
                var keys = Object.keys(JSON.parse(mLocalStorage));
                for (var i = 0; i < keys.length; i++){
                    if (mBorradosAnt[keys[i]].fecha > fechaDesdeGet){
                        mBorrados[keys[i]]={"fecha": mBorradosAnt[keys[i]].fecha}
                        totalBorrados = totalBorrados + 1
                    }
                }
                localStorage.setItem("notifi", JSON.stringify(mBorrados));            
                if (action.payload.receive.length > 0 && totalBorrados>0){
                    let notifi = action.payload.receive
                    for (var i = 0; i < notifi.length; i++){
                        if(mBorrados[notifi[i].Id]){
                            action.payload.receive[i].Activo = false;
                        }else{
                            campanaPrendida = true
                        }
                    }
                }
            }else{
                if (action.payload.receive.length > 0){
                    campanaPrendida = true
                } 
            }
            if(campanaPrendida){
                newState.prendeNotificacionTimeStamp = (new Date()).getTime();
            }else{
                newState.apagaNotificacionTimeStamp = (new Date()).getTime();
            }
            newState.entityNotificaciones = action.payload.receive
            newState.entityNotificacionesTimeStamp = (new Date()).getTime();
            break;
        case SET:
            newState.entities = action.entity
            newState.timeStamp = (new Date()).getTime();
            break;
        case EDIT:
            newState.editTimeStamp = (new Date()).getTime();
            newState.entities.currentItem = action.item
            newState.modo = action.modo;
            break;
        case UPDATE_SUCCESS:
            newState.updateTimeStamp = (new Date()).getTime();
            break;
        case PATCH_SUCCESS:
            newState.updateTimeStamp = (new Date()).getTime();
            break;
        case REMOVE_SUCCESS:
            newState.removeTimeStamp = (new Date()).getTime();
            break;
        case ADD_SUCCESS:
            newState.addTimeStamp = (new Date()).getTime();
            break;
        case GET_ERROR:
            newState.errorTimeStamp = (new Date()).getTime();
            break;
        case GET_NOTIFICACION_ERROR:
            newState.entityNotificacionesErrorTimeStamp = (new Date()).getTime();
            break;
        case UPDATE_ERROR:
        case REMOVE_ERROR:
        case PATCH_ERROR:
        case ADD_ERROR:
            newState.commandErrorTimeStamp = (new Date()).getTime();
            break;
        case PRENDE_NOTIFICACION:
            newState.prendeNotificacionTimeStamp = (new Date()).getTime();
            break;
        case APAGA_NOTIFICACION:
            newState.apagaNotificacionTimeStamp = (new Date()).getTime();
            break;
    }
    return newState;
};