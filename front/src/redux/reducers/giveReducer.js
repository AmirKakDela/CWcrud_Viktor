
const initialState = {
    gives: []
}

const givesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GIVES:
            return {
                ...state, gives: action.payload
            }
        default:
            return state
    }
}

export default givesReducer



const SET_GIVES = 'SET_GIVES'

export const setGivesAction = (gives) => {
    return {
        type: SET_GIVES,
        payload: gives
    }
}

