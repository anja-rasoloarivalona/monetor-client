import React, { useState, useRef } from "react"
import styled from "styled-components"
import {  useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useOnClickOutside } from '../../../hooks'
import SettingsPannel from './SettingsPannel'

const Container = styled.div`
    display: flex;
    align-items: center;
    color: ${props =>  props.theme.textActive};
`

const ImageContainer = styled.div`
    width: 4rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 2rem;
    background: ${props => props.theme.surface};

    svg {
        font-size: 1.7rem;
        color: ${props => props.theme.text};
    }
`
const UserName = styled.div`
    margin-right: 1rem;
    font-size: 1.6rem;
`

const ToggleContainer = styled.div`
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;

    svg {
        font-size: 1.2rem;
    }

    &:hover {
        background: ${props => props.theme.background};
        svg {
            color: ${props => props.theme.textActive};
        }
    }
`

const List = styled.div`
    position: absolute;
    top: 90%;
    right: 3rem;
    width: 35rem;
    height: max-content;
    background: ${props => props.theme.type === "dark" ? props.theme.background : props.theme.white};
    z-index: 9;
    box-shadow: ${props => props.theme.boxShadow};
    border-radius: 1rem;
    padding: 1rem 0;
`

const ListItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const ListItemContent = styled.div`
    width: 90%;
    display: flex;
    align-items: center;
    padding: .8rem 1rem;
    border-radius: 1rem;
    cursor: pointer;
    position: relative;

    :hover {
        background: ${props => props.theme.onSurface};
        .label {
            color: ${props => props.theme.textActive}
        }
        .toggle {
            color: ${props => props.theme.textActive}
        }
    }

    .toggle {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        right: 2rem;
        font-size: 1.4rem;
        color: ${props => props.theme.text};
    }
`

const ListItemIconContainer = styled.div`
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: ${props => props.theme.onSurface};
    margin-right: 2rem;

    svg {
        color: ${props => props.theme.textActive};
        font-size: 1.5rem;
    }
`
const ListItemLabel = styled.div`
    font-size: 1.6rem;
    color: ${props => props.theme.text};
`

const UserProfile = () => {

    const {
        user,
        text: { text }
    } = useSelector(state => state)

    const list = useRef()

    const [ showList, setShowList ] = useState(true)
    const [ showSettingsPannel, setShowSettingsPannel] = useState(true)


    const options = [
        {label: text.settings, icon: "cog", onToggle: () => setShowSettingsPannel(true)},
        {label: text.logout, icon: "power-off"},
    ]

    useOnClickOutside(list, () => setShowList(false))


    return (
        <Container ref={list}>
            <ImageContainer>
                <FontAwesomeIcon icon="user"/>
            </ImageContainer>
            <UserName>
                {user.username}
            </UserName>
            <ToggleContainer onClick={() => setShowList(prev => !prev)}>
                <FontAwesomeIcon icon="chevron-down"/>
            </ToggleContainer>
            {showList && (
                <List>
                    {showSettingsPannel ?
                        <SettingsPannel /> :
                        options.map(option => (
                            <ListItem id={option.label}>
                                <ListItemContent>
                                    <ListItemIconContainer>
                                        <FontAwesomeIcon 
                                            icon={option.icon}
                                        />
                                    </ListItemIconContainer>
                                    <ListItemLabel className="label">
                                        {option.label}
                                    </ListItemLabel>
                                    {option.onToggle && (
                                        <FontAwesomeIcon icon="chevron-right" className="toggle"/>
                                    )}
                                </ListItemContent>
                            </ListItem>
                        ))
                    }
                </List>
            )}
        </Container>
     )
};

export default UserProfile;
