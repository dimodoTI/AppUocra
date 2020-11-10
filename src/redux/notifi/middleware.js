import { GET, GET_SUCCESS, GET_ERROR, GET_NOTIFICACION, GET_NOTIFICACION_SUCCESS, GET_NOTIFICACION_ERROR, ADD, ADD_SUCCESS, ADD_ERROR, UPDATE, UPDATE_SUCCESS, UPDATE_ERROR, PATCH, PATCH_SUCCESS, PATCH_ERROR, REMOVE, REMOVE_SUCCESS, REMOVE_ERROR, CLEAR_STORAGE, getNotificacion as get_notifi } from "./actions";

import { OdataNotifiFetch } from "../fetchs";
import { apiRequest } from "../api/actions";

export const get = ({ dispatch }) => (next) => (action) => {
	next(action);
	if (action.type === GET) {
		dispatch(apiRequest(OdataNotifiFetch, action.options, GET_SUCCESS, GET_ERROR));
	}
	if (action.type === GET_NOTIFICACION) {
		dispatch(apiRequest(OdataNotifiFetch, action.options, GET_NOTIFICACION_SUCCESS, GET_NOTIFICACION_ERROR));
	}
};

export const storage = ({ dispatch, getState }) => (next) => (action) => {
	next(action);
	if (action.type === CLEAR_STORAGE) {
		localStorage.removeItem("notifi");
		dispatch(get_notifi({ filter: "FechaPublicacion ge " + getState().notifi.fechaDesdeGet }, getState().notifi.fechaDesdeGet));
	}
};

export const processGet = ({ dispatch, getState }) => (next) => (action) => {
	next(action);
	if (action.type === GET_SUCCESS) {
	}
	if (action.type === GET_NOTIFICACION_SUCCESS) {
	}
};

export const processComand = ({ dispatch }) => (next) => (action) => {
	next(action);
	if (action.type === ADD_SUCCESS || action.type === UPDATE_SUCCESS || action.type === REMOVE_SUCCESS || action.type === PATCH_SUCCESS) {
	}
};

export const processError = ({ dispatch }) => (next) => (action) => {
	next(action);
	if (action.type === GET_ERROR || action.type === ADD_ERROR || action.type === UPDATE_ERROR || action.type === REMOVE_ERROR || action.type === PATCH_ERROR) {
	}
	if (action.type === GET_NOTIFICACION_ERROR) {
	}
};

export const middleware = [get, processGet, processComand, processError, storage];
