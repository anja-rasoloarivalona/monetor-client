import React, { useState, useRef } from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import { Button, Loader } from '../../components'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from 'axios'
import { useOnClickOutside } from '../../hooks'

const Container = styled.div`
    width: 100%;
`

const List = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 9rem;
    grid-auto-rows: 9rem;
    column-gap: .5rem;
    row-gap: 1rem;
    padding: 1rem;
`

const ImageContainer = styled.div`
    width: 100%;
    height: 100%;
    border-radius: .4rem;
    overflow: hidden;
    cursor: pointer;

    :hover {
        box-shadow: ${props => props.theme.boxShadow};

    }
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

const BackgroundSelector = props => {

    const { closeHandler, element } = props


    const dispatch = useDispatch()

    const { 
        text: { text },
        user: { activeTodoBoardId, todoBoards },
        settings: { defaultBackground }
    } = useSelector(s => s)

    const container = useRef()

    const [ selected, seSelected ] = useState(null)
    const [ isDefault, setIsDefault ] = useState(null)
    const [ isSubmitting, setIsSubmitting ] = useState(false)

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
        "https://images.unsplash.com/photo-1484968309888-8d6b403bc1ec?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"

    ]

    const toggleHandler = img => {
        seSelected(img)
        dispatch(actions.setBackgroundImage(img))
    }

    const saveHandler = async () => {
        if(selected){
            const payload = { imageUrl: selected }
            let url = ""

            if(element === "todo"){
                payload.boardId = activeTodoBoardId
                payload.isDefault = isDefault
                url = "/todo/board/background"
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
                    res
                })
                setIsSubmitting(false)
                closeHandler()
            } catch(err){
                console.log({
                    err
                })
            }
        }
    }

    useOnClickOutside(container, () => {
        if(element === "todo"){
            const background = todoBoards[activeTodoBoardId].backgroundImage
            toggleHandler(background)
        }
        if(element === "main"){
            toggleHandler(defaultBackground)
        }
    })



    return (
        <Container ref={container}>
            <List>
                {backgrounds.map(img => (
                    <ImageContainer
                        key={img}
                        onClick={() => toggleHandler(img)}
                    >
                        <ListImage src={img} />
                    </ImageContainer>
                ))}
            </List>
            {element !== "main" && (
                <CtaDefault>
                    <CtaDefaultCheckBox
                        isChecked={isDefault}
                        onClick={() => setIsDefault(prev => !prev)}
                    >
                        {isDefault && (
                            <FontAwesomeIcon icon="check"/>
                        )}
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

            <Cta>
                {isSubmitting ?
                    <LoaderContainer>
                        <Loader />
                    </LoaderContainer>
                    :
                    <>
                        {selected && (
                            <Button transparent>
                                {text.cancel}
                            </Button>
                        )}
        
                        <Button
                            isDisabled={!selected}
                            onClick={saveHandler}
                        >
                            {text.save}
                        </Button>
                    </>
                }
            </Cta>
        </Container>
     )
};

export default BackgroundSelector;
