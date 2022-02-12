import favoriteUnfavorite from "./favoriteUnfavorite"
import searchPersist from './searchPersist'
import { combineReducers } from "redux"

const rootReducer = combineReducers({
    favoriteUnfavorite,
    searchPersist
})

export default rootReducer;