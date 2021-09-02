import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import { Input } from '../../components/Form/WithoutValidation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useOnClickOutside, useKeyboardEvent } from '../../hooks'
import {Button, ButtonWithLoader } from '../../components'
import axios from 'axios'
import { BackgroundSelector } from "../../elements"

const Container = styled.div`
    width: 100%;
    max-width: 60rem;
    position: relative;

    .background-selector {
        background: ${({ theme }) => theme.surface};
        box-shadow: ${({ theme }) => theme.boxShadowLight};
        border-radius: 1rem;
        .content {
            max-height: unset;
        }
    }
`

const Header = styled.div`
    width: 100%;
    margin-bottom: 2rem;
`

const Content = styled.div`
    background: ${({ theme }) => theme.surface};
    padding: 3rem;
    border-radius: 1rem;
    box-shadow: ${({ theme }) => theme.boxShadowLight};

    input {
        height: 4.5rem;
        margin-top: 1rem;
        border-radius: .5rem;
    }
`

const HeaderTitle = styled.h1``


const InputContainer = styled.div`
    position: relative;
`

const Label = styled.label`
    font-size: 1.4rem;
`

const TodoList = styled.div`
    margin-top: 2rem;
`
const AddButton = styled.div`
    width: 100%;
    height: 4.5rem;
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    color: ${props => props.theme.textLight};
    cursor: pointer;
    border: 1px solid ${({ theme }) => theme.form.unfocused.border};
    border-radius: .5rem;

    svg {
        margin-right: 1rem;
    }

    :hover {
        color: ${props => props.theme.text};
        background: ${({ theme }) => theme.background};
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
    background: ${({ theme }) => theme.onSurface};
    color: ${props => props.theme.line};
    cursor: pointer;


    :hover {
        color: ${props => props.theme.text};
        border-color: ${props => props.theme.text};
    }
`

const Error = styled.div`
    margin-top: 1rem;
    color: ${props => props.theme.error};
    font-size: 1.4rem;
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

const SelectBackground = styled.div`
    margin-top: 3rem;
`

const SelectBackgroundCta = styled.div``

const ProjectForm = () => {

    const listRef = useRef()


    const {
        text: { text },
        todos: {  todoBoards }
    } = useSelector(s => s)

    const [ title, setTitle ] = useState("")
    const [ list, setList ] = useState([text.to_do, text.doing, text.done ])
    const [ newList, setNewList ] = useState("")
    const [ isAddingNewList, setIsAddingNewList ] = useState(false)
    const [ isAddingBackground, setIsAddingBackground ] = useState(false)
    const [ showError, setShowError ] = useState(false)
    const [ isSubmitting, setIsSubmitting ] = useState(false)
    const [ background, setBackground ] = useState(null)

    useKeyboardEvent("Enter", () => addList())
    useOnClickOutside(listRef, () => addList())

    useEffect(() => {
        if(title !== "" && showError){
            setShowError(false)
        }
    },[title, showError])

    const addList = () => {
        if(newList !== ""){
            setList(prev => {
                const updated = [...prev, newList]
                return updated
            })
            setNewList("")
        }
        setIsAddingNewList(false)
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
                console.log({
                    res
                })
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

    return (
        <Container>
            <Header>
                <HeaderTitle>
                    New project
                </HeaderTitle>
            </Header>
            <Content hidden={isAddingBackground}>
                <InputContainer>
                    <Label>{text.title}</Label>
                    <Input
                        placeholder={`${text.title}...`} 
                        value={title}
                        onChange={setTitle}
                        disabled={isSubmitting}
                        focusOnMount
                    />
                    {showError && <Error>{text.required}</Error>}
                </InputContainer>
                <TodoList ref={listRef}>
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
                        <AddButton
                            onClick={() => setIsAddingNewList(true)}
                            isSubmitting={isSubmitting}
                        >
                            <FontAwesomeIcon icon="plus"/>
                        </AddButton>
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
                <SelectBackground>
                    <Label>Background</Label>
                    <AddButton onClick={() => setIsAddingBackground(prev => !prev)}>
                        <FontAwesomeIcon icon="image"/>
                    </AddButton>
                </SelectBackground>
         
                <Cta>
                    <Button transparent>
                        {text.cancel}
                    </Button>
                    <ButtonWithLoader
                        square
                        onClick={submitHandler}
                        isLoading={isSubmitting}
                    >
                        {text.save}
                    </ButtonWithLoader>
                </Cta>
            </Content>
            {isAddingBackground && (
                <BackgroundSelector 
                    element="todo"
                    onChange={setBackground}
                    closeHandler={() => setIsAddingBackground(false)}
                />
            )}
        </Container>
     )
};

export default ProjectForm;
