import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';
import { useSelector } from 'react-redux'
import { useOnClickOutside } from '../../hooks'
import { generateId } from '../../functions'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import * as actions from '../../store/actions'

const Container = styled.div`
    width: 100%;
    min-height: 5rem;
    background: #ffdee4;
    border-radius: .5rem;
    overflow: hidden;
    margin-bottom: 1rem;
    position: relative;

    * {
        box-sizing: border-box;
    }

    .rdw-editor-wrapper {
        position: relative;
        width: 100%;
        padding-bottom: 3.5rem;

        .rdw-editor-toolbar {
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 2;
            // border: 1px solid ${props => props.theme.form.unfocused.border};
            border-top: none;
            height: 3.5rem;
            margin: auto;
            width: 100%;
            font-family: Roboto;
            background: #ffdee4;
            padding: 0 .5rem;

            > div:first-child > div:first-child img {
                width: 1.1rem !important;
            }

        }

        .rdw-option-wrapper {
            border: none;
            background: transparent;
            min-width: unset;
            height: unset;

            > img {
                width: 1.3rem;
                object-fit: contain;
            }
        }
    }


    .textinput {
        // border: 1px solid ${props => props.theme.form.unfocused.border};
        margin: 0;
        padding: 1.5rem;
        padding-bottom: 1.5rem;
        font-size: 1.4rem;
        height: max-content;
        min-height: 7rem;
        max-height: 50vh;
        border-bottom: none;

        .rdw-editor-main {
            height: max-content !important;
        }


        .public-DraftEditorPlaceholder-root {
            color: ${props => props.theme.form.unfocused.border};
            font-size: 14px !important;
            text-justify: start;
            width: 100%;
            height: 100%;

        }

        .public-DraftEditorPlaceholder-inner {
            font-size: 14px !important;
        }

        .DraftEditor-root {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
        }

        .DraftEditor-editorContainer {
            width: 100%;
            height: 100%;


            .public-DraftStyleDefault-block {
                margin: 0;
            }
        }

    }

`

const SaveButton = styled.div`
    position: absolute;
    bottom: 0rem;
    right: 0rem;
    padding: 1rem 2rem;
    font-size: 1.4rem;
    z-index: 2;
    cursor: pointer;
    :hover {
        text-decoration: underline;
    }
`

const NoteInput = props => {

    const dispatch = useDispatch()

    const { setIsAdding, edited, setEdited } = props

    const {
        text: { text },
        settings: { locale },
        notes: { notes }
    } = useSelector(state => state)


    const containerRef = useRef()
    const editorRef = useRef()
    const emptyInputValue = "<p><br></p>"

    const [ input, setInput ] = useState("")
    const [ initialized, setInitialized ] = useState(false)
    const [ editor, setEditor ] = useState(EditorState.createEmpty())

    useOnClickOutside(containerRef, () => submitNoteHandler())

    useEffect(() => {
        editorRef.current.focusEditor()
    },[])

    useEffect(() => {
        if(edited && edited.content !== emptyInputValue){
            if(!initialized){
                const initial = EditorState.createWithContent(stateFromHTML(edited.content))
                setEditor(initial)
                setInitialized(true) 
            }
        }
    },[edited])

    useEffect(() => {
        if(editor){
            const content = stateToHTML(editor.getCurrentContent())
            setInput(content)
        }
    },[editor])


    const submitNoteHandler = () => {
        if(input !== emptyInputValue){
            const shouldSubmit = edited ? edited.content !== input : true
            if(shouldSubmit){
                const newNote = {
                    id: edited ? edited.id : generateId(),
                    content: input,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
                dispatch(actions.saveNote({
                    note: newNote,
                    isEditing: edited
                }))
            }
            closeHandler()
        } else {
            if(notes.length > 0){
                closeHandler()
            }
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
        <Container ref={containerRef}> 
            <Editor 
                editorClassName="textinput"
                editorState={editor}
                onEditorStateChange={val => setEditor(val)}
                locale={locale}
                ref={editorRef}
                toolbar={{
                    options: [
                        'inline',
                        'list',
                        'link',
                        'emoji',
                    ],
                    inline: {
                        inline: { inDropdown: true },
                        options: ['bold', 'italic', 'underline']
                    },
                }}  
            />
            <SaveButton onClick={submitNoteHandler}>
                {text.save}
            </SaveButton>
        </Container>
     )
};

export default NoteInput;
