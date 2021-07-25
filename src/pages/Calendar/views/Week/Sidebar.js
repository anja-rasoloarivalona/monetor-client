import React, { useEffect } from "react"
import styled from "styled-components"
import { getHoursDate } from '../../functions'
import { useSelector } from 'react-redux'

const Container = styled.div`
    width: 20rem;
    border-right: 1px solid ${props => props.theme.form.unfocused.border};
`

const List = styled.div`
    display: flex;
    flex-direction: column;
`

const ListItem = styled.div`
    width: 100%;
    height: 8rem;
    border-bottom: 1px solid ${props => props.theme.form.unfocused.border};
    display: flex;
    align-items: start;
    justify-content: flex-end;
    font-size: 1.2rem;
    padding: 1rem;
`



const Sidebar = () => {

    const {
        settings: { unitType }
    } = useSelector(state => state)

    useEffect(() => {

    },[])

  
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
