export const GET = "[menu] GET";
export const ADD = "[menu] ADD";
export const PATCH = "[menu] PATCH";
export const UPDATE = "[menu] UPDATE";
export const REMOVE = "[menu] REMOVE";
export const EDIT = "[menu] EDIT"


export const GET_SUCCESS = "[menu] GET success";
export const ADD_SUCCESS = "[menu] ADD success";
export const PATCH_SUCCESS = "[menu] PATCH success";
export const UPDATE_SUCCESS = "[menu] UPDATE success";
export const REMOVE_SUCCESS = "[menu] REMOVE success";

export const GET_ERROR = "[menu] GET error";
export const ADD_ERROR = "[menu] ADD error";
export const PATCH_ERROR = "[menu] PATCH error";
export const UPDATE_ERROR = "[menu] UPDATE error";
export const REMOVE_ERROR = "[menu] REMOVE error";




export const get = (options) => ({
    type: GET,
    options: options
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