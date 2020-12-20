import { combineReducers } from 'redux'
import {tourItemsReducer} from "./tourItemsActions";
import {todoReducer} from "./todoActions";
import {settingsReducer} from "./SettingsReducer";

const allReducers = combineReducers({
    tourItemsReducer: tourItemsReducer,
    todoReducer: todoReducer,
    settingsReducer: settingsReducer
})

export default allReducers;