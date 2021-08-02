import * as actionTypes from './actionTypes'
import axios from 'axios'

const toggleNotes = open => {
    return {
        type: actionTypes.TOGGLE_NOTES,
        open
    }
}

const setNotes = notes => {
    return {
        type: actionTypes.SET_NOTES,
        notes
    }
}

const saveNote = data => {
    const { note, isEditing } = data
    return async function(dispatch, getState){
        const {
            notes: { notes }
        } = getState()
        try {
            dispatch(addNote(note))
            const res = await axios({
                method: isEditing ? "PUT" : "POST",
                url: "/note",
                data: note
            })
            if(res.status === 200){
                if(!isEditing){
                    const savedNote = res.data.data
                    const updatedNotes = [note, ...notes].map(item => {
                        if(item.id === note.id){
                            return savedNote
                        } return item
                    })
                    return dispatch(setNotes(updatedNotes))
                }
            }
        } catch(err){
            console.log({
                err
            })
        }
    }
}


const addNote = note => {
    return {
        type: actionTypes.ADD_NOTE,
        note
    }
}


const removeNote = id => {
    return {
        type: actionTypes.REMOVE_NOTE,
        id
    }
}

export {
    toggleNotes,
    setNotes,
    addNote,
    removeNote,
    saveNote
}