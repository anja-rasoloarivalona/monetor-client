import React, { useState, useEffect } from "react"
import styled from "styled-components"
import {  useDrop } from "react-dnd";
import Card from './Card'
import CardInput from "./CardInput";
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import * as actions from '../../store/actions'
import { generateId } from '../../functions'

const Container = styled.div`
    width: 30rem;
    height: max-content;
    background: white;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    align-items: center;
    position: relative;
    border-radius: .7rem;
    background: ${props => props.isOver ? "pink" : props.theme.onSurface};
    min-height: 12.5rem;
`

const Header = styled.div`
    font-size: 1.4rem;
    text-align: start;
    width: 100%;
    margin-bottom: 1rem;
    font-weight: 600;
    padding-left: 1rem;
`

const AddCard = styled.div`
    text-align: start;
    width: 100%;
    font-size: 1.3rem;
    color: ${props => props.theme.grey};
    margin-top: .8rem;
    cursor: pointer;
    :hover {
        color: ${props => props.theme.text}
    }

    svg {
        margin-right: 1rem;
    }

    padding-left: ${props => props.isListEmpty ? "2rem" : "0rem"}
`

const Placholder = styled.div`
    height: 4rem;
    width: 100%;
`

const List = props => {

    const dispatch = useDispatch()

    const [ isAddingCard, setIsAddingCard ] = useState(false)

    const {todoLists, setTodoLists, list, moveHandler, setDraggedCard, draggedCard, setIsEdited } = props

    const {
        text: { text }
    } = useSelector(state => state)

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

    
    const onClickAddCardHandler = () => {
        if(!isAddingCard){
            setIsAddingCard(true)
        }
    }

    const addCardHandler = async title => {
        const tempId = generateId()
        const tempTodo = {
            title,
            id: tempId,
            todoListId: list.id,
            type: "todo",
            saved: false,
            index: todoLists[list.id].todos.length
        }
        setTodoLists(prev => ({
            ...prev,
            [list.id]: {
                ...prev[list.id],
                todos: [...prev[list.id].todos, tempTodo]
            }
        }))
        setIsAddingCard(false)
        saveCardHandler(tempTodo)
    }

    const saveCardHandler = async tempTodo => {
        try {
            const res = await axios.post('/todo', tempTodo)
            let updatedLists
            if(res.status === 200){
                setTodoLists(prev => {
                    const tempIndex = prev[list.id].todos.findIndex(i => i.id === tempTodo.id)
                    updatedLists = {...prev}
                    updatedLists[list.id].todos[tempIndex] = {
                        ...updatedLists[list.id].todos[tempIndex],
                        id: res.data.data.id,
                        saved: true
                    }
                    return updatedLists
                })
                dispatch(actions.setTodoLists(updatedLists))
   
            }

        } catch(err){
            console.log({
                err
            })
        }
    }   

    const isListEmpty =  list.todos.length === 0 

    return (
        <Container 
            ref={dropRef}
            isOver={isOver}
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
                    setIsEdited={setIsEdited}
                />
            ))}
            {isListEmpty && !isAddingCard && (
                <Placholder />
            )}
            {isAddingCard && (
                <CardInput
                    addCardHandler={addCardHandler} 
                    setIsAddingCard={setIsAddingCard}
                />
            )}
            <AddCard
                onClick={onClickAddCardHandler}
                isListEmpty={isListEmpty}
            >
                {isListEmpty && (
                    <FontAwesomeIcon
                        icon="plus" 
                    />
                )}
                {text.add_card}...
            </AddCard>
        </Container>
    )
};

export default List;
