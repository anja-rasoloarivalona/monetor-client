import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utils'

const initialState = {
    notesFolder: null,
    opened: {
        folderId: null,
        noteId: null
    },
    toSynchronise: {
        add: {},
        update: {},
        delete: [],
        updatedAt: null
    },
    open: false
}

const toggleNotes = (state, action) => {
    const { id, type  } = action.data
    return updatedObject(state, {
        opened: {
            ...state.opened,
            [`${type}Id`]: id
        }
    })
}

const addNote = (state, action) => {
    const { note } = action
    const updatedSynchronise = {
        ...state.toSynchronise,
        updatedAt: new Date()
    }
    if(note.isTemporary){
        updatedSynchronise.add[note.id] = note
    }
    localStorage.setItem("local-notes", JSON.stringify(updatedSynchronise))
    return updatedObject(state, {
        notesFolder: {
            ...state.notesFolder,
            [note.folderId]: {
                ...state.notesFolder[note.folderId],
                notes: state.notesFolder[note.folderId].notes ?
                    [...state.notesFolder[note.folderId].notes, note ] :
                    [ note ] 
            }
        },
        toSynchronise: updatedSynchronise
    })
}

const editNote = (state, action) => {
    const { note } = action
    const updatedSynchronise = {
        ...state.toSynchronise,
        updatedAt: new Date()
    }
    if(note.isTemporary){
        updatedSynchronise.add[note.id] = note
    } else {
        updatedSynchronise.update[note.id] = note
    }
    const updateNotes = [...state.notesFolder[note.folderId].notes]
    const updatedNoteIndex = updateNotes.findIndex(item => item.id === note.id )
    updateNotes[updatedNoteIndex] = note
    localStorage.setItem("local-notes", JSON.stringify(updatedSynchronise))
    return updatedObject(state, {
        notesFolder: {
            ...state.notesFolder,
            [note.folderId]: {
                ...state.notesFolder[note.folderId],
                notes: updateNotes
            }
        },
        toSynchronise: updatedSynchronise

    })
}



const removeNote = (state, action) => {
    const { note } = action
    const updatedSynchronise = {
        ...state.toSynchronise,
        updatedAt: new Date()
    }
    if(!note.isTemporary){
        updatedSynchronise.delete.push(note.id)
    }
    const updatedFolder = {
        ...state.notesFolder[note.folderId],
        notes: state.notesFolder[note.folderId].notes.filter(item => item.id !== note.id)
    }
    localStorage.setItem("local-notes", JSON.stringify(updatedSynchronise))
    return updatedObject(state, {
        notesFolder: {
            ...state.notesFolder,
            [note.folderId]: updatedFolder
        },
        toSynchronise: updatedSynchronise
    })
}

const addFolder = (state, action) => {
    const { id } = action.folder
    const updatedSynchronise = {
        ...state.toSynchronise,
        updatedAt: new Date(),
        add: {
            ...state.toSynchronise.add,
            [id]: action.folder,
        }
    }
    localStorage.setItem("local-notes", JSON.stringify(updatedSynchronise))
    return updatedObject(state, {
        notesFolder: {
            ...state.notesFolder,
            [id]: action.folder
        },
        toSynchronise: updatedSynchronise
    })
}

const editFolder = (state, action) => {
    const { folder } = action
    const targetSection = folder.isTemporary ? "add" : "update"
    const updatedSynchronise = {
        ...state.toSynchronise,
        updatedAt: new Date(),
        [targetSection]: {
            ...state.toSynchronise[targetSection],
            [folder.id]: folder
        }
    }
    localStorage.setItem("local-notes", JSON.stringify(updatedSynchronise))
    return updatedObject(state, {
        notesFolder: {
            ...state.notesFolder,
            [folder.id]: folder
        },
        toSynchronise: updatedSynchronise
    })
}

const deleteFolder = (state, action) => {
    const { folderId } = action

    const updatedSynchronise = {
        ...state.toSynchronise,
        updatedAt: new Date()
    }

    let currentNoteIsDeleted = false
    state.notesFolder[folderId].notes.forEach(note => {
        const noteIsSavedInDb = !note.id.includes("temp") && !note.isTemporary
        if(noteIsSavedInDb){
            updatedSynchronise.delete.push(note.id)
        }
        if(note.isTemporary){
            delete updatedSynchronise.add[note.id]
        }
        if(note.id === state.opened.noteId){
            currentNoteIsDeleted = true
        }
    })
    localStorage.setItem("local-notes", JSON.stringify(updatedSynchronise))

    const updatedFolders = {...state.notesFolder}
    delete updatedFolders[folderId]
    return updatedObject(state, {
        notesFolder: updatedFolders,
        toSynchronise: updatedSynchronise,
        opened: {
            noteId: currentNoteIsDeleted ? null : state.opened.noteId,
            folderId: state.opened.folderId === folderId ? null: state.opened.folderId
        }
    })
}

const setNotes = (state, action) => {
    return updatedObject(state, {
        notesFolder: action.notesFolder
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.TOGGLE_NOTES: return toggleNotes(state, action)
        case actionTypes.SET_NOTES: return setNotes(state, action)
        case actionTypes.ADD_NOTE: return addNote(state, action)
        case actionTypes.ADD_NOTE_FOLDER: return addFolder(state, action)
        case actionTypes.EDIT_NOTE_FOLDER: return editFolder(state, action)
        case actionTypes.DELETE_NOTE_FOLDER: return deleteFolder(state, action)
        case actionTypes.EDIT_NOTE: return editNote(state, action)
        case actionTypes.REMOVE_NOTE: return removeNote(state, action)
        default: return state
    }
}

export default reducer