import React from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import todoImg from '../../../../images/to_do.png'
import transactionsImg from '../../../../images/transactions.png'
import agendaImg from '../../../../images/agenda.png'
import contactsImg from '../../../../images/contacts.png'
import messagesImg from '../../../../images/messages.png'


const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 1rem;
`

const Header = styled.div`
    font-size: 1.6rem;
    margin-bottom: 2rem;
`

const List = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: max-content;
    grid-auto-rows: max-content;
    width: 100%;
`

const ListItem = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    border-radius: 1rem;
    cursor: pointer;

    :hover {
        background: ${props => props.theme.background};
    }
`

const ListItemImgContainer = styled.div`
    width: 7rem;
    height: 7rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
`
const ListItemImg = styled.img`
    width: 65%;
    object-fit: contain;
`

const ListItemLabel = styled.div`
    font-size: 1.4rem;
`

const AppSelector = () => {

    const {
        text: { text }
    } = useSelector(state => state)

    const items = [
        {
            label: text.to_do,
            src: todoImg
        },
        {
            label: text.agenda,
            src: agendaImg
        },
        {
            label: text.contacts,
            src: contactsImg
        },
        {
            label: text.messages,
            src: messagesImg
        },
        {
            label: text.transactions,
            src: transactionsImg
            
        },
    ]

    return (
        <Container>
          <Header>
              {text.applications}
          </Header>
          <List>
            {items.map((item , index) => (
                <ListItem key={index}>
                    <ListItemImgContainer>
                    <ListItemImg src={item.src}/>
                    </ListItemImgContainer>
                    <ListItemLabel>
                        {item.label}
                    </ListItemLabel>
                </ListItem>
            ))}
          </List>
        </Container>
     )
};

export default AppSelector;
