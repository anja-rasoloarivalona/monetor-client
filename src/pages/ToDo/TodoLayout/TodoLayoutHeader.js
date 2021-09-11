import React, { useState, useRef } from "react"
import styled from "styled-components"
import AppIcon from '../../../icons'
import CardInput from "../CardInput"
import AddList from '../AddList'
import { useSelector } from 'react-redux'
import { useOnClickOutside } from '../../../hooks'

const Container = styled.div`
    display: flex;
    padding-left: 2rem;
`

const Content = styled.div`
    border-top-right-radius: .8rem;
    border-top-left-radius: .8rem;
    background: ${({ theme }) => theme.secondarySurface};
    box-shadow: ${({ theme }) => theme.boxShadowExtraLight};
    width: ${({ config: { listWidth }}) => `${listWidth + 20}px`};
    min-height: 5rem;
    margin-right: 1rem;
    position: relative;
`

const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    height: 5rem;
`

const Title = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: ${props => props.theme.text};
`

const TitleCta = styled.div`
    display: flex;
    align-items: flex-end;
    font-size: 1.2rem;
    cursor: pointer;
    color: ${({theme}) => theme.dynamicTextLight};
    :hover {
        color: ${({theme}) =>theme.dynamicText}
    }
`

const TitleCtaItem = styled.div`
    position: relative;
    z-index: 3;

`

const TitleCtaItemIcon = styled.div`
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: .5rem;
    svg {
        width: 2rem;
        height: 2rem;
        fill: ${({ theme }) => theme.textLight};
    };
    :hover {
        background: ${({ theme }) => theme.onSurface};
        svg {
            fill: ${({ theme }) => theme.text};
        }
    }

    &.small svg {
        width: 1.5rem;
        height: 1.5rem;
    }  

    ${({ isActive, theme }) => {
        if(isActive){
            return {
                background: theme.onSurface,
                svg: {
                    fill: theme.text
                }
            }
        }
}}   
`

const AddCard = styled.div`
    width: 100%;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 2;
    padding: 0 1rem;
    background: ${({ theme }) => theme.secondarySurface};
    box-shadow: ${({ theme }) => theme.boxShadowExtraLight};
    padding-bottom: 1.5rem;
    border-bottom-right-radius: .8rem;
    border-bottom-left-radius: .8rem;
    height: 5.8rem;
    input {
       height: 3.8rem;
    }
`

const AddCardPlaceholer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3.8rem;
    background: ${({ theme }) => theme.background};
    cursor: pointer;
    svg {
        width: 2rem;
        height: 2rem;
    }
`

const Cta = styled.ul`
    position: absolute;
    top: 100%;
    left: 0;
    width: 20rem;
    background: ${({ theme }) => theme.surface};
    box-shadow: ${({ theme }) => theme.boxShadow};
    z-index: 2;
    padding: 1rem;
    list-style: none;
    border-radius: .5rem;
    li:not(:last-child){
        // margin-bottom: .5rem;
    }
`

const CtaItem = styled.li`
    padding: 1rem;
    cursor: pointer;
    font-size: 1.4rem;
    color: ${({ theme }) => theme.text} !important;
    border-radius: .5rem;
    :hover {
        background: ${({ theme }) => theme.background};
    }
`

const TodoLayoutHeader = props => {

    const { todoLists, config, submitCardHandler, isAddingCard, setIsAddingCard, setTodoLists, setIsEditingListOrder } = props

    const {
        text: { text }
    } = useSelector(state => state)

    const [ showList, setShowList ] = useState(false)

    const ctaRef = useRef()

    useOnClickOutside(ctaRef, () => {
        if(showList){
            setShowList(false)
        }
    })

    const moveAllCards = payload => {
        const updatedTodoLists = {}
        const all = []
        todoLists.forEach(list => {
            const updatedTodos = list.id === payload.id ? list.todos : []
            if(list.id !== payload.id){
                list.todos.forEach(todo => {
                    all.push({
                        ...todo,
                        todoListId: payload.id
                    })
                })
            }
            updatedTodoLists[list.id] = {
                ...list,
                todos: updatedTodos
            }
        })
        updatedTodoLists[payload.id].todos.push(...all)
        updatedTodoLists[payload.id].todos.forEach((todo, index) => {
            updatedTodoLists[payload.id].todos[index].index = index
        })
        setTodoLists(updatedTodoLists)
    }

    const archiveAllCards = payload => {
        const updatedTodoLists = {}
        todoLists.forEach(list => {
            updatedTodoLists[list.id] = {
                ...list,
                todos: list.id === payload.id ?
                    list.todos.map(todo => ({...todo, archivedAt: new Date()}))
                    : list.todos
            }
        })
        setTodoLists(updatedTodoLists)
    }

    const ctaList = [
        { label: text.add_a_card, onClick: ({id}) => setIsAddingCard(id)},
        { label: text.move_list, onClick: () => setIsEditingListOrder(true)},
        { label: text.move_all_cards_in_this_list, onClick: list => moveAllCards(list)},
        { label: text.archive_all_cards, onClick: list => archiveAllCards(list) }
    ]

    const toggleList = id => {
        if(showList !== id){
            setShowList(id)
        } else {
            setShowList(false)
        }
    }

    return (
        <Container>
            {todoLists.map(list => {
                let activeTodos = 0
                list.todos.forEach(todo => {
                    if(!todo.archivedAt){
                        activeTodos += 1
                    }
                })
                const isEmpty = !list.todos || activeTodos === 0
                return (
                    <Content key={list.id} config={config}>
                        <TitleContainer>
                            <Title>{list.title}</Title>
                            <TitleCta>
                                {!isEmpty && (
                                    <TitleCtaItem onClick={() => setIsAddingCard(list.id)}>
                                        <TitleCtaItemIcon>
                                            <AppIcon id="plus"/>
                                        </TitleCtaItemIcon>
                                    </TitleCtaItem>
                                )}
                                <TitleCtaItem onClick={() => toggleList(list.id)}>
                                    <TitleCtaItemIcon>
                                        <AppIcon id="ellipsis-h"/>
                                    </TitleCtaItemIcon>
                                    {showList === list.id && (
                                        <Cta ref={ctaRef}>
                                            {ctaList.map((item, index) => (
                                                <CtaItem key={index} onClick={() => item.onClick(list)}> 
                                                    {item.label}
                                                </CtaItem>
                                            ))}
                                        </Cta>
                                    )}
                                </TitleCtaItem>
                            </TitleCta>
                        </TitleContainer>
                        {isEmpty && (
                            <AddCard>
                                {isAddingCard === list.id ?
                                    <CardInput 
                                        submitCardHandler={submitCardHandler}
                                        setIsAddingCard={setIsAddingCard}
                                    /> :
                                    <AddCardPlaceholer onClick={() => setIsAddingCard(list.id)}>
                                        <AppIcon id="plus"/>
                                    </AddCardPlaceholer>                               
                                }
                            </AddCard>
                        )}
                    </Content>
                )
            })}
            <AddList 
                todoLists={todoLists}
                setTodoLists={setTodoLists}
            />          
        </Container>
    )
};

export default TodoLayoutHeader;
