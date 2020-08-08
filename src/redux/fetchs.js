import {
  ODataEntity,
  ODataFetchFactory
} from "@brunomon/odata-fetch-factory"

import {
  fetchFactory
} from "../libs/fetchFactory"

const webApiMenuOdata = "https://www.uocra.net/appuocra"
const webApiNoticiaOdata = "https://www.uocra.net/appuocra"
const webApiVersionOdata = "https://www.uocra.net/appuocra"

const menuOdata = ODataFetchFactory({
  fetch: fetch,
  domain: webApiMenuOdata
})
const noticiaOdata = ODataFetchFactory({
  fetch: fetch,
  domain: webApiNoticiaOdata
})
const versionOdata = ODataFetchFactory({
  fetch: fetch,
  domain: webApiVersionOdata
})

export const OdataMenuFetch = ODataEntity(menuOdata, "Menu")
export const OdataNoticiaFetch = ODataEntity(noticiaOdata, "Noticias")
export const OdataVersionFetch = ODataEntity(versionOdata, "Version")