import React, { useState, useRef } from "react"
import styled from "styled-components"
import { ScrollBar } from '../../../components'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getTimeStamp } from '../../../functions'
import { useOnClickOutside } from '../../../hooks'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import * as actions from '../../../store/actions'

const Container = styled.div`
    position: relative;
    margin-right: 1rem;
`

const IconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
    width: 4rem;
    height: 4rem;
    cursor: pointer;
    border-radius: 50%;
    padding: .7rem;

    svg {
        fill: ${props => props.themetextLight};
        font-size: 1.7rem;
    }

    :hover {
        background: ${props => props.theme.background};
    }
`

const List = styled.ul`
    list-style: none;
    padding: 1rem;
    position: absolute;
    top: calc(100% + 1rem);
    right: 0;
    z-index: 1;
    background: ${props => props.theme.surface};
    box-shadow: ${props => props.theme.boxShadow};
    border-radius: .8rem;
    width: 33rem;

`
const Item = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem;
    padding-right: 2rem;
    border-radius: 1rem;
    cursor: pointer;

    :hover {
        background: ${props => props.theme.background};
        .icon {
            background: ${props => props.theme.surface};
        }
    }
`

const ItemImgContainer = styled.div`
    width: 6rem;
    height: 6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin-right: 1rem;
    position: relative;
    background: ${props => props.theme.background};

    svg {
        font-size: 2rem;
    }
`

const ItemLabel = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`

const ItemLabelUsername = styled.div`
    font-size: 1.6rem;
    line-height: 1.4;
`


const ItemStatus = styled.div`
    width: 1.55rem;
    height: 1.55rem;
    border-radius: 50%;
    background: ${props => props.theme.green};
    border: 2.5px solid ${props => props.theme.surface};
    position: absolute;
    bottom: .5rem;
    right: 0rem;
`

const LastMessage = styled.div`
    font-size: 1.3rem;
    color: ${props => props.theme.textLight};
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`

const LastMessageItem = styled.span``

const Messages = () => {

    const dispatch = useDispatch()
    
    const [ showList, setShowList ] = useState(false)

    const container = useRef()

    useOnClickOutside(container, () => setShowList(false))

    const {
        user: { contacts, id: userId },
        messages,
        text: { text },
        settings: { locale }
    } = useSelector(state => state)


    const renderLastMessage = contact => {
        let data = null
        const isLoaded = messages[contact.id] && messages[contact.id].loaded
        if(isLoaded){
            data = messages[contact.id].data[0]
        } else {
            if(contact.messages){
                data = contact.messages[0]
            }
        }
        if(!data){
            return null
        }

        const currentUser = data.fromId === userId

        return (
            <LastMessage>
                <LastMessageItem>
                    {currentUser && `${text.you}:`}
                    {data.content} 
                </LastMessageItem>
                <LastMessageItem>
                    {getTimeStamp(data.createdAt, locale )}
                </LastMessageItem>
            </LastMessage>
        )
    }

    const clickHandler = id => {
        const data = {open: true, id}
        dispatch(actions.toggleDraggableMessage(data))
    }

    return (
        <Container ref={container}>
            <IconContainer onClick={() => setShowList(prev => !prev)}>
                <FontAwesomeIcon icon={faComment}/>
            </IconContainer>
            {showList && (
            <List>
                {contacts.map(contact => (
                    <Item
                        key={contact.id}
                        onClick={() => clickHandler(contact.id)}
                    >
                        <ItemImgContainer className="icon">
                            <FontAwesomeIcon icon="user"/>
                            {contact.isConnected && (
                                <ItemStatus />
                            )}
                        </ItemImgContainer>
                        <ItemLabel>
                            <ItemLabelUsername>
                                {contact.user.username}
                            </ItemLabelUsername>
                            {renderLastMessage(contact)}
                        </ItemLabel>
                    </Item>
                ))}
            </List>  
            )}
 
        </Container>
     )
};

export default Messages;
