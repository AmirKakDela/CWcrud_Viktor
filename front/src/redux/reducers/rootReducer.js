import {combineReducers} from "redux";
import bookReducer from "./bookReducer";
import readerReducer from "./readerReducer";


export const rootReducer = combineReducers({
    books: bookReducer,
    readers: readerReducer
})

