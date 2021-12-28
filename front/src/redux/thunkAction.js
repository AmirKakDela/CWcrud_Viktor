import axios from "axios";
import {createBookAction, deleteBookAction, setBooksAction} from "./reducers/bookReducer";


const url = 'http://localhost:5000'
export const getBooks = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${url}/api/books/all`)
            console.log(response)
            dispatch(setBooksAction(response.data))
        } catch (e) {

        }
    }
}

export const createBook = (book) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${url}/api/books/create`, book)
            dispatch(createBookAction(response.data))
        } catch (e) {

        }
    }
}

export const deleteBook = (id) => {
    return async dispatch => {
        try {
            const response = await axios.delete(`${url}/api/books/delete/${id}`)
            console.log(response)
            dispatch(deleteBookAction(id))
        } catch (e) {

        }
    }
}