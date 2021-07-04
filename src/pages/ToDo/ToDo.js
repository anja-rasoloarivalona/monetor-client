import React, { useState } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import { useDrag, useDrop } from "react-dnd";

const Container = styled.div`
    width: 100%;
    min-height: calc(100vh - 8rem);
    padding: 2rem;
    color: ${props => props.theme.text};
`

const Header = styled.div`
    font-size: 2rem;
    color: ${props => props.theme.textActive};
`

const HeaderTitle = styled.div``

const Content = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`

const ListContainer = styled.div`
    width: 30rem;
    height: 50vh;
    background: white;
    display: flex;
    justify-content: center;
`

const CardContainer = styled.div`
    width: 20rem;
    height: 20rem;
    background: red;
`


const Card = () => {

    const [{ isDragging }, dragRef] = useDrag({
        type: "card",
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      });

    return (
        <CardContainer 
            ref={dragRef}
            style={{
                backgroundColor: isDragging ? "#fbb" : "palegoldenrod",
            }}
        />
    )
}

const List = props => {

    const { moveCard, card  } = props

    const [{ isOver }, dropRef] = useDrop({
        accept: "card",
        drop: () => moveCard(),
        collect: (monitor) => ({
          isOver: !!monitor.isOver(),
        }),
      });

    return (
        <ListContainer 
            ref={dropRef}
            style={{ backgroundColor: isOver ? "#bbf" : "rgba(0,0,0,.12" }}
        >
            {card ? <Card /> : "Empty"}
        </ListContainer>
    )
}

const ToDo = () => {

    const { 
        text: { text }
    } = useSelector(state => state)

    const [index, setIndex] = useState(1);

    const moveCard = (i) => {
        setIndex(i);
      }
    

    return (
        <Container>
            <Header>
                <HeaderTitle>
                    {text.to_do_title}
                </HeaderTitle>
            </Header>
             <Content>
                <List moveCard={moveCard.bind(null, 1)} card={index === 1}>
                </List>
                <List moveCard={moveCard.bind(null, 2)} card={index === 2}>
                </List>
            </Content>
        </Container>
     )
};

export default ToDo;
