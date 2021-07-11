import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { ScrollBar, Link } from '../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'

const Container = styled(ScrollBar)`
    position: fixed;
    top: 6.5rem;
    left:0;
    width: 23rem;
    height: calc(100vh - 6.5rem);
    background: ${props => props.theme.surface};
    color: ${props => props.theme.textActive};
`

const List = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
`

const ListItem = styled.div`
    width: 100%;
    margin-bottom: 1rem;
`
const ListItemLink = styled(Link)`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 1.3rem 2rem;
    cursor: pointer;
    position: relative;

    :hover {
        background: ${props => props.theme.onSurface};
    }
`

const ListItemContent = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 1.3rem 2rem;
    cursor: pointer;
    position: relative;

    :hover {
        background: ${props => props.theme.onSurface};
    }
`

const ListItemIconContainer = styled.div`
    margin-right: 2rem;
    svg {
        font-size: 1.5rem;
        color: ${props => props.theme.text};
    }
`

const ListItemLabel = styled.div`
    font-size: 1.5rem;
    color: ${props => props.theme.textActive};
`
const ToggleContainer = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    right: 2rem;
    display: flex;
    align-items: center;
`

const SubList = styled.div``

const SubListItem = styled.div`
    padding: 1rem 2rem;
    padding-left: 7rem;
    font-size: 1.4rem;
    cursor: pointer;
    :hover {
        background: ${props => props.theme.onSurface};
    }
`


const Sidebar = () => {

    const dispatch = useDispatch()

    const [ displayedList, setDisplayedList ] = useState([])

    const {
        text: { text }
    } = useSelector(state => state)

    const options = [
        {
            id: "finance",
            label: text.finance,
            icon: "coins",
            children: [
                {
                    id: "dashboard",
                    label: text.dashboard,
                    icon: "user",
                    path: `/${text.link_dashboard}`
                },
                {
                    id: "transactions",
                    label: text.transactions,
                    icon: "user",
                    path: `/${text.link_transactions}`
                },
            ]
        },
        {
            id: "network",
            label: text.network,
            icon: "user",
            children: [
                {
                    id: "friends",
                    label: text.friends,
                    icon: "user",
                },
                {
                    id: "groups",
                    label: text.groups,
                    icon: "user",
                },
            ]
        },
        {
            id: "toDo",
            label: text.to_do,
            icon: "user",
            path: `/${text.link_todo}`
        },
        {
            id: "settings",
            label: text.settings,
            icon: "cog"
        },

    ]

    const toggleList = option => {
        const { id, children } = option
        if(children){
            const isToggled = displayedList.includes(id)
            let updatedList = [...displayedList]

            if(isToggled){
                updatedList = displayedList.filter(i => i !== id)
            } else {
                updatedList.push(id)
            }
            console.log({
                updatedList
            })
            setDisplayedList(updatedList)
        }
    }

    return (
        <Container>
            <List>
                {options.map(option => (
                    <ListItem key={option.id}>
                        {option.path ?
                            <ListItemLink to={option.path}>
                                <ListItemIconContainer>
                                    <FontAwesomeIcon icon={option.icon}/>
                                </ListItemIconContainer>
                                <ListItemLabel>
                                    {option.label}
                                </ListItemLabel>
                            </ListItemLink> :
                            <ListItemContent onClick={() => toggleList(option)}>
                                <ListItemIconContainer>
                                    <FontAwesomeIcon 
                                        icon={option.icon}
                                    />
                                </ListItemIconContainer>
                                <ListItemLabel>
                                    {option.label}
                                </ListItemLabel>
                                {option.children && (
                                    <ToggleContainer>
                                        <FontAwesomeIcon icon="chevron-down"/>
                                    </ToggleContainer>
                                )}
                            </ListItemContent>
                        }
                        {displayedList.includes(option.id) && (
                            <SubList>
                                {option.children.map(child => (
                                    <SubListItem>
                                        {child.label}
                                    </SubListItem>
                                ))}
                            </SubList>
                        )}
                    
                    </ListItem>
                ))}
            </List>
        </Container>
     )
};

export default Sidebar;
