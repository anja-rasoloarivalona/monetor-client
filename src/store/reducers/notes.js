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

const addNote = (state, action) => {
    return updatedObject(state, {
        notes: [action.note, ...state.notes]
    })
}

const removeNote = (state, action) => {
    return updatedObject(state, {
        notes: state.notes.filter(note => note.id !== action.id)
    })
}

const setNotes = (state, action) => {
    return updatedObject(state, {
        notes: action.notes
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.TOGGLE_NOTES: return toggleNotes(state, action)
        case actionTypes.SET_NOTES: return setNotes(state, action)
        case actionTypes.ADD_NOTE: return addNote(state, action)
        case actionTypes.REMOVE_NOTE: return removeNote(state, action)
        default: return state
    }
}

export default reducer