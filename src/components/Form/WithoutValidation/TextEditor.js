import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';
import { useSelector } from 'react-redux'
import { useOnClickOutside } from '../../../hooks'


const Container = styled.div`
    width: 100%;
    flex: 1;
    min-height: 5rem;
    background: ${props => props.theme.surface};
    border-radius: .5rem;
    overflow: hidden;
    position: relative;

    * {
        box-sizing: border-box;
    }

    .rdw-editor-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        padding-bottom: 3.5rem;

        .rdw-editor-toolbar {
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 2;
            border-top: none;
            height: 3.5rem;
            margin: auto;
            width: 100%;
            font-family: Roboto;
            padding: 0 .5rem;
            border: none;
            background: inherit;

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

    ${props => {
        return props.customStyle
    }}

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

    const {
        currentValue,
        onChange,
        submitHandler,
        config,
        customStyle,
        customRef,
        focusEnd,
        inputId,
        isSmall
    } = props

    const {
        text: { text },
        settings: { locale },
    } = useSelector(state => state)

    const containerRef = useRef()
    const localEditorRef = useRef()
    const editorRef = customRef || localEditorRef

    const emptyInputValue = "<p><br></p>"

    const initialValue = currentValue && currentValue !== emptyInputValue ?
            EditorState.createWithContent(stateFromHTML(currentValue)) : 
            EditorState.createEmpty()

    const [ editor, setEditor ] = useState(initialValue)
    const [ currentInputId, setCurrentInputId ] = useState(inputId)

    const moveFocusToEnd = editorState => {
        editorState = EditorState.moveSelectionToEnd(editorState);
        return EditorState.forceSelection(editorState, editorState.getSelection());
    }

    useOnClickOutside(containerRef, ()  =>{
        if(submitHandler){
            submitHandler()
        }
    })

    useEffect(() => {
        if(props.focusOnMount){
            editorRef.current.focusEditor()
        }
    },[])

    useEffect(() => {
        if(inputId){
            if(inputId !== currentInputId){
                setEditor(EditorState.createWithContent(stateFromHTML(currentValue)))
                setCurrentInputId(inputId)
            }
        }
    },[inputId])


    useEffect(() => {
        if(currentValue === ""){
            const isNotEmpty = stateToHTML(editor.getCurrentContent()) !== emptyInputValue
            if(isNotEmpty){
                setEditor(EditorState.createEmpty())
            }
        }
        
    },[currentValue])

    useEffect(() => {
        if(focusEnd){
            moveFocusToEnd(editor)
        }
    },[focusEnd])

    const onChangeHandler = val => {
        setEditor(val)
        const content = stateToHTML(val.getCurrentContent())
        onChange(content)
    }

    const toolBarConfig = {
        default: {
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
        },
        small: {
            options: ["inline", "list"],
            inline: {
                options:  ['bold', 'italic']
            },
            list: {
                options: ['unordered'],
            }
        }
    }

    return (
        <Container
            ref={containerRef}
            customStyle={customStyle}
        > 
            <Editor 
                editorClassName="textinput"
                editorState={editor}
                onEditorStateChange={val => onChangeHandler(val)}
                locale={locale}
                ref={editorRef}
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                placeholder={props.placeholder || ""}
                toolbar={isSmall ? toolBarConfig.small : toolBarConfig.default}  
            />
            {config && config.showSaveButton && submitHandler && (
                <SaveButton onClick={submitHandler}>
                    {text.save}
                </SaveButton>
            )}

        </Container>
     )
};

export default NoteInput;
