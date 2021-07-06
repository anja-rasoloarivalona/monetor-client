import React, { useState, useCallback } from "react"
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


const List = props => {



    const { list, moveHandler } = props


    const [{ isOver }, dropRef] = useDrop({
        accept: "card",
        drop: (movedItem) => moveHandler({
            movedItem,
            toList: list
        }),
        collect: (monitor) => ({
          isOver: !!monitor.isOver(),
        }),
      });


    //   const moveCardInsideList = useCallback((dragIndex, hoverIndex) => {
    //     if(dragIndex !== undefined && hoverIndex !== undefined){
    //         const updatedTodos = [...toDos]
    //         const aux = toDos[hoverIndex]
    //         updatedTodos[hoverIndex] = toDos[dragIndex]
    //         updatedTodos[dragIndex] = aux
    //         updatedTodos.forEach( (t, index) => {
    //             updatedTodos[index].index = index
    //         })
    //         setToDos(updatedTodos)
    //     }
    // }, [toDos]);

    return (
        <Container 
            ref={dropRef}
            style={{ backgroundColor: isOver ? "#bbf" : "rgba(0,0,0,.12" }}
        >
            {list.todos.map((todo, index) => (
                <Card 
                    todo={todo}
                    key={todo.id}
                    moveHandler={moveHandler}
                />
            ))}
        </Container>
    )
};

export default List;
