import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import { Button, Loader, ScrollBar, ButtonWithLoader } from '../../components'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from 'axios'
import * as FilePond  from 'react-filepond'
import { useOnClickOutside } from '../../hooks'
import { Input } from '../../components/Form/WithoutValidation'
import 'filepond/dist/filepond.min.css';
import { serialize } from 'object-to-formdata'
import { urlIsValid, compressImageFile } from '../../functions'
FilePond.registerPlugin(FilePondPluginFileValidateType);

const Container = styled.div`
    width: 100%;

    .filepond--root .filepond--drop-label {
        height: 28rem;
        margin-top: 1rem;
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

const Header = styled.div`
    display: grid;
    grid-template-columns: 20% 60% 20%;
    align-items: center;
    justify-content: space-between;

    height: 7rem;
    padding: 0 1rem;
    padding-left: 2rem;
    font-size: 1.4rem;


    svg {
        cursor: pointer;
    }
`

const HeaderTitle = styled.div`
    text-align: center;
`

const Content = styled(ScrollBar)`
    padding: 1rem 2rem;
    max-height: calc(100vh - 7rem - 15rem);
`

const Options = styled.div`
`

const Option = styled.div`
    margin-bottom: 1rem;
    border-radius: .5rem;
    ${props => {
        if(props.active){
            return {
                background: props.theme.background
            }
        }
    }}
    :hover {
        background: ${props => props.theme.background};
    }
`

const OptionLabel = styled.div`
    font-size: 1.4rem;
    font-weight: 600;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
`

const OptionLabelLoading = styled.div`
    font-weight: 300;
    font-size: 1.3rem;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const OptionPreview = styled.div`
    width: 100%;
    height: 30rem;
    background: ${props => props.theme.background};
    padding: 1rem;
`

const OptionPreviewImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const OptonPreviewImgError = styled.div`
    padding: 0 1rem;
    padding-bottom: 1rem;
    font-size: 1.2rem;
    color: ${props => props.theme.error};
`

const List = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 9rem;
    grid-auto-rows: 9rem;
    column-gap: .5rem;
    row-gap: 1rem;
    padding: 1rem 0;
    background: ${props => props.theme.surface};
`

const ImageContainer = styled.div`
    width: 100%;
    height: 100%;
    border-radius: .4rem;
    overflow: hidden;
    cursor: pointer;
    background: ${props => props.theme.background};
    position: relative;

    :hover {
        box-shadow: ${props => props.theme.boxShadow};

    }

    ${props => {
        if(props.img === ""){
            return {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.4rem"
            }
        }
    }}
`

const ImageSelectedIcon = styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 1;
    font-size: 1.3rem;
    color: ${props => props.theme.green};
    background: ${props => props.theme.surface};
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
`

const ImageText = styled.div`
`

const ListImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all .3s ease-in;

    :hover {
        transform: scale(1.2);
    }
`



const Cta = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 5rem;
    padding: 0 1rem;
`

const CtaDefault = styled.div`
    height: 3rem;
    padding: 0 1rem;
    display: flex;
    align-items: center;
`

const CtaDefaultCheckBox = styled.div`
    width: 2rem;
    height: 2rem;
    border: 1px solid ${props => props.theme.form.unfocused.border};
    margin-right: 1rem;
    cursor: pointer;
    background: ${props => props.isChecked ? props.theme.primary : "transparent"};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: .2rem;
    svg {
        font-size: 1.3rem;
        color: white;
    }
`

const CtaDefaultLabel = styled.div`
    font-size: 1.2rem;
    display: flex;
    align-items: center;
`

const ToolTipContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    padding-top: .05rem;
    cursor: pointer;

    :hover {
        .text {
            display: inline-block;
        }

        svg {
            color: black;
        }
    }
`

const ToolTip = styled(FontAwesomeIcon)`
    color: grey;
    font-size: 1.6rem;
`

const ToolTipText = styled.div`
    position: absolute;
    bottom: calc(100% + .5rem);
    width: 25rem;
    height: max-content;
    padding: 1rem;
    background: rgba(0,0,0, .9);
    color: white;
    display: none;
    border-radius: .3rem;
    font-size: 1.3rem;
    line-height: 1.4;
`

const LoaderContainer = styled.div`
    margin-right: 2rem;
`


const InputContainer = styled.div`
    padding: 1rem;
    input {
        height: 4.5rem;
        color: ${props => props.theme.text};
    }
`
const BackgroundSelector = props => {

    const { closeHandler, element, config, setConfig } = props


    const dispatch = useDispatch()

    const {
        theme, 
        text: { text },
        todos: { activeBoardId, todoBoards },
        settings: { defaultBackground }
    } = useSelector(s => s)

    const container = useRef()
    const currentBackgroundImage = todoBoards && activeBoardId ? todoBoards[activeBoardId].backgroundImage : null

    const [ selected, setSelected ] = useState(null)
    const [ isDefault, setIsDefault ] = useState(null)
    const [ isSubmitting, setIsSubmitting ] = useState(false)
    const [ selectedOption, setSelectedOption ] = useState("list")
    const [ isProcessingFile, setIsProcessingFile ] = useState(false)
    const [ uploadedFile, setUploadedFile ] = useState(null)
    const [ url, setUrl ] = useState("")
    const [ invalidUrl, setInvalidUrl ] = useState(false)

    const FileInput = FilePond.FilePond


    const backgrounds = [
        "https://images.unsplash.com/photo-1600052434976-f98531a56f2b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1335&q=80",
        "https://images.unsplash.com/reserve/EnF7DhHROS8OMEp2pCkx_Dufer%20food%20overhead%20hig%20res.jpg?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1057&q=80",
        "https://images.unsplash.com/photo-1627580623617-d0e0eab56848?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
        "https://images.unsplash.com/photo-1627440265279-2e8dc70571e1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1490&q=80",
        "https://images.unsplash.com/photo-1512423229624-105e4f387d2d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1353&q=80",
        "https://images.unsplash.com/photo-1574052018066-049076cbe1c5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80",
        "https://images.unsplash.com/photo-1547308283-b74183c15032?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1457&q=80",
        "https://images.unsplash.com/photo-1625246433906-6cfa33544b31?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1259&q=80",
        "https://images.unsplash.com/photo-1484968309888-8d6b403bc1ec?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1628479734799-bcdebe7c85a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
        ""

    ]

    const toggleHandler = img => {
        setSelected(img)
        dispatch(actions.setBackgroundImage(img))
    }

    const saveHandler = async boardId => {
        if(selected){
            const payload = serialize({ })
            let url = ""
            if(element === "todo"){
                payload.append("boardId", boardId)
                payload.append("isDefault", isDefault)
                url = "/todo/board/background"
                if(selected instanceof File){
                    payload.append('file', selected)
                } else {
                    payload.append('imageUrl', selected )
                }
            }
            if(element === "main"){
                url = "settings/default-background"
            }
            try {
                setIsSubmitting(true)
                const res = await axios({
                    data: payload,
                    method: "post",
                    url
                })
                console.log({
                    res: res.data.data
                })
                const updatedBoard = {
                    ...todoBoards[boardId],
                    backgroundImage: res.data.data
                }
                dispatch(actions.setTodoBoard(updatedBoard))
                setIsSubmitting(false)
                closeHandler(true)

            } catch(err){
                console.log({
                    err
                })
            }
        }
    }

    useOnClickOutside(container, () => {
        if(!isSubmitting){
            if(element === "todo"){
                const background = todoBoards[activeBoardId].backgroundImage
                if(background !== theme.backgroundImage){
                    toggleHandler(background)
    
                }
            }
            if(element === "main"){
                toggleHandler(defaultBackground)
            } 
        }
    })


    useEffect(() => {
        if(url !== ""){
            if(urlIsValid(url)){
                setSelected(url)
                setInvalidUrl(false)
            } else {
                setInvalidUrl(true)
            }
        }
    },[url])

    useEffect(() => {
        let height = config.h
        const heights = {
            list: 680,
            computer: 570,
            url: {
                valid: 680,
                invalid: 370
            }
        }
        if(selectedOption !== "url"){
            height = heights[selected]
        } else {
            if(urlIsValid(url) && !invalidUrl){
                height =  heights.url.valid
            } else {
                height = heights.url.invalid
            }
        }
        setConfig(prev => ({
            ...prev,
            config: {
                ...prev.config,
                h: height
            }
        }))
    },[url, selected, selectedOption])


    const selectOptionHandler = id => {
        if(selectedOption !== id){
            if(id === "computer" ){
                setSelected("")
            }
            setSelectedOption(id)
        }
    }

    const uploadFileHandler = async data => {
        if(!isProcessingFile && data && data[0]){
            const file = data[0] instanceof File ? data[0] : data[0].file


            const allowedImageTypes = ["image/jpeg", "image/png"]
            if(allowedImageTypes.includes(file.type)){
                setIsProcessingFile(true)      
                const reader = new FileReader()
                reader.onload = function (e){
                    file.src = e.target.result
                    dispatch(actions.setBackgroundImage(file.src))
                    setSelected(file)
                    setIsProcessingFile(false)     
                    setUploadedFile(file)
                }
                reader.readAsDataURL(file)
            }
   
        }
    }

    const invalidImageUrlHandler = () => {
        setUrl("")
        setSelected("")
        setInvalidUrl(true)
    }

    const canSubmit = () => {
        if(currentBackgroundImage){
            return currentBackgroundImage !== selected
        } else {
            return selected && selected !== "" ? true : false
        }
    }


    return (
        <Container
            ref={container}
            config={config}
        >
            <Header>
                <FontAwesomeIcon icon="arrow-left" onClick={() => closeHandler(false)}/>
                <HeaderTitle>{text.background}</HeaderTitle>
                <Cta>
                    <ButtonWithLoader
                        square outlined medium
                        onClick={() => saveHandler(activeBoardId)}
                        isDisabled={!canSubmit()}
                        isLoading={isSubmitting}
                    >
                        {text.save}
                    </ButtonWithLoader>
                </Cta>
            </Header>
            <Content className="content">
                <Options>
                    <Option
                        active={selectedOption === "computer"}
                        onClick={() => selectOptionHandler("computer")}
                    >
                        <label>
                            <OptionLabel>
                                Upload from computer
                                {! isProcessingFile && <FontAwesomeIcon icon="upload"/>}
                            </OptionLabel>
                            <input
                                type="file"
                                onChange={e => uploadFileHandler(e.target.files)}
                                style={{display: "none"}}
                                disabled={isProcessingFile}
                            />
                        </label>
                        {selectedOption === "computer" && (
                            <OptionPreview>
                                {!isProcessingFile  && (
                                    <>
                                        {selected && selected.src ? 
                                                <OptionPreviewImg src={selected.src}/> :
                                                <FileInput 
                                                    files={selected}
                                                    onupdatefiles={uploadFileHandler}
                                                    allowMultiple={false}
                                                    acceptedFileTypes="image/jpeg,image/png, image/jpg"
                                                    labelIdle={`${text.drag_and_drop} <span class="filepond--label-action">${text.browse}</span>`}
                                                />
                                        }
                                    </>
                                )}
                                {isProcessingFile && (
                                    <OptionLabelLoading>{text.processing_file}</OptionLabelLoading>
                                )}
                            </OptionPreview>
                        )}
                    </Option>
                    <Option
                        active={selectedOption === "url"}
                        onClick={() => selectOptionHandler("url")}
                    >
                        <OptionLabel>
                            Upload from url
                            <FontAwesomeIcon icon="pencil-alt"/>
                        </OptionLabel>
                        {selectedOption === "url" && (
                            <>
                            <InputContainer>
                                <Input 
                                    value={url}
                                    onChange={setUrl}
                                    placeholder={text.attach_a_link_placeholder}
                                />
                            </InputContainer>
                                {urlIsValid(url) && !invalidUrl ? 
                                    <OptionPreview>
                                        <OptionPreviewImg src={selected} onError={invalidImageUrlHandler}/>
                                    </OptionPreview>
                                    :
                                    url !== "" ?
                                        <OptonPreviewImgError>
                                            Please enter a valid image url
                                        </OptonPreviewImgError> : ""
                                }
                            </>
                        )}
                    </Option>
                    <Option
                        active={selectedOption === "list"}
                        onClick={() => selectOptionHandler("list")}
                    >
                        <OptionLabel>
                            Choose from list
                            <FontAwesomeIcon icon="chevron-down"/>
                        </OptionLabel>
                        {selectedOption === "list" && (
                            <List>
                                {backgrounds.map(img => (
                                    <ImageContainer
                                        key={img}onClick={() => toggleHandler(img)}
                                        img={img}
                                    >
                                        {img && img !== "" ?
                                            <ListImage src={img} />
                                            : 
                                            <ImageText>
                                                {text.none}
                                            </ImageText>
                                        }
                                        {selected === img && (
                                            <ImageSelectedIcon>
                                                <FontAwesomeIcon icon="check"/>
                                            </ImageSelectedIcon>
                                        )}
                                    </ImageContainer>
                                ))}
                            </List>
                        )}
                    </Option>
                </Options>

                {element !== "main" && (
                    <CtaDefault>
                        <CtaDefaultCheckBox isChecked={isDefault}onClick={() => setIsDefault(prev => !prev)}>
                            {isDefault && <FontAwesomeIcon icon="check"/>}
                        </CtaDefaultCheckBox>
                        <CtaDefaultLabel>
                            {text.use_as_default}&nbsp;
                            <ToolTipContainer>
                                <ToolTip icon="question-circle"/>
                                <ToolTipText className="text">
                                    {text.use_as_default_background_tooltip}
                                </ToolTipText>
                            </ToolTipContainer>
                            
                        </CtaDefaultLabel>
                    </CtaDefault>
                )}
                {/* {selected && (
                    <Cta>
                        {isSubmitting ?
                            <LoaderContainer><Loader /></LoaderContainer>
                            :
                            <>
                                {selected && (
                                    <Button transparent>
                                        {text.cancel}
                                    </Button>
                                )}
                                <Button onClick={saveHandler}>
                                    {text.save}
                                </Button>
                            </>
                        }
                    </Cta>
                )} */}
            </Content>
        </Container>
     )
};

export default BackgroundSelector;
