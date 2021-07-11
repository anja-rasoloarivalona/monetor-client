import React, { useState, useRef } from "react"
import styled from "styled-components"
import { useOnClickOutside } from '../../hooks'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { generateId } from '../../functions'
import * as actions from '../../store/actions'
import axios from "axios"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background: ${props => props.theme.onSurface};
    width: 30rem;
    border-radius: .5rem;
    font-size: 1.4rem;
    height: max-content;
`

const InputContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 1rem;
`

const Input = styled.input`
    height: 3rem;
    width: 100%;
    padding: 1rem;
    font-size: 1.6rem;
    margin-bottom: 1rem;
    border: 1px solid ${props => props.theme.form.unfocused.border};
    background: ${props => props.theme.form.unfocused.background};


    &:focus {
        outline: none;
        border: 1px solid ${props => props.theme.form.focused.border};
    }
`

const Cta = styled.div`
    display: flex;
    align-items: center;

    button {
        margin-right: 2rem;
    }

    svg {
        font-size: 2rem;
        cursor: pointer;
        color: ${props => props.theme.grey};
        :hover {
            color: ${props => props.theme.textActive};
        }
    }
`

const TextContainer = styled.div`
    svg {
        margin-right: 1rem;
    }
    padding: 1rem 2rem;
    width: 100%;
    height: 100%;
    cursor: pointer;
`

const AddList = props => {

    const dispatch = useDispatch()

    const { todoLists, setTodoLists } = props

    const { 
        text: { text }
    } = useSelector(state => state)

    const [ adding, setAdding ] = useState(false)
    const [ title, setTitle ] = useState("")

    const containerRef = useRef()

    const addListHandler = async () => {
        if(title !== ""){

            try {
                const tempId = generateId()
                const tempList = {
                    title,
                    id: tempId,
                    todos: [],
                    type: "list",
                    saved: false,
                    index:  Object.keys(todoLists).length
                }
                setTodoLists(prev => ({
                    ...prev,
                    [tempId]: tempList
    
                }))
                setAdding(false)
                const res = await axios.post('/todo', tempList)
     
                if(res.status === 200){  

                    const newList = {
                        ...tempList,
                        ...res.data.data,
                        saved: true
                    }

                    if(newList.todos && newList.todos.length > 0){
                        const updatedTodos = []
                        newList.todos.forEach(todo => {
                            updatedTodos.push({
                                ...todo,
                                todoListId: newList.id
                            })
                        })
                        newList.todos = updatedTodos
                    }
    
                    const updatedLists = { ...todoLists }

                    Object.defineProperty(updatedLists, newList.id,
                        Object.getOwnPropertyDescriptor(updatedLists, tempId));
                    delete updatedLists[tempId];
                    
                    setTodoLists(updatedLists)
                    dispatch(actions.setTodoLists(updatedLists))
                }
            } catch(err){
                console.log({
                    err
                })
            }

        } else {
            setAdding(false)
        }
    }

    useOnClickOutside(containerRef, () => addListHandler())

    return (
        <Container ref={containerRef} >
            {!adding && (
                <TextContainer onClick={() => setAdding(true)}>
                    <FontAwesomeIcon 
                        icon="plus"
                    />
                    {text.add_a_list}
                </TextContainer>
            )}
            {adding && (
                <InputContainer>
                    <Input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <Cta>
                        <Button
                            small
                            onClick={addListHandler}
                        >
                            {text.add_list}
                        </Button>
                        <FontAwesomeIcon 
                            icon="times"
                            onClick={() => setAdding(false)}
                        />
                    </Cta>
                </InputContainer>
            )}

        </Container>
     )
};

export default AddList;
