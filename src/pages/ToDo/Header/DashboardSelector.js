import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useOnClickOutside } from '../../../hooks'
import { useSelector } from 'react-redux'
import { Input } from '../../../components/Form/WithoutValidation'
import { Button as ButtonComponent, ButtonWithLoader, ScrollBar } from '../../../components'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

const Container = styled.div`
    position: relative;   
`
const ButtonContainer = styled.div`
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    cursor: pointer; 
`

const Button = styled.div`
    font-size: 1.2rem;
    height: 3.5rem;
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 2rem;
    font-size: 1.4rem;
    border-radius: 1rem;
    color: ${props => props.theme.dynamicText};
    background: ${props => props.theme.onSurface};

    svg {
        font-size: 1.6rem;
        margin-left: 1rem;
    };
    :hover {
        box-shadow: ${props => props.theme.boxShadow};
        color: ${props => props.theme.text};
        background: ${props => props.theme.surface};
        border-color: ${props => props.theme.surface};
    }
`

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.5rem;
    height: 5.6rem;
    padding: 0 3rem;

    svg {
        cursor: pointer;
    }
`

const Pannel = styled.div`
    position: fixed;
    top: 6.5rem;
    right: 0;
    width: 35rem;
    height: calc(100vh - 6.5rem);
    background: ${props => props.theme.surface};
    z-index: 5;
    transform: translateX(${props => props.showPannel ? 0 : "100%"});
    transition: all .3s ease-in;
    box-shadow: ${props => props.theme.boxShadow};

    input {
        height: 4.5rem;
        margin-top: 1rem;
    }
`

const List = styled(ScrollBar)`
    width: 100%;
    max-height: calc(100% - 5.6rem);
    padding: 0 3rem;
    padding-top: 2rem;
`

const ListItemComponent = styled.div`
    width: 100%;
    height: 14rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: .5rem;
    cursor: pointer;
    font-size: 1.4rem;
    margin-bottom: 2rem;
    box-shadow: ${props => props.theme.boxShadowLight};

    :hover {
        box-shadow: ${props => props.theme.boxShadow};
    }
`

const ListItemAdd = styled(ListItemComponent)`
    svg {
        margin-right: 1rem;
    }
`

const ListItem = styled(ListItemComponent)`
    background: ${props => props.theme.background};
`

const ListItemTitle = styled.div`
    font-weight: 600;
`

const AddContainer = styled.div`
    margin-top: 3rem;
`

const InputContainer = styled.div`
    position: relative;
`

const Label = styled.label`
    font-size: 1.4rem;
`

const TodoList = styled.div`
    margin-top: 2rem;
`
const TodoListAdd = styled.div`
    width: 100%;
    height: 4.5rem;
    margin-top: 1rem;
    box-shadow: ${props => props.theme.boxShadowLight};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    color: ${props => props.theme.textLight};
    cursor: pointer;

    svg {
        margin-right: 1rem;
    }

    :hover {
        color: ${props => props.theme.text};
    }
`

const InputRemove = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 1rem;
    margin: auto;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 1px solid ${props => props.theme.line};
    color: ${props => props.theme.line};
    cursor: pointer;


    :hover {
        color: ${props => props.theme.text};
        border-color: ${props => props.theme.text};
    }
`

const Cta = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 3rem;

    .submit {
        margin-left: 1rem;
    }
`
const Error = styled.div`
    margin-top: 1rem;
    color: ${props => props.theme.error};
    font-size: 1.4rem;
`
const DashboardSelector = props => {

    const [ showPannel, setShowPannel ] = useState(false)

    const {
        text: { text },
        todos: {  todoBoards }
    } = useSelector(s => s)

    const [ isAdding, setIsAdding ] = useState(false)
    const [ title, setTitle ] = useState("")
    const [ list, setList ] = useState([text.to_do, text.doing, text.done ])
    const [ newList, setNewList ] = useState("")
    const [ isAddingNewList, setIsAddingNewList ] = useState(false)
    const [ showError, setShowError ] = useState(false)
    const [ isSubmitting, setIsSubmitting ] = useState(false)
 

    const listRef = useRef()

    useOnClickOutside(listRef, () => setShowPannel(false))

    useEffect(() => {
        if(title !== "" && showError){
            setShowError(false)
        }
    },[title])

    const addList = () => {
        if(newList !== ""){
            setList(prev => {
                const updated = [...prev, newList]
                return updated
            })
            setNewList("")
            setIsAddingNewList(false)
        }
    }

    const removeList = index => {
        setList(prev => {
            const updated = prev.filter((item, i) => i !== index )
            return updated
        })
    }

    const submitHandler = async () => {
        if(title !== ""){
            setIsSubmitting(true)
            const payload = {
                title,
                todoList: []
            }
            list.forEach((item, itemIndex) => {
                payload.todoList.push({
                    title: item,
                    index: itemIndex
                })
            })
            try {
                const res = await axios.post("/todo/board", payload)
            } catch(err){
                console.log({
                    err
                })
                setIsSubmitting(false)
            }
        } else {
            setShowError(true)
        }
    }

    const closeHandler = () => {
        setIsAddingNewList(false)
        setIsAdding(false)
        setShowPannel(false)
    }

    const toggleHandler = () => {
        if(isAddingNewList){
            setIsAddingNewList(false)
        } else {
            if(isAdding){
                setIsAdding(false)
            } else {
                closeHandler()
            }
        }
    }

    return (
        <Container>
            <ButtonContainer onClick={() => setShowPannel(true)}>
                <Button square>
                    {text.my_projects}
                    <FontAwesomeIcon icon="stream"/>
                </Button>
            </ButtonContainer>
            <Pannel showPannel={showPannel} ref={listRef}>
                <Header>
                    <FontAwesomeIcon icon={isAdding ? "arrow-left" : "times"} onClick={toggleHandler} />
                    {isAdding ? text.new_project : text.my_projects}
                    <span></span>
                </Header>
                {!isAdding && (
                    <List>
                        <ListItemAdd onClick={() => setIsAdding(true)}>
                            <FontAwesomeIcon icon="plus"/>
                            {text.new_project}
                        </ListItemAdd>
                        {Object.values(todoBoards).map(board => (
                            <ListItem
                                key={board.boardId}
                                onClick={() => props.history.push(`/${text.link_todo}/${board.boardId}`)}
                            >
                                <ListItemTitle>
                                    {board.title}
                                </ListItemTitle>
                            </ListItem>
                        ))}
                    </List>
                )}
                {isAdding && (
                     <AddContainer>
                        <InputContainer>
                            <Label>
                                {text.title}
                            </Label>
                            <Input 
                                value={title}
                                onChange={setTitle}
                                disabled={isSubmitting}
                                focusOnMount
                            />
                            {showError && <Error>{text.required}</Error>}
                        </InputContainer>
                        <TodoList>
                            <Label>{text.list}</Label>
                            {list.map((item, index) => (
                                <InputContainer key={index}>
                                    <Input 
                                        value={item}
                                        disabled={isSubmitting}
                                        onChange={value => setList(prev => {
                                            const updated = [...prev]
                                            updated[index] = value
                                            return updated
                                        })}
                                    />
                                    <InputRemove onClick={() => removeList(index)}>
                                        <FontAwesomeIcon icon="minus"/>
                                    </InputRemove>
                                </InputContainer>                   
                            ))}
                            {!isAddingNewList && !isSubmitting && (
                                <TodoListAdd onClick={() => setIsAddingNewList(true)} isSubmitting={isSubmitting}>
                                    <FontAwesomeIcon icon="plus"/>
                                    {text.add}
                                </TodoListAdd>
                            )}
                            {isAddingNewList && (
                                <InputContainer>
                                    <Input 
                                        value={newList}
                                        onChange={setNewList}
                                        onBlur={addList}
                                        focusOnMount
                                    />
                                </InputContainer>
                            )}
       
                        </TodoList>
                        <Cta>
                            {!isSubmitting && (
                                <ButtonComponent transparent onClick={toggleHandler}>
                                    {text.cancel}
                                </ButtonComponent>
                            )}
                            <ButtonWithLoader
                                square
                                onClick={submitHandler}
                                isLoading={isSubmitting}
                            >
                                {text.save}
                            </ButtonWithLoader>
                        </Cta>
                    </AddContainer>
                )}
            </Pannel>
        </Container>
     )
};

export default withRouter(DashboardSelector);
