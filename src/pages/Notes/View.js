/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import ViewHeader from "./ViewHeader";
import { useSelector, useDispatch } from 'react-redux'
import { Input, TextEditor } from '../../components/Form/WithoutValidation'
import { useKeyboardEvent, useOnClickOutside } from '../../hooks'
import { formatDate } from '../../functions'
import moment from 'moment'
import * as actions from '../../store/actions'
import { generateId } from '../../functions'

const Container = styled.div`
    background: ${props => props.theme.surface};
    position: relative;
`

const TitleInput = styled.div`
    height: 7.5rem;
    display: flex;
    align-items: flex-end;
    padding: 0 1rem;
    > div {
        height: 4.5rem;
        input {
            height: 4.5rem;
            font-size: 2.7rem;
            font-weight: 600;
            border-color: transparent !important;
        }
    }
 
`

const ContentInput = styled.div`
    padding: 0 1rem;
    height: calc(100vh - 6.5rem - 7.5rem);
    width: 100%;
    cursor: text;

    .textinput {
        max-height: calc(100vh - 6.5rem - 7.5rem - 5.5rem);
        height: calc(100vh - 6.5rem - 7.5rem - 5.5rem);
    }

    .rdw-editor-wrapper {
        .rdw-editor-toolbar {
            cursor: pointer;
            height: 5.5rem;
            // transform: translateY(20%);
            // opacity: 0;
            transition: all .3s ease-in;

            ${props => {
                // if(props.contentIsFocused){
                //     return {
                //         transform: "translateY(0%)",
                //         opacity: 1
                //     }
                // }
            }}

            > div:first-child > div:first-child img {
                width: 1.4rem !important;
            }

        }

        .rdw-option-wrapper {
            > img {
                width: 1.8rem;
            }
        }
    }
`

const TimeStamp = styled.div`
    position: absolute;
    top: 1rem;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
    font-size: 1.3rem;
    color: ${props => props.theme.textLight};
    z-index: 1;
`

const View = props => {

    const dispatch = useDispatch()

    const { current, setCurrent, submitHandler } = props

    const editorRef = useRef()
    const titleRef = useRef()
    const container = useRef()

    const [ currentViewId, setCurrentViewedId ] = useState(current.id)
    const [ titleIsFocused, setTitleIsFocused ] = useState(false)
    const [ contentIsFocused, setContentIsFocused ] = useState(false)
    const [ mounted, setMounted ] = useState(false)
    const [ focusEnd, setFocusEnd ] = useState(1)

    const {
        settings: {locale},
        text: { text },
        notes: { opened, notesFolder }
    } = useSelector(state => state)

    useEffect(() => {
        setMounted(true)
    },[])

    let timeoutId
    useEffect(() => {
        if(currentViewId === current.id){
            const isSavedInDb = !current.id.includes("temp") && !current.isTemporary
            const prevData = current.isSavedInRedux || isSavedInDb ? notesFolder[opened.folderId].notes.find(i => i.id === current.id) : { title: "", content: "<p><br></p>"}
            const titleHasChanged = prevData.title !== current.title && current.title !== ""
            const contentHasChnaged = prevData.content !== current.content
            if(titleHasChanged || contentHasChnaged){
                clearTimeout(timeoutId)
                    timeoutId = setTimeout(() => {
                        submitHandler()
                    },1200)
            }
        }
        return () => clearTimeout(timeoutId)
    },[current.title, current.content])

    useEffect(() => {
        if(currentViewId && currentViewId !== current.id){
            setCurrentViewedId(current.id)
            titleRef.current.focus()
        }
    },[current.id])


    useEffect(() => {
        if(!titleIsFocused && mounted){
            if(current.title === "" && current.isTemporary){
                setCurrent(null)
            }
        }
    },[titleIsFocused])


    useKeyboardEvent("Enter", () => {
        if(titleIsFocused && current.title !== ""){
            editorRef.current.focusEditor()
            setFocusEnd(prev => prev + 1)
        }
    })

    const onClickTextEditor = () => {
        if(current.title === ""){
            titleRef.current.focus()
        }
    }

    const getTimeStamp = timestamp => {
        const formats = {
            fr: `dd mm yy ${text.at} hh:min`,
            en: `mm dd, yy ${text.at} hh:min`
        }
        return formatDate(timestamp, formats[locale], locale, "long")
    }



    return (
        <Container ref={container}>
            <TimeStamp>
                {getTimeStamp(current.updatedAt)}
            </TimeStamp>
            <TitleInput>
                <Input 
                    value={current.title}
                    onChange={value => setCurrent(prev => ({...prev, title: value}))}
                    onFocus={() => setTitleIsFocused(true)}
                    onBlur={() => setTitleIsFocused(false)}
                    customRef={titleRef}
                    focusOnMount
                />
            </TitleInput>
            <ContentInput
                onClick={onClickTextEditor}
                contentIsFocused={contentIsFocused}
            >
                {current.title !== "" && (
                    <TextEditor
                        inputId={current.id} 
                        currentValue={current.content}
                        onChange={value => setCurrent(prev => ({...prev, content: value}))}
                        customRef={editorRef}
                        focusEnd={focusEnd}
                        onFocus={() => setContentIsFocused(true)}
                        onBlur={() => setContentIsFocused(false)}
                    />
                )}

            </ContentInput>
        </Container>
     )
};

export default View;
