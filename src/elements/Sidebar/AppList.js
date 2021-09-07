import React from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import { Link } from '../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AppIcon from '../../icons'

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 2rem 0;
`

const List = styled.ul`
    list-style: none;
`

const ListItem = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem 2rem 1rem 1.5rem;
    font-size: 1.4rem;
    position: relative;

    :hover {
        background: ${props => props.theme.background};
        .toggle {
            opacity: 1;
        }
    }
`

const ListItemContent = styled(Link)`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    color: ${props => props.theme.text} !important;
`


const ListItemIcon = styled.div`
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 2rem;

    svg {
        width: 2rem;
        height: 2rem;
    }
`

const ListItemLabel = styled.div`
    font-size: 1.4rem;
`

const ToggleList = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    right: 2rem;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    opacity: 0;
    cursor: pointer;

    :hover {
        background: ${props => props.theme.surface};
    }

    svg {
        font-size: 1rem;
        color: ${props => props.theme.textLight};
    }
`


const AppList = props => {

    const {
        text: { text },
        todos: { activeBoardId }
    } = useSelector(state => state)

    const { setShowList, closeHandler } = props


    const items = [
        {
            label: text.messages,
            icon: "messages",
            link: text.link_messages
        },
        {
            label: text.projects,
            icon: "todo",
            link: `${text.link_projects}/${activeBoardId}`
        },
        {
            label: text.calendar,
            icon: "calendar",
            link: text.link_calendar
        },
        {
            label: text.transactions,
            icon: "transactions",
            link: text.link_transactions,
            id: "transactions",
            // subList: [
            //     {
            //         label: text.dashboard,
            //         link: text.link_dashboard,
            //         icon: "chart-bar"
            //     },
            //     {
            //         label: text.list,
            //         link: text.link_list,
            //         icon: "list"
            //     },
            //     {
            //         label: text.budget,
            //         link: text.link_budget,
            //         icon: "coins"
            //     }
            // ]
        },
        {
            label: text.notes,
            icon: "notes",
            link: text.link_notes
        }

    ]

    return (
        <Container>
            <List>
                {items.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemContent
                            to={`/${item.link}`}
                            onClick={closeHandler}
                        >
                            <ListItemIcon>
                                <AppIcon id={item.icon}/>
                            </ListItemIcon>
                            <ListItemLabel>
                                {item.label}
                            </ListItemLabel>
                        </ListItemContent>
 
                        {item.subList && (
                            <ToggleList
                                onClick={() => setShowList({
                                    ...item,
                                    display: true
                                })}
                                className="toggle"
                            >
                                <FontAwesomeIcon icon="chevron-right"/>
                            </ToggleList>
                        )}
                    </ListItem>

                ))}
            </List>
        </Container>
    )
}

export default AppList