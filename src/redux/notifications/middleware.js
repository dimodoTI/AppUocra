/** @format */

import { ON_OPEN, ON_CLOSE, ON_ERROR, ON_MESSSAGE } from "./actions";
import { mostrarNotificaciones, clearStorage, prendeNotificacion, apagaNotificacion, getNotificacion as get_notifi } from "../notifi/actions";

export const onOpen = ({ dispatch }) => (next) => (action) => {
	next(action);
	if (action.type === ON_OPEN) {
		console.log("open" + " - Id:" + action.connectionId);
		var d = new Date();
		d.setDate(d.getDate() - 10);
		let fecha = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
		dispatch(get_notifi({ filter: "FechaPublicacion ge " + fecha }, fecha));
	}
};
export const onClose = ({ dispatch }) => (next) => (action) => {
	next(action);
	if (action.type === ON_CLOSE) {
		console.log("close");
	}
};
export const onError = ({ dispatch }) => (next) => (action) => {
	next(action);
	if (action.type === ON_ERROR) {
		console.log("error");
	}
};
export const onMessage = ({ dispatch }) => (next) => (action) => {
	next(action);
	if (action.type === ON_MESSSAGE) {
		console.log("message");
		if (action.message.data.substring(0, 1) == "{") {
			let data = JSON.parse(action.message.data);
			if (data.action == "prender") {
				dispatch(prendeNotificacion());
			}
			if (data.action == "apagar") {
				dispatch(apagaNotificacion());
			}
			if (data.action == "clearstorage") {
				dispatch(clearStorage());
				dispatch(mostrarNotificaciones(true));
			}
		}
	}
};
export const middleware = [onOpen, onClose, onError, onMessage];
