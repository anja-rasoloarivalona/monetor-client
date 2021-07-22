import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { ScrollBar, Link } from '../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.5);
    z-index: 99;
`

const Container = styled(ScrollBar)`
    position: fixed;
    top: 0;
    left: 0;
    width: 30rem;
    height: 100vh;
    background: ${props => props.theme.surface};
    color: ${props => props.theme.textActive};
    z-index: 100;
    transform: translateX(${props => props.showSidebar ? 'none' : '-100%'});
    transition: all .3s ease-in;
`

const Header = styled.div`
    height: 6.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${props => props.theme.background};
    padding: 0 2rem;
`
const HeaderLabel = styled.div`
   font-size: 1.6rem;
`

const CloseButton = styled.div`
    width: 4rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    position: absolute;
    top: 1rem;
    left: 32rem;
    z-index: 110;

    svg {
        font-size: 2.6rem;
        color: ${props => props.theme.background};
    }

    :hover {
        background: ${props => props.theme.background};
        svg {
            color: ${props => props.theme.grey};
        }
    }
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

const SubList = styled.div`
    display: flex;
    flex-direction: column;
`

const SubListItem = styled.div`
    padding: 1rem 2rem;
    padding-left: 7rem;
    font-size: 1.4rem;
    width: 100%;
    cursor: pointer;
    :hover {
        background: ${props => props.theme.onSurface};
    }
`

const SubListItemLink = styled(Link)`
    padding: 1rem 2rem;
    padding-left: 7rem;
    font-size: 1.4rem;
    cursor: pointer;
    width: 100%;

    :hover {
        background: ${props => props.theme.onSurface};
    }
`


const Sidebar = props => {

    const { showSidebar, setShowSidebar } = props

    const location = useLocation()

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
                    path: `/finance/${text.link_dashboard}`
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
        <>
        {showSidebar && (
            <>
                <Background onClick={() => setShowSidebar(false)}/>
                <CloseButton onClick={() => setShowSidebar(false)}>
                    <FontAwesomeIcon icon="times"/>
                </CloseButton>
            </>
        )}
 
        <Container showSidebar={showSidebar}>
            <Header>
                <HeaderLabel>
                    Menu
                </HeaderLabel>
            </Header>
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
                                        <FontAwesomeIcon icon="chevron-right"/>
                                    </ToggleContainer>
                                )}
                            </ListItemContent>
                        }
                        {displayedList.includes(option.id) && (
                            <SubList>
                                {option.children.map(child => {
                                    if(child.path){
                                        return (
                                            <SubListItemLink to={child.path}>
                                                {child.label}
                                            </SubListItemLink>
                                        )
                                    } else {
                                        return (
                                            <SubListItem>
                                                {child.label}
                                            </SubListItem>
                                        )
                                        
                                    }
                                })}
                            </SubList>
                        )}
                    
                    </ListItem>
                ))}
            </List>
        </Container>
        </>
     )
};

export default Sidebar;
