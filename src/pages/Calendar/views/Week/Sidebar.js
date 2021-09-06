import React from "react"
import styled from "styled-components"
import { getHoursDate } from './functions'
import { useSelector } from 'react-redux'


const Container = styled.div`
    width: 100%;
    border-right: 1px solid ${props => props.theme.form.unfocused.border};
    grid-row: 1 / 3;
    grid-column: 1 / 2;
    position: relative;
    z-index: 2;
    background: ${props => props.theme.onSurface};
    &:before {
        position: absolute;
        top: -1px;
        left: 0;
        width: 100%;
        height: 1px;
        background: red;
        z-index: 1;
        content: "";
    }
`

const List = styled.div`
    display: flex;
    flex-direction: column;

    > div:last-child {
        > div {
            display: none;
        }
    }
`

const ListItem = styled.div`
    width: 100%;
    border-bottom: 1px solid ${props => props.theme.form.unfocused.border};
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    font-size: 1.2rem;
`

const ListItemLabel = styled.div`
    padding: 1rem;
    transform: translateY(50%);
    background: ${props => props.theme.onSurface};


`

const Sidebar = () => {
    const {
        settings: { unitType }
    } = useSelector(state => state)

    return (
        <>
            <Container className="sidebar">
                <List className="sidebar__list">
                    {getHoursDate(unitType).map((h, index) => (
                        <ListItem key={index} className="sidebar__list__item">
                            <ListItemLabel>
                                {h}
                            </ListItemLabel>
                        </ListItem>
                    ))}
                </List>
            </Container>
        </>
     )
};

export default Sidebar;
