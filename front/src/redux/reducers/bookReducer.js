const initialState = {
    books: []
}

const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BOOKS:
            return {
                ...state, books: action.payload
            }
        default:
            return state
    }
}

export default bookReducer;

const SET_BOOKS = 'SET_BOOKS'

export const setBooksAction = (books) => {
    return {
        type: SET_BOOKS,
        payload: books
    }
}