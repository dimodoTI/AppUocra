export const GET = "[notifi] GET";
export const GET_NOTIFICACION = "[notifi] GET_NOTIFICACION";
export const ADD = "[notifi] ADD";
export const PATCH = "[notifi] PATCH";
export const UPDATE = "[notifi] UPDATE";
export const REMOVE = "[notifi] REMOVE";
export const EDIT = "[notifi] EDIT"
export const SET = "[notifi] SET"
export const PRENDE_NOTIFICACION = "[notifi] PRENDE_NOTIFICACION";
export const APAGA_NOTIFICACION = "[notifi] APAGA_NOTIFICACION";

export const GET_SUCCESS = "[notifi] GET success";
export const GET_NOTIFICACION_SUCCESS = "[notifi] GET_NOTIFICACION success";
export const ADD_SUCCESS = "[notifi] ADD success";
export const PATCH_SUCCESS = "[notifi] PATCH success";
export const UPDATE_SUCCESS = "[notifi] UPDATE success";
export const REMOVE_SUCCESS = "[notifi] REMOVE success";

export const GET_ERROR = "[notifi] GET error";
export const GET_NOTIFICACION_ERROR = "[notifi] GET_NOTIFICACION error";
export const ADD_ERROR = "[notifi] ADD error";
export const PATCH_ERROR = "[notifi] PATCH error";
export const UPDATE_ERROR = "[notifi] UPDATE error";
export const REMOVE_ERROR = "[notifi] REMOVE error";




export const get = (options) => ({
    type: GET,
    options: options
});

export const getNotificacion = (options,fecha) => ({
    type: GET_NOTIFICACION,
    fecha: fecha,
    options: options
});

export const set = (entity) => ({
    type: SET,
    entity: entity
});

export const add = (body, token) => ({
    type: ADD,
    body: body,
    token: token
});

export const update = (id, body, token) => ({
    type: UPDATE,
    id: id,
    body: body,
    token: token
});

export const patch = (id, body, token) => ({
    type: PATCH,
    id: id,
    body: body,
    token: token
});
 
export const remove = (id, token) => ({
    type: REMOVE,
    id: id,
    token: token
});

export const edit = (modo, item) => ({
    type: EDIT,
    item: item || {
        Descripcion: 0,
        Activo: 1
    },
    modo: modo,
})

export const prendeNotificacion = () => ({
    type: PRENDE_NOTIFICACION
});

export const apagaNotificacion = () => ({
    type: APAGA_NOTIFICACION
});