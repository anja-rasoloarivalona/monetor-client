import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { useKeyboardEvent } from '../../hooks'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import { ReactComponent as SendSvg } from '../../icons/send.svg'
import autosize from 'autosize'


const Container = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: min-content;
    background: ${props => props.theme.surface};
    display: flex;
    align-items: center;
    padding: 1rem;
    border-top: 1px solid ${props => props.theme.form.unfocused.border};

    ${props => {
        if(props.rounded){
            return {
                borderBottomLeftRadius: ".6rem",
                borderBottomRightRadius: ".6rem"
            }
        }
    }}
`

const TextArea = styled.textarea`
    display:block;
    width: 100%;
    background: ${props => props.theme.form.unfocused.background};
    border: 1px solid ${props => props.theme.form.unfocused.border};;
    border-radius: 16px;
    padding: 10px 10px;
    resize: none;

    :focus {
        background: ${props => props.theme.form.unfocused.background};
        outline: 0;
    }
`

const SendButton = styled.div`
    width: 4rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin-left: 1.2rem;
    align-self: flex-end;
    cursor: pointer;

    svg {
        width: 2.2rem;
        fill: ${props => props.theme.primary};
    }

    :hover {
        background: ${props => props.theme.primary};
        svg {
            width: 1.6rem;
            fill: ${props => props.theme.surface};
        }
    }
`
const MessageBar = props => {

    const dispatch = useDispatch()

    const { setMessageBarHeight, messageBarHeight, current, rounded } = props

    const [ message, setMessage ] = useState('')
    const [ isFocused, setIsFocused ] = useState(false)
    const messageBarRef = useRef()

    const {
        text: {text },
        user: { id: userId },
        settings: { locale, socket },
    } = useSelector(state => state)

    useEffect(() => {
        autosize(document.querySelectorAll('textarea'));
    },[])

    useEffect(() => {
        if(messageBarRef.current){
            if(messageBarHeight !== messageBarRef.current.clientHeight ){
                setMessageBarHeight(messageBarRef.current.clientHeight)
            }
        }
    },[message])


    const onFocusHandler = () => {
        setIsFocused(true)
    }

    const onBlurHandler = () => {
        setIsFocused(false)
    }

    useKeyboardEvent("Enter", () => {
        if(isFocused){
            sendMessage()
        }
    })

    const sendMessage = () => {
        if(message !== "" && current){
            const newMessage = {
                id: new Date().toTimeString(),
                associationId: current.id,
                content: message,
                fromId: userId,
                toId: current.user.id,
                seen: 0,
                updatedAt: new Date(),
                createdAt: new Date()
            }
            dispatch(actions.addMessage(newMessage))
            socket.emit('send-message', newMessage)
            setMessage("")
        }
    }

    return (
        <Container  ref={messageBarRef} rounded={rounded}>
            <TextArea
                id="messagebar"
                value={message}
                placeholder={text.transactions_msgPlaceholder}
                onChange={e => setMessage(e.target.value)}
                rows={1} 
                onFocus={onFocusHandler}
                onBlur={onBlurHandler}
            />
            <SendButton onClick={sendMessage}>
                <SendSvg />
            </SendButton>       
        </Container>
     )
};

export default MessageBar;
