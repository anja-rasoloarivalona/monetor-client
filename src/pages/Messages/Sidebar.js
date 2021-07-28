import React from "react"
import styled from "styled-components"
import { ScrollBar } from '../../components'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getTimeStamp } from '../../functions'

const Container = styled(ScrollBar)`
    position: fixed;
    top: 6.5rem;
    left: 0;
    height: calc(100vh - 6.5rem);
    width: 35rem;
    z-index: 2;
    background: ${props => props.theme.surface};
    border-right: 1px solid ${props => props.theme.form.unfocused.border};
`

const List = styled.ul`
    list-style: none;
    padding: 1rem;
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

const Sidebar = () => {

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

    return (
        <Container>
            <List>
                {contacts.map(contact => (
                    <Item key={contact.id}>
                        <ItemImgContainer className="icon">
                            <FontAwesomeIcon icon="user"/>
                            {contact.isConnected && (
                                <ItemStatus />
                            )}
                        </ItemImgContainer>
                        <ItemLabel>
                            <ItemLabelUsername>
                                {contact.user.firstname} {contact.user.lastname} 
                            </ItemLabelUsername>
                            {renderLastMessage(contact)}
                        </ItemLabel>
                    </Item>
                ))}
            </List>
        </Container>
     )
};

export default Sidebar;
