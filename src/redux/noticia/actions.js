export const GET = "[noticia] GET";
export const ADD = "[noticia] ADD";
export const PATCH = "[noticia] PATCH";
export const UPDATE = "[noticia] UPDATE";
export const REMOVE = "[noticia] REMOVE";
export const EDIT = "[noticia] EDIT"
export const SET = "[noticia] SET"

export const GET_SUCCESS = "[noticia] GET success";
export const ADD_SUCCESS = "[noticia] ADD success";
export const PATCH_SUCCESS = "[noticia] PATCH success";
export const UPDATE_SUCCESS = "[noticia] UPDATE success";
export const REMOVE_SUCCESS = "[noticia] REMOVE success";

export const GET_ERROR = "[noticia] GET error";
export const ADD_ERROR = "[noticia] ADD error";
export const PATCH_ERROR = "[noticia] PATCH error";
export const UPDATE_ERROR = "[noticia] UPDATE error";
export const REMOVE_ERROR = "[noticia] REMOVE error";




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