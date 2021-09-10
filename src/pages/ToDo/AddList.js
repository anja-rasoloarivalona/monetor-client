import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { useOnClickOutside } from '../../hooks'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '../../components'
import { Input } from '../../components/Form/WithoutValidation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { generateId } from '../../functions'
import * as actions from '../../store/actions'
import axios from "axios"

const Container = styled.div`
    display: flex;
    align-items: center;
    width: 35rem;
    border-radius: .5rem;
    font-size: 1.4rem;
    padding: 0 1rem;
    background: ${props => props.adding ? props.theme.secondarySurface : "none"};
    position: relative;
    :hover {
        background: ${props => props.theme.secondarySurface};
    }

    ${props => {
        if(props.adding){
            return {
                background: props.theme.secondarySurface,
                borderBottomRightRadius: "0rem",
                borderBottomLeftRadius: "0rem",
                ".text": {
                    color: props.theme.text
                }
            }
        }
    }}
`

const InputContainer = styled.div`
    width: 100%;
    height: max-content;
    padding: 1.5rem 2rem;
    position: absolute;
    top: 3.5rem;
    left: 0;
    z-index: 2;
    background: ${props => props.theme.secondarySurface};
    border-bottom-right-radius: .5rem;
    border-bottom-left-radius: .5rem;

    input {
        height: 4.5rem;
        margin-bottom: 1.5rem;
    }
`


const Cta = styled.div`
    display: flex;
    align-items: center;

    button {
        margin-right: 1rem;
    }

    svg {
        font-size: 2rem;
        cursor: pointer;
        color: ${props => props.themetextLight};
        :hover {
            color: ${props => props.theme.textLight};
        }
    }
`

const TextContainer = styled.div`
    svg {
        margin-right: 1rem;
    }
    padding: 1rem;
    width: 100%;
    height: 100%;
    cursor: pointer;
    color: ${props => props.theme.backgroundImage ? props.theme.offWhite : props.theme.text};
    display: flex;
    align-items: center;

    :hover {
        color: ${props => props.theme.text};
    }
`

const Error = styled.div`
    margin-bottom: 1rem;
    color: ${props => props.theme.error};
`

const AddList = props => {

    const dispatch = useDispatch()

    const { todoLists, setTodoLists } = props

    const { 
        text: { text },
        todos: { activeBoardId }
    } = useSelector(state => state)

    const [ adding, setAdding ] = useState(false)
    const [ title, setTitle ] = useState("")
    const [ showError, setShowError ] = useState(false)

    const containerRef = useRef()

    const addListHandler = async () => {
        if(title !== ""){
            try {
                const tempId = generateId()
                const tempList = {
                    boardId: activeBoardId,
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
                    dispatch(actions.setTodoLists({
                        todoLists: updatedLists,
                        boardId: activeBoardId
                    }))
                }
            } catch(err){
                console.log({
                    err
                })
            }

        } else {
            setShowError(true)
        }
    }

    const closeHandler = () => {
        setAdding(false)
        setTitle("")
        setShowError(false)
    }

    useEffect(() => {
        if(title !== "" && showError){
            setShowError(false)
        }
    },[title])

    useOnClickOutside(containerRef, () => {
        if(title !== ""){
            addListHandler()
        } else {
            closeHandler()
        }
    })


    return (
        <Container
            ref={containerRef}
            adding={adding}
            length={Object.keys(todoLists).length}
        > 
            <TextContainer onClick={() => setAdding(true)} className="text">
                {adding ?
                    text.list_title_label :
                    <>
                        <FontAwesomeIcon icon="plus"/>
                        {text.add_a_list}
                    </>
                }
            </TextContainer>
            {adding && (
                <InputContainer>
                    <Input
                        value={title}
                        onChange={setTitle}
                        focusOnMount
                    />
                    {showError && (
                        <Error>
                            {text.required}
                        </Error>
                    )}
                    <Cta>
                        <Button
                            small
                            onClick={addListHandler}
                        >
                            {text.add_list}
                        </Button>
                        <Button
                            onClick={closeHandler}
                            small
                            transparent
                        >
                            {text.cancel}
                        </Button>
                    </Cta>
                </InputContainer>
            )}

        </Container>
     )
};

export default AddList;
