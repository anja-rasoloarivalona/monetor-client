import React from "react"
import styled from "styled-components"
import { ScrollBar, Link } from '../../components'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Container = styled(ScrollBar)`
    position: fixed;
    top: 6.5rem;
    left: 0;
    width: 25rem;
    height: calc(100vh - 6.5rem);
    z-index: 1;
    background: ${props => props.theme.surface};
    border-right: 1px solid ${props => props.theme.form.unfocused.border};
`

const List = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 2rem;
`

const ListItem = styled(Link)`
    width: 100%;
    padding: 1.2rem 2rem 1.2rem 3rem;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    color: ${props => props.theme.text} !important;

    :hover {
        background: ${props => props.theme.background};
    }
`

const ListItemLabel = styled.div`
`

const ListItemIcon = styled.div`
    margin-right: 2rem;
`

const Sidebar = () => {

    const { 
        text: { text }
    } = useSelector(state => state)

    const list = [
        {
            label: text.general,
            link: text.link_settings_general,
            icon: "cog"
        },
        {
            label: text.display,
            link: text.link_settings_display,
            icon: "palette"
        },
        {
            label: text.security,
            link: text.link_settings_security,
            icon: "lock"
        },
    ]

    return (
        <Container>
            <List>
                {list.map((item, index) => (
                    <ListItem key={index} to={`/${text.link_settings}/${item.link}`}>
                        <ListItemIcon>
                            <FontAwesomeIcon icon={item.icon}/>
                        </ListItemIcon>
                        <ListItemLabel>
                            {item.label}
                        </ListItemLabel>
                    </ListItem>
                ))}
            </List>      
        </Container>
     )
};

export default Sidebar;
