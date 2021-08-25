import * as actionTypes from './actionTypes'
import axios from 'axios'
import { arrayToObject } from '../../functions'

const getUserNotes = () => {
    return async function(dispatch, getState){
        try {
            const { text: { text }, user: { noteSynchronisedAt }} = getState()
            const res = await axios.get("/note")
            if(res.status === 200){
                if(res.data.data.length === 0){
                    const addFolderRes = await axios.post("/note/create/folder", {
                        title: text.new_folder,
                        index: 0
                    })
                    if(addFolderRes.status === 200){
                        const newFolder = addFolderRes.data.data
                        dispatch(setNotes({
                            [newFolder.id]: newFolder
                        }))
                    }
                    
                } else {
                    const localNotes =  localStorage.getItem("local-notes") ? JSON.parse(localStorage.getItem("local-notes")) : null
                    if(localNotes){
                        const localNotesAreSynchronized = parseInt(new Date(localNotes.updatedAt).getTime() / 1000) === parseInt(new Date(noteSynchronisedAt).getTime() / 1000)
                        if(localNotesAreSynchronized){
                            localStorage.removeItem("local-notes")
                        } else {
                            console.log("LOCAL NOTES ARE NOTE SYNCHRONISED")
                        }
                    }
                    dispatch(toggleNotes({
                        type: "folder",
                        id: res.data.data[0].id
                    }))
                    dispatch(setNotes(arrayToObject(res.data.data, "id")))
                }
            }
        } catch(err){
            console.log({
                err
            })
        }
    }
}

const toggleNotes = data => {
    return {
        type: actionTypes.TOGGLE_NOTES,
        data
    }
}

const setNotes = notesFolder => {
    return {
        type: actionTypes.SET_NOTES,
        notesFolder
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
                url: isEditing ? "/note/update/note" : "/note/create/note",
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

const editNote = note => {
    return {
        type: actionTypes.EDIT_NOTE,
        note
    }
}

const removeNote = id => {
    return {
        type: actionTypes.REMOVE_NOTE,
        id
    }
}

const addNoteFolder = folder => {
    return {
        type: actionTypes.ADD_NOTE_FOLDER,
        folder
    }
}

const editNoteFolder = folder => {
    return {
        type: actionTypes.EDIT_NOTE_FOLDER,
        folder
    }
}

const deleteNoteFolder = folderId => {
    return {
        type: actionTypes.DELETE_NOTE_FOLDER,
        folderId
    }
}

export {
    toggleNotes,
    setNotes,
    addNote,
    removeNote,
    editNote,
    saveNote,
    getUserNotes,
    addNoteFolder,
    editNoteFolder,
    deleteNoteFolder
}