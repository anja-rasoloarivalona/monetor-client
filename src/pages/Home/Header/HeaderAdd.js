import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { DropDown } from '../../../elements'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useOnClickOutside } from '../../../hooks'
import { useSelector } from 'react-redux'


const Container = styled.div`
    position: relative;
`

const Label = styled.div`
    display: flex;
    align-items: center;
    background: ${props => props.theme.onSurface};
    padding-right: 1.5rem;
    font-size: 1.4rem;
    cursor: pointer;

    :hover {
        box-shadow: ${props => props.theme.boxShadow};
    }

`

const IconContainer = styled.div`
    width: 3.5rem;
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        font-size: 1.3rem;
        color: ${props => props.theme.textLight};
    }

 
 
`

const List = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
`

const ListItem = styled.div`
    width: 100%;
    padding: 1.5rem 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.4rem;
    border-radius: .5rem;
    :hover {
        background: ${props => props.theme.background};
    }
`

const HeaderAdd = () => {

    const {
        text: { text }
    } = useSelector(s => s)

    const container = useRef()

    const [ showList, setShowList ] = useState(false)

    useOnClickOutside(container, () => {
        setShowList(false)
    })


    const config = {
        w: 350,
        h: 200,
        style: {
            right: 0
        }
    }

    const listItems = [
        {id: "transactions", label: text.transactions},
        {id: "todo", label: text.to_do},
        {id: "note", label: text.note},
    ]

    return (
        <Container ref={container}>
            <Label onClick={() => setShowList(prev => !prev)}>
                <IconContainer>
                    <FontAwesomeIcon icon="plus"/>
                </IconContainer>
                {text.add}
            </Label>
            <DropDown
                show={showList}
                config={config}
            >
                <List>
                    {listItems.map(item => (
                        <ListItem key={item.id}>
                            {item.label}
                        </ListItem>
                    ))}
                </List>
            </DropDown>         
        </Container>
     )
};

export default HeaderAdd;
