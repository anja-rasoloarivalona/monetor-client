import React from "react"
import styled from "styled-components"
import { ScrollBar } from '../../components'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Container = styled(ScrollBar)`
    position: fixed;
    top: 6.5rem;
    left: 0;
    height: calc(100vh - 6.5rem);
    width: 35rem;
    z-index: 2;
    background: ${props => props.theme.surface};
`

const List = styled.ul`
    list-style: none;
    padding: 1rem;
`

const Item = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem;
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
    font-size: 1.6rem;
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

const Sidebar = () => {

    const {
        user: { contacts }
    } = useSelector(state => state)

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
                            {contact.user.username}
                        </ItemLabel>
                    </Item>
                ))}
            </List>
        </Container>
     )
};

export default Sidebar;
