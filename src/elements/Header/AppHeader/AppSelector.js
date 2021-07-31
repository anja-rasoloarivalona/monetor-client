import React, { useState, useRef } from "react"
import styled from "styled-components"
import { ReactComponent as Grid } from '../../../icons/grid.svg'
import { useSelector } from 'react-redux'
import todoImg from '../../../images/to_do.png'
import transactionsImg from '../../../images/transactions.png'
import agendaImg from '../../../images/agenda.png'
import contactsImg from '../../../images/contacts.png'
import messagesImg from '../../../images/messages.png'
import { Link } from '../../../components'
import { useOnClickOutside } from '../../../hooks'

const Container = styled.div`
    position: relative;
    margin-left: 1rem;
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
        // fill: ${props => props.themetextLight};
        fill: ${(props) => props.theme.background ? props.theme.white : props.theme.themetextLight};

    }

    :hover {
        background: ${props => props.theme.background};
    }
`

const List = styled.div`
    position: absolute;
    top: calc(100% + 1rem);
    right: 0;
    z-index: 1;
    background: ${props => props.theme.surface};
    box-shadow: ${props => props.theme.boxShadow};
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: max-content;
    grid-auto-rows: max-content;
    padding: 1rem;
    border-radius: .8rem;
`

const ListItem = styled(Link)`
    width: 11rem;
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
    width: 6rem;
    height: 6rem;
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

    const [ showList, setShowList ] = useState(false)

    const container = useRef()

    useOnClickOutside(container, () => setShowList(false))

    const {
        text: { text }
    } = useSelector(state => state)

    const items = [
        {
            label: text.to_do,
            src: todoImg,
            link: text.link_todo
        },
        {
            label: text.calendar,
            src: agendaImg,
            link: text.link_calendar
        },
        {
            label: text.contacts,
            src: contactsImg,
            link: ""
        },
        {
            label: text.messages,
            src: messagesImg,
            link: text.link_messages
        },
        {
            label: text.transactions,
            src: transactionsImg,
            link: text.link_transactions
        }
    ]

    return (
        <Container ref={container}>
          <IconContainer onClick={() => setShowList(prev => !prev)}>
              <Grid />
          </IconContainer>
          {showList && (
            <List>
                {items.map((item ,index) => (
                <ListItem
                    key={index}
                    to={`/${item.link}`}
                    onClick={() => setShowList(false)}
                >
                    <ListItemImgContainer>
                    <ListItemImg src={item.src}/>
                    </ListItemImgContainer>
                    <ListItemLabel>
                        {item.label}
                    </ListItemLabel>
                </ListItem>
                ))}
            </List>
          )}
   
        </Container>
     )
};

export default AppSelector;
