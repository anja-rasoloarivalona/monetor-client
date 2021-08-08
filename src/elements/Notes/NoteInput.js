import React, { useState } from "react"
import styled from "styled-components"
import { generateId } from '../../functions'
import { useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import TextEditor from '../../components/Form/WithoutValidation/TextEditor'


const Container = styled.div`
    margin-bottom: 1rem;
`

const NoteInput = props => {

    const dispatch = useDispatch()

    const { setIsAdding, edited, setEdited } = props

    const initialValue = edited ? edited.content : ""

    const [ value, setValue ] = useState(initialValue)


    const submitNoteHandler = () => {
        const hasChanged = edited && edited.content !== value
        const isNewAndNotEmpty = !edited && value !== "<p><br></p>"
        if(isNewAndNotEmpty || (hasChanged)){
            const newNote = {
                id: edited ? edited.id : generateId(),
                content: value,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            dispatch(actions.saveNote({
                note: newNote,
                isEditing: edited
            }))
        } else {
            closeHandler()
        }
    }

    const closeHandler = () => {
        if(edited){
            setEdited(null)
        } else {
            setIsAdding(false)
        }
    }


    return (
        <Container> 
            <TextEditor 
                currentValue={value}
                onChange={setValue}
                submitHandler={submitNoteHandler}
                config={{
                    showSaveButton: true
                }}
                customStyle={{
                    background: "#ffdee4"
                }}
            />
        </Container>
     )
};

export default NoteInput;
