import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';
import { useSelector } from 'react-redux'

const Container = styled.div`

    * {
        box-sizing: border-box;
    }

    .textinput {
        border: 1px solid ${props => props.error ? props.theme.form.error_color : props.theme.form.unfocused.border};
        border-top-color: ${props => props.toolbarHidden ? props.theme.form.unfocused.border : 'transparent'};
        margin: 0;
        padding: 1rem;
        padding-left: .6rem;

        font-family: Roboto;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        font-size: 1.4rem;
        resize: vertical;
        height: max-content;
        min-height: 7rem;
        max-height: 50vh;



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
            height: calc(100% - 2rem);
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

    .rdw-editor-toolbar {
        margin-bottom: 0;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        border: 1px solid ${props => props.theme.form.unfocused.border};
        border-bottom: none;
    }

`

const FormatHelper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
`

const FormatHelperButton = styled.div`
    padding: 1rem 2rem;
    background: ${props => props.theme.background};
    font-size: 1.4rem;
    cursor: pointer;
    border-radius: .3rem;
`

const TextEditor = props => {
    
    const {currentValue,  input, onChange, onFocus, onBlur } = props

    const {
        text: { text },
        settings: { locale }
    } = useSelector(state => state)

    const [ editor, setEditor ] = useState(EditorState.createEmpty())
    const [ initialized, setInitialized ] = useState(false)
    const [ toolbarHidden, setToolbarHidden] = useState(true)


    useEffect(() => {
        if(currentValue && currentValue !== ""){
            if(!initialized){
                const initial = EditorState.createWithContent(stateFromHTML(currentValue))
                setEditor(initial)
                setInitialized(true) 
            }
        }
    },[currentValue])


    useEffect(() => {
        if(editor){
            const content = stateToHTML(editor.getCurrentContent())
            onChange(content)
        }
    },[editor])




    const onFocusHandler = () => {
        if(onFocus){
            onFocus()
        }
    }

    const onBlurHandler = () => {
        if(onBlur){
            onBlur()
        }
    }


    return (
        <Container toolbarHidden={toolbarHidden}>
            <Editor
                toolbarHidden={toolbarHidden}
                editorClassName="textinput"
                editorState={editor}
                onEditorStateChange={val => setEditor(val)}
                placeholder={input.placeholder}
                locale={locale}
                onFocus={onFocusHandler}
                onBlur={onBlurHandler}
                toolbar={{
                    options: [
                        'inline',
                        'fontFamily',
                        'list',
                        'textAlign',
                        'colorPicker',
                        'link',
                        'embedded',
                        'image',
                        'emoji',
                        'remove',
                        'history'
                    ],
                    inline: {
                        options: ['bold', 'italic', 'underline']
                    }
                }}           
            />
            <FormatHelper>
                <FormatHelperButton onClick={() => setToolbarHidden(prev => !prev)}>
                    {toolbarHidden ?  text.formatting_help : text.close_formatting_help}
                </FormatHelperButton>
            </FormatHelper>
        </Container>
     )
};

export default TextEditor;
