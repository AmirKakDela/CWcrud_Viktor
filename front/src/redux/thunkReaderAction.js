import axios from "axios";
import {url} from "./thunkBookAction";
import {deleteReaderAction, setReadersAction} from "./reducers/readerReducer";

export const getReaders = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${url}/api/readers/all`)
            dispatch(setReadersAction(response.data))
        } catch (e) {

        }
    }
}

export const deleteReader = (id) => {
    return async dispatch => {
        try {
            const response = await axios.delete(`${url}/api/readers/delete/${id}`)
            console.log(response)
            dispatch(deleteReaderAction(id))
        } catch (e) {

        }
    }
}