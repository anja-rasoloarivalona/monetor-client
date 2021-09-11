import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import {SidebarItemContainer,  SidebarHeader, SidebarHeaderTitle, SidebarHeaderIcon } from './style'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as FilePond  from 'react-filepond'
import { Button } from '../../../components'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import { Input } from '../../../components/Form/WithoutValidation'
import axios from 'axios'
import { Loader } from '../../../components'
import { urlIsValid } from '../../../functions'
import { ImageCropper } from '../../../elements'
import 'filepond/dist/filepond.min.css';
import { useOnClickOutside } from '../../../hooks'
import { serialize } from 'object-to-formdata'

FilePond.registerPlugin(FilePondPluginFileValidateType);

const Container = styled(SidebarItemContainer)`
    top: 0rem;
    width: 24vw;
    min-width: 30rem;
    .filepond--root .filepond--drop-label {
        height: 28vh;
        font-size: 1.4rem;
    }

    .filepond--panel-root {
        border-radius: 0;
    }
    .filepond--credits {
        display: none !important;
    }
    .filepond--list-scroller {
        display: none;
    }
`



const Body = styled.div`
    padding: 1rem;
    > div:first-child {
        margin-bottom: 2rem;
    }
    ${props => {
        if(!props.fileSrc){
            return {
                "> div:first-child": {
                    paddingBottom: "2rem",
                    borderBottom: `1px solid ${props.theme.onSurface}`
                }
            }
        }
    }}
`

const BodySection = styled.div`

`

const BodySectionInputContainer = styled.div`
    margin-bottom: 2rem;
    input {
        height: 4.5rem;
        color: ${props => props.theme.text};
    };
`

const LabelContainer = styled.div`
    margin-bottom: 1rem;
`

const Label = styled.label`
    font-size: 1.4rem;
`



const FileContainer = styled.div`
    height: 28vh;
`

const FileCta = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 1.4rem;
    padding-right: 1rem;
`

const FileCtaItem = styled.div`
    font-size: 1.4rem;
    margin-left: 1.5rem;
    text-decoration: underline;
    cursor: pointer;
    :hover {
        color: ${props => props.theme.primary};
    }

    input {
        display: none;
    }
`

const FilePreviewContainer = styled.div`
    width: 100%;
    height: 100%;
`

const FilePreview = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const Cta = styled.div`
    margin: 2rem 0;
    display: flex;
    justify-content: flex-end;
`

const LoaderContainer = styled.div`
    margin-right: 2rem;
`


const Attachments = props => {

    const { edited, setTodoLists, setIsEdited, closeHandler } = props

    const {
        text: { text }
    } = useSelector(s => s)

    const containerRef = useRef()

    useOnClickOutside(containerRef, () => {
        if(closeHandler){
            closeHandler()
        }
    })


    const FileInput = FilePond.FilePond

    const [ file, setFile ] = useState(null)
    const [ fileSrc, setFileSrc ] = useState(null)
    const [ link, setLink ] = useState("")
    const [ title, setTitle ] = useState("")
    const [ canSubmit, setCanSubmit ] = useState(false)
    const [ isSubmitting, setIsSubmitting ] = useState(false)
    const [ croppedImage, setCroppedImage ] = useState(null)

    const isLinkValid = urlIsValid(link)

    const addHandler = data => {
        const _file = data[0] instanceof File ? data[0] : data[0].file
        const allowedImageTypes = ["image/jpeg", "image/png"]
        if(allowedImageTypes.includes(_file.type)){
            setFile(_file)
            getLocalSrc(_file)
        }
    }

    const deleteHandler = () => {
        setFile(null)
        setFileSrc(null)
    }

    const getLocalSrc = async image => {
        const reader = new FileReader()
        reader.onload = function (e){
            setFileSrc(e.target.result)  
        }
        reader.readAsDataURL(image)
    }

    const submit = async() => {
        if(canSubmit){
            try {
                const payload = serialize({
                    title,
                    url: link ,
                    ownerId: edited.id,
                    coverImage: !edited.coverImage 
                })
                if(fileSrc && file){
                    payload.append('file', file)
                }
                setIsSubmitting(true)
                const res = await axios({
                    method: "post",
                    url: "/todo/attachment",
                    data: payload
                })
                const updatedTodo = {
                    ...edited,
                    attachments: [...edited.attachments, res.data.data],
                    coverImage: edited.coverImage ? edited.coverImage : res.data.data.id
                }
                setTodoLists(prev => {
                    const listId = edited.todoListId
                    const tempIndex = prev[listId].todos.findIndex(i => i.id === edited.id)
                    const updatedLists = {...prev}
                    updatedLists[listId].todos[tempIndex] = updatedTodo
                    return updatedLists
                })
                setIsEdited(updatedTodo)
                setIsSubmitting(false)
            } catch(err){
                console.log({
                    err
                })
                setIsSubmitting(false)
            }
        }
    }

    useEffect(() => {
        if((isLinkValid || fileSrc) && title !== ""){
            setCanSubmit(true)
        }
    },[isLinkValid, title, fileSrc])


    return (
        <Container ref={containerRef}>
            <SidebarHeader>
                <div></div>
                <SidebarHeaderTitle>
                    {text.attachments}
                </SidebarHeaderTitle>
                <SidebarHeaderIcon onClick={closeHandler}>
                    <FontAwesomeIcon icon="times"/>
                </SidebarHeaderIcon>
            </SidebarHeader>
            <Body fileSrc={fileSrc}>
                <BodySection hidden={isLinkValid}>
                    <LabelContainer>
                        <Label>{text.upload_a_file}</Label>
                    </LabelContainer>
                    <FileContainer>
                        {!fileSrc ?
                            <FileInput 
                                files={file}
                                onupdatefiles={addHandler}
                                allowMultiple={false}
                                acceptedFileTypes="image/jpeg,image/png, image/jpg"
                                labelIdle={`${text.drag_and_drop} <span class="filepond--label-action">${text.browse}</span>`}
                            />
                            :
                            <FilePreviewContainer onClick={() => {
                                const image = file
                                image.src = fileSrc
                                setCroppedImage(image)
                            }}>
                                <FilePreview src={fileSrc} />
                            </FilePreviewContainer>
                        }
                    </FileContainer>
                    {fileSrc && (
                        <FileCta>
                            <FileCtaItem>
                                <Label>
                                    {text.edit}
                                    <input
                                        type="file"
                                        onChange={e => addHandler(e.target.files)}
                                    />
                                </Label>
                            </FileCtaItem>
                            <FileCtaItem onClick={deleteHandler}>
                                {text.delete}
                            </FileCtaItem>
                        </FileCta>                        
                    )}
                </BodySection>
                <BodySection>
                    {!fileSrc && (
                        <BodySectionInputContainer>
                            <LabelContainer>
                                <Label>{text.attach_a_link}</Label>
                            </LabelContainer>
                            <Input 
                                value={link}
                                onChange={setLink}
                                placeholder={text.attach_a_link_placeholder}
                            />
                        </BodySectionInputContainer>
                    )}

                    {(isLinkValid || fileSrc) && (
                        <BodySectionInputContainer>
                            <LabelContainer>
                                <Label>{text.title}</Label>
                            </LabelContainer>
                            <Input 
                                value={title}
                                onChange={setTitle}
                            />
                        </BodySectionInputContainer>
                    )}
   
                    <Cta>
                        {isSubmitting ?
                            <LoaderContainer>
                                <Loader />
                            </LoaderContainer>
                             :
                            <Button
                                square
                                isDisabled={!canSubmit}
                                onClick={submit}
                            >
                                {text.save}
                            </Button>
                        }

                    </Cta>
                </BodySection>
            </Body>
            {croppedImage && (
                <ImageCropper 
                    image={croppedImage}
                    aspect={16/9}
                    closeHandler={() => setCroppedImage(null)}
                />
            )}
        </Container>
     )
};

export default Attachments;
