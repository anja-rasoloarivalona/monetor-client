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

    const { moveCardBetweenList, toDos, listToDos,  setToDos } = props



    const [{ isOver }, dropRef] = useDrop({
        accept: "card",
        drop: (toDo) => moveCardBetweenList(toDo),
        collect: (monitor) => ({
          isOver: !!monitor.isOver(),
        }),
      });


      const moveCardInsideList = useCallback((dragIndex, hoverIndex) => {
        if(dragIndex !== undefined && hoverIndex !== undefined){
            const updatedTodos = [...toDos]
            const aux = toDos[hoverIndex]
            updatedTodos[hoverIndex] = toDos[dragIndex]
            updatedTodos[dragIndex] = aux
            updatedTodos.forEach( (t, index) => {
                updatedTodos[index].index = index
            })
            setToDos(updatedTodos)
        }
        // const dragToDo = toDos[dragIndex];

        // setToDos(update(toDos, {
        //     $splice: [
        //         [dragIndex, 1],
        //         [hoverIndex, 0, dragToDo],
        //     ],
        // }));
    }, [toDos]);

    return (
        <Container 
            ref={dropRef}
            style={{ backgroundColor: isOver ? "#bbf" : "rgba(0,0,0,.12" }}
        >
            {listToDos.map((toDo, index) => (
                <Card 
                    toDo={toDo}
                    key={toDo.id}
                    moveCardInsideList={moveCardInsideList}
                    index={index}
                />
            ))}
        </Container>
    )
};

export default List;
