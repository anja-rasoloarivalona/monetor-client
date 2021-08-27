import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from 'react-redux'
import Sidebar from "./Sidebar"
import View from './View'
import List from './List'
import * as actions from '../../store/actions'
import { generateId } from '../../functions'
import axios from 'axios'

const Container = styled.div`
    width: 100%;
    height: calc(100vh - 6.5rem);
    display: grid;
    grid-template-columns: 25rem 40rem 1fr;
`

const Notes = () => {

    const dispatch = useDispatch()

    const {
        text,
        notes: { notesFolder, opened }
    } = useSelector(state => state)

    const [ current, setCurrent ] = useState(null)
    const [ isAddingNewFolder, setIsAddingNewFolder ] = useState(false)

    useEffect(() => {
        if(!notesFolder){
            dispatch(actions.getUserNotes())
        }
    },[notesFolder])



    // useEffect(() => {
    //     if(opened.noteId && opened.noteId !== current.id){
    //         const currentNote = notesFolder[opened.folderId].notes.find(note => note.id === opened.noteId )
    //     }
    // },[opened.noteId])

    
    const getInitialNote = () => {
        return {
            title: "",
            content: "<p><br></p>",
            id: `temp-${generateId()}`,
            isSavedInRedux: false,
            isTemporary: true,
            updatedAt: new Date(),
            type: "note",
            folderId: opened.folderId
        }
    }
    

    const submitHandler = () => {
        if(!current.isSavedInRedux){
            const updated = {
                ...current,
                isSavedInRedux: true
            }
            dispatch(actions.addNote(updated))
            setCurrent(updated)
        } else {
            dispatch(actions.editNote(current))
        }
    }

    const selectNoteHandler = note => {
        dispatch(actions.toggleNotes({
            type: "note",
            id: note.id
        }))
        setCurrent(note)
    }

    const addNoteHandler = () => {
        if(current){
            const isSavedInDb = !current.id.includes("temp") && !current.isTemporary
            const prevData = current.isSavedInRedux || isSavedInDb ?
            notesFolder[opened.folderId].notes.find(i => i.id === current.id) :
            { title: "", content: "<p><br></p>"}
            const titleHasChanged = prevData.title !== current.title && current.title !== ""
            const descriptionHasChanged = prevData.description !== current.description
            if(titleHasChanged || descriptionHasChanged){
                submitHandler()
            }
        }
        const initialNote = getInitialNote()
        selectNoteHandler(initialNote)
    }

    const addFolderHandler = () => {
        if(!isAddingNewFolder){
            setIsAddingNewFolder(true)
        }
    }



    if(!notesFolder){
        return null
    }

    return (
        <Container>
            <Sidebar 
                addFolderHandler={addFolderHandler}
                isAddingNewFolder={isAddingNewFolder}
                setIsAddingNewFolder={setIsAddingNewFolder}
            />
            <List 
                current={current}
                setCurrent={setCurrent}
                getInitialNote={getInitialNote}
                selectNoteHandler={selectNoteHandler}
                submitHandler={submitHandler}
                addNoteHandler={addNoteHandler}
                
            />
            {current && (
                <View 
                    current={current}
                    setCurrent={setCurrent}
                    submitHandler={submitHandler}
                />
            )}

        </Container>
     )
};

export default Notes;
