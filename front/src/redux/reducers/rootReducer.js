import {combineReducers} from "redux";
import bookReducer from "./bookReducer";
import readerReducer from "./readerReducer";
import errorReducer from "./errorReducer";


export const rootReducer = combineReducers({
    books: bookReducer,
    readers: readerReducer,
    error: errorReducer
})

