import React from "react"
import styled from "styled-components"

const Container = styled.div`
    width: 100%;
    height: 100%;
    background: ${props => props.theme.suface};
    padding: 1rem;
`

const Title = styled.div`
    font-size: 1.2rem;
    margin: .5rem;
`

const TodoItem = props => {

    const { item  } = props

    return (
        <Container>
            <Title>{item.item.title}</Title>
        </Container>
     )
};

export default TodoItem;
