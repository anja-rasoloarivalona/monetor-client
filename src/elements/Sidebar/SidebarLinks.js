import React from "react"
import styled from "styled-components"
import {  Link } from '../../components'
import { useSelector } from 'react-redux'
import AppIcon from '../../icons'


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

    svg {
        width: 2rem;
        height: 2rem;
    }

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

    svg {
        width: 2rem;
        height: 2rem;
    }
    
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
            label: text.dashboard,
            link: text.link_dashboard,
            icon: "dashboard"
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
        // {
        //     label: text.invite_members,
        //     icon: faEnvelope,
        //     action: true
        // }
    ]

    return (
        <Container>
            <List>
                {items.map((item ,index) => {

                    const ItemContainer = item.action ? ListItem : ListItemLink

                    return (
                        <ItemContainer
                            key={index}
                            to={`/${item.link}`}
                            onClick={item.action ? closeHandler : null}
                        >
                            <ListItemIcon>
                                <AppIcon id={item.icon}/>
                            </ListItemIcon>
                            <ListItemLabel>
                                {item.label}
                            </ListItemLabel>
                        </ItemContainer>
                    )
                })}
            </List>
        </Container>
     )
};

export default SidebarLinks;
