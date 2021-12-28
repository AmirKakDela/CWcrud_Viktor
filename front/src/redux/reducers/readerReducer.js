
const initialState = {
    readers: []
}

const readerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_READERS:
            return {
                ...state, readers: action.payload
            }
        case DELETE_READER:
            return {
                ...state, readers: [...state.readers].filter(reader => reader._id !== action.payload)
            }
        default:
            return state
    }
}

export default  readerReducer

const SET_READERS = 'SET_READERS'
const DELETE_READER = 'DELETE_READER'

export const setReadersAction = (readers) => {
    return {
        type: SET_READERS,
        payload: readers
    }
}

export const deleteReaderAction = (id) => {
    return {
        type: SET_READERS,
        payload: id
    }
}