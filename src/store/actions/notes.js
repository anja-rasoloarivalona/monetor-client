import * as actionTypes from './actionTypes'

const toggleNotes = open => {
    return {
        type: actionTypes.TOGGLE_NOTES,
        open
    }
}

export {
    toggleNotes
}