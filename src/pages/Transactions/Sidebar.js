import React from "react"
import styled from "styled-components"
import { ScrollBar, Link } from '../../components'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Container = styled( ScrollBar)`
    position: fixed;
    top: 6.5rem;
    left: 0;
    width: 25rem;
    height: calc(100vh - 6.5rem);
    z-index: 1;
    background: ${props => props.theme.surface};
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
            label: text.dashboard,
            link: text.link_dashboard,
            icon: "chart-bar"
        },
        {
            label: text.list,
            link: text.link_list,
            icon: "list"
        },
        {
            label: text.budget,
            link: text.link_budget,
            icon: "coins"
        }
    ]

    return (
        <Container>
            <List>
                {list.map((item, index) => (
                    <ListItem key={index} to={`/${text.link_transactions}/${item.link}`}>
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
