import React, {useState} from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'

const Container = styled.div`
    position: absolute;
    top: calc(100% + 1rem);
    left: 0;
    z-index: 2;
    width: 30rem;
    height: 20rem;
    background: ${props => props.theme.surface};
    box-shadow: ${props => props.theme.boxShadow};
`

const AddDueDate = () => {

    const {
        text: { text }
    } = useSelector(state => state)

    return (
        <Container>
          
        </Container>
     )
};

export default AddDueDate;
