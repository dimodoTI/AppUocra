import {
  reducer as uiReducer
} from "./ui/reducer"
import {
  reducer as screenReducer
} from "./screens/reducer"
import {
  reducer as routingReducer
} from "./routing/reducer"
import {
  reducer as menuReducer
} from "./menu/reducer"
import {
  reducer as noticiaReducer
} from "./noticia/reducer"
import {
  reducer as apiReducer
} from "./api/reducer"
import {
  reducer as versionReducer
} from "./version/reducer"

export const rootReducer = (state = {}, action) => {
  return {
    ui: uiReducer(state.ui, action),
    screen: screenReducer(state.screen, action),
    routing: routingReducer(state.routing, action),
    menu: menuReducer(state.menu, action),
    noticia: noticiaReducer(state.noticia, action),
    api: apiReducer(state.api, action),
    version: versionReducer(state.version, action)
  }
}