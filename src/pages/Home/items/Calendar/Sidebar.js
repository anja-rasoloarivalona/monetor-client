import React from "react"
import styled from "styled-components"
import { getHoursDate } from '../../../Calendar/views/Month/functions'
import { useSelector } from 'react-redux'

const Container = styled.div`
    width: 5rem;
    min-height: 20rem;
    height: 100%;
    border-right: 1px solid ${props => props.theme.background};
`

const List = styled.div`
    display: flex;
    flex-direction: column;

    > div:not(:last-child){
        border-bottom: 1px solid ${props => props.theme.background};
    }
`

const ListItem = styled.div`
    width: 100%;
    height: 4.6rem;
    display: flex;
    align-items: start;
    justify-content: flex-end;
    font-size: 1.05rem;
    padding-right: .5rem;
    padding-top: .5rem;
    color: ${props => props.theme.textLight};
`

const Sidebar = () => {

    const {
        settings: { unitType }
    } = useSelector(state => state)

    return (
        <Container>
             <List>
                {getHoursDate(unitType).map((h, index) => (
                    <ListItem key={index}>
                        {h}
                    </ListItem>
                ))}
            </List>         
        </Container>
     )
};

export default Sidebar;
