export const GET = "[version] GET";
export const ADD = "[version] ADD";
export const PATCH = "[version] PATCH";
export const UPDATE = "[version] UPDATE";
export const REMOVE = "[version] REMOVE";
export const EDIT = "[version] EDIT"
export const SET = "[version] SET"


export const GET_SUCCESS = "[version] GET success";
export const ADD_SUCCESS = "[version] ADD success";
export const PATCH_SUCCESS = "[version] PATCH success";
export const UPDATE_SUCCESS = "[version] UPDATE success";
export const REMOVE_SUCCESS = "[version] REMOVE success";

export const GET_ERROR = "[version] GET error";
export const ADD_ERROR = "[version] ADD error";
export const PATCH_ERROR = "[version] PATCH error";
export const UPDATE_ERROR = "[version] UPDATE error";
export const REMOVE_ERROR = "[version] REMOVE error";



export const get = (options) => ({
    type: GET,
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