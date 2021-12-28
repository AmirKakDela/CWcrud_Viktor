import axios from "axios";
import {setBooksAction} from "./reducers/bookReducer";



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
            const response = await axios.post(`${url}/api/books/all`, book)
            console.log(response)
        } catch (e) {

        }
    }
}