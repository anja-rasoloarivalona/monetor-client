import React from "react"
import styled from "styled-components"
import {  Link } from '../../components'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope } from '@fortawesome/free-regular-svg-icons'

const Container = styled.div`
    border-bottom: 1px solid ${props => props.theme.background};
    padding-bottom: 1rem;
`

const List = styled.div`
    display: flex;
    flex-direction: column;
`

const ListItem = styled.div`
    display: flex;
    align-items: center;
    color: ${props => props.theme.text} !important;
    height: 4.5rem;
    padding-right: 2rem;
    padding-left: 1.5rem;
    font-size: 1.4rem;
    cursor: pointer;

    :hover {
        background: ${props => props.theme.background};
    }
`


const ListItemLink = styled(Link)`
    display: flex;
    align-items: center;
    color: ${props => props.theme.text} !important;
    height: 4.5rem;
    padding-right: 2rem;
    padding-left: 1.5rem;
    font-size: 1.4rem;

    :hover {
        background: ${props => props.theme.background};
    }
`

const ListItemIcon = styled.div`
    width: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 2rem;
`

const ListItemLabel = styled.div``

const SidebarLinks = props => {

    const { closeHandler } = props

    const {
        text: { text }
    } = useSelector(state => state)


    const items = [
        {
            label: text.home,
            link: text.link_app_home,
            icon: "home"
        },
        {
            label: text.settings,
            link: text.link_settings,
            icon: "cog"
        },
        // {
        //     label: text.profile,
        //     link: text.link_profile,
        //     icon: faUser
        // },
        {
            label: text.invite_members,
            icon: faEnvelope,
            action: true
        }
    ]

    return (
        <Container>
            <List>
                {items.map((item ,index) => {

                    if(item.action){
                        return (
                            <ListItem
                                key={index}
                            >
                                <ListItemIcon>
                                    <FontAwesomeIcon icon={item.icon}/>
                                </ListItemIcon>
                                <ListItemLabel>
                                    {item.label}
                                </ListItemLabel>
                            </ListItem>
                        )
                    }
                    return (
                        <ListItemLink
                            key={index}
                            to={`/${item.link}`}
                            onClick={closeHandler}
                        >
                            <ListItemIcon>
                                <FontAwesomeIcon icon={item.icon}/>
                            </ListItemIcon>
                            <ListItemLabel>
                                {item.label}
                            </ListItemLabel>
                        </ListItemLink>
                    )
                })}
            </List>
        </Container>
     )
};

export default SidebarLinks;
