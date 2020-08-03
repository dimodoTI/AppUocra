import {
  ODataEntity,
  ODataFetchFactory
} from "@brunomon/odata-fetch-factory"

import {
  fetchFactory
} from "../libs/fetchFactory"

/* const webApiMenuOdata = "http://200.80.227.180/appuocra"
const webApiNoticiaOdata = "http://200.80.227.180/appuocra" */


const webApiMenuOdata = "https://www.uocra.net/AppUOCRA"
const webApiNoticiaOdata = "https://www.uocra.net/AppUOCRA"

const menuOdata = ODataFetchFactory({
  fetch: fetch,
  domain: webApiMenuOdata
})
const noticiaOdata = ODataFetchFactory({
  fetch: fetch,
  domain: webApiNoticiaOdata
})

export const OdataMenuFetch = ODataEntity(menuOdata, "Menu")
export const OdataNoticiaFetch = ODataEntity(noticiaOdata, "Noticias")