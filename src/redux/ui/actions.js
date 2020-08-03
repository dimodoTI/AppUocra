//Oculta o muestra spinner
export const SHOW_SPINNER = "[ui] show spinner";
export const HIDE_SPINNER = "[ui] hide spinner";

//oculta o muestra ventana de error
export const SHOW_ERROR = "[ui] show error";
export const HIDE_ERROR = "[ui] hide error";

//oculta o muestra ventana de error
export const SHOW_WARNING = "[ui] show warning";
export const HIDE_WARNING = "[ui] hide warning";

//define el tamaño,forma orientacion de la UI
export const CAPTURE_MEDIA = "[ui] capture media"
export const SET_MEDIA = "[ui] set media"
export const SET_MEDIA_ORIENTATION = "[ui] set media orientation"

//define el layout de la UI
export const SET_LAYOUT = "[ui] set layout"

//define el layout de la UI
export const SET_MENU = "[ui] set menu"


export const showSpinner = () => ({
  type: SHOW_SPINNER
});
export const hideSpinner = () => ({
  type: HIDE_SPINNER
});

export const showError = (message) => ({
  type: SHOW_ERROR,
  message: message
});
export const hideError = () => ({
  type: HIDE_ERROR
});

export const showWarning = (pagina, nroWarning) => ({
  type: SHOW_WARNING,
  pagina: pagina,
  nroWarning: nroWarning
});
export const hideWarning = () => ({
  type: HIDE_WARNING
});

export const captureMedia = () => ({
  type: CAPTURE_MEDIA
});
export const setMedia = (size) => ({
  type: SET_MEDIA,
  size: size
});

export const setMediaOrientation = (orientation) => ({
  type: SET_MEDIA_ORIENTATION,
  orientation: orientation
});

export const setMenu = (estilo, items) => ({
  type: SET_MENU,
  estilo: estilo,
  items, items
});