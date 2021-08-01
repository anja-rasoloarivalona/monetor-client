import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utils'

const initialState = {
    notes: [],
    open: false
}

const toggleNotes = (state, action) => {
    return updatedObject(state, {
        open: action.open ? true: false
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.TOGGLE_NOTES: return toggleNotes(state, action)
        default: return state
    }
}

export default reducer