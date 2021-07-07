import React, { useState, useEffect } from "react"
import styled from "styled-components"
import {  useDrop } from "react-dnd";
import Card from './Card'


const Container = styled.div`
    width: 40rem;
    height: max-content;
    min-height: 50vh;
    background: white;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    align-items: center;
    position: relative;
`

const Header = styled.div`
    font-size: 2rem;
`

const Placeholder = styled.div`
    min-height: 4rem;
    width: 100%;
    background: transparent;
    height: ${props => props.height ? `${props.height}px` : "unset"};
`

const List = props => {

    const {list, moveHandler, setDraggedCard, draggedCard } = props

    const [{ isOver }, dropRef] = useDrop({
        accept: "card",
        drop: (movedItem) => {
            moveHandler({
                movedItem,
                toListId: list.id
            })
            setDraggedCard(null)
        },
        collect: (monitor) => ({
          isOver: monitor.isOver(),
        })
    });



    return (
        <Container 
            ref={dropRef}
            style={{ backgroundColor: isOver ? "#bbf" : "rgba(0,0,0,.12" }}
        >
            <Header>
                {list.title}
            </Header>
            {list.todos.map(todo => (
                <Card 
                    todo={todo}
                    key={todo.id}
                    moveHandler={moveHandler}
                    setDraggedCard={setDraggedCard}
                    draggedCard={draggedCard}
                />
            ))}
        </Container>
    )
};

export default List;
