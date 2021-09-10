import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Layout from 'react-grid-layout'
import "../../../../node_modules/react-grid-layout/css/styles.css"
import "../../../../node_modules/react-resizable/css/styles.css"
import Card from '../Card'
import TodoLayoutHeader from "./TodoLayoutHeader"
import TodoBackgroundList from "./TodoBackgroundList"
import { generateId, arrayToObject } from '../../../functions'


const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-left: 1rem;
`

const LayoutContainer = styled.div`
    width: 100%;
    height: calc(100vh - 19rem);
    overflow-y: scroll;
    position: relative;
    &::-webkit-scrollbar {
        // display: none;
    }

    .layout {
        width: 0px !important;
        z-index: 2;
        transform: translateY(-1.4rem);
    }
    .react-grid-item.react-grid-placeholder {
        background-color: ${({theme}) => theme.text};
    }

`

const LayoutItem = styled.div`

`

const Header = styled.div`
    display: flex;
    align-items: center;
    padding-left: 2rem;
`

const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 38rem;
    height: 4rem;
    margin-right: 1rem;
    padding: 0 1rem;
    border-top-right-radius: .5rem;
    border-top-left-radius: .5rem;
    background: ${({ theme }) => theme.secondarySurface};
    box-shadow: ${({ theme }) => theme.boxShadowExtraLight};
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


const AddCardContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;

    ${({ sticky, theme }) => {
        if(sticky){
            return {
                position: "sticky !important",
                top: 0,
                right: 0,
                // background:  theme.secondarySurface,
                boxShadow: theme.boxShadowExtraLight,
            }
        }
    }}

    &:before {
        content: "";
        position: absolute;
        top: -1rem;
        left: -1rem;
        width: calc(100% + 2rem);
        height: calc(100% + 3rem);
        background: ${({ theme }) => theme.secondarySurface};
        box-shadow: ${({ theme }) => theme.boxShadowExtraLight};
        z-index: 1;
        border-bottom-right-radius: .5rem;
        border-bottom-left-radius: .5rem;
    }
`

const AddCard = styled.div`
    width: 100%;
    height: 100%;
    font-size: 1.3rem;
    color: ${({ theme }) => theme.dynamicTextLight};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${props => props.theme.line};
    background: ${({theme}) => theme.background};
    position: relative;
    z-index: 3;

    &:hover {
        color: ${props => props.theme.text};
        background: ${({theme}) => theme.surface};
    }
    
    svg {
        margin-right: 1rem;
    }
`

const TodoLayout = props => {

    const { todoLists, setTodoLists, setIsEdited } = props
    const [ layout, setLayout ] = useState(null)
    const [ isAddingCard, setIsAddingCard ] = useState(false)
    const [ isDragging, setIsDragging ] = useState(null)


    const submitCardHandler = (title ) => {
        const todoListId = isAddingCard
        setTodoLists(prev => ({
            ...prev,
            [todoListId]: {
                ...prev[todoListId],
                todos: [...prev[todoListId].todos, {
                    title,
                    id: generateId(),
                    todoListId,
                    type: "todo",
                    saved: false,
                    index: prev[todoListId].todos.length
                }]
            }
        }))
    }

    const onClickCardHandler = item => {
        if(!isDragging){
            setIsEdited(item)
        }
    }

    const updateIndexes = arr => {
        const data = [...arr]
        data.forEach((i, index) => {
            data[index].index = index
        })
        return data
    }

    const formatTodos = (layout, todos) => {
        const res = []
        todos.forEach(todo => {
            const y = layout.find(item => item.i === todo.id).y
            res.push({...todo, y })
        })
        return updateIndexes(res.sort((a, b) => a.y - b.y))
    }

    const stopDragHandler = (layout, oldItem, newItem) => {
        setTimeout(() => {
            setIsDragging(false)
        },200)

        const hasChangeList = oldItem.x !== newItem.x
        const prevItemData = todoLists[oldItem.x].todos.find(todo => todo.id === oldItem.i)
        const updatedTodoLists = []

        if(hasChangeList){
            const prevList = todoLists[oldItem.x]
            const newList = todoLists[newItem.x]
            todoLists.forEach(list => {
                if(list.id !== prevList.id && list.id !== newList.id){
                    updatedTodoLists.push(list)
                } else {
                    let updatedTodos = []
                    if(list.id === prevList.id){
                        list.todos.forEach(todo => {
                            if(todo.id !== oldItem.i){
                                updatedTodos.push(todo)
                            }
                        })
                    }
                    if(list.id === newList.id){
                        updatedTodos = list.todos
                        updatedTodos.push({
                            ...prevItemData,
                            todoListId: newList.id,
                        })
                    }
                    updatedTodoLists.push({
                        ...list,
                        todos: formatTodos(layout, updatedTodos)
                    })
                }
            })
        } else {
            todoLists.forEach(list => {
                if(list.id === prevItemData.todoListId){
                    updatedTodoLists.push({
                        ...list,
                        todos: formatTodos(layout, list.todos)
                    })                
                } else {
                    updatedTodoLists.push(list)
                }
            })
        }
        setTodoLists(arrayToObject(updatedTodoLists, "id"))
    }

    useEffect(() => {
        const _layout = []
        const _copy = {}
        todoLists.forEach(list => {
            _copy[list.id] = {todos: {}}
            if(list.todos.length > 0){
                list.todos.forEach((todo, todoIndex) => {
                    let h = 1.5
                    let detailH = (todo.dueDate || (todo.description && todo.description !== "<p><br></p>") || (todo.checkList && todo.checkList.length > 0)) ? 1 : 0
                    let labelH = todo.todoLabels && todo.todoLabels.length > 0 ? 1 : 0
                    const todoConfig = {
                        x: list.index,
                        y: todoIndex,
                        h: h + detailH + labelH,
                        w: 1,
                        i: todo.id,
                        isResizable: false,
                        todo
                    }
                    _copy[list.id].todos[todo.id] = todoConfig
                    _layout.push(todoConfig)
                })
            }
        })
        setLayout(_layout)
    },[todoLists])


    if(!layout){
        return null
    }

    const config = {
        rowHeight: 20,
        listWidth: 360,
        margin: [30, 15]
    }

    return (
        <Container>
            <TodoLayoutHeader
                todoLists={todoLists}
                config={config}
                submitCardHandler={submitCardHandler}
                isAddingCard={isAddingCard}
                setIsAddingCard={setIsAddingCard}
                setTodoLists={setTodoLists}
            />
            <LayoutContainer>
                <TodoBackgroundList
                    layout={layout}
                    config={config} 
                    isDragging={isDragging}
                    todoLists={todoLists}
                    submitCardHandler={submitCardHandler}
                    isAddingCard={isAddingCard}
                    setIsAddingCard={setIsAddingCard}
                />
                <Layout
                    className="layout"
                    layout={layout}
                    rowHeight={config.rowHeight}
                    cols={todoLists.length}
                    width={todoLists.length * config.listWidth + (40 * todoLists.length)}
                    margin={config.margin}
                    onDrag={() => setIsDragging(true)}
                    onDragStop={stopDragHandler}
                >
                    {layout.map(item => {
                        return (
                            <LayoutItem key={item.i} id={item.i}>
                                <Card
                                    todo={item.todo} 
                                    setIsEdited={onClickCardHandler}
                                />
                            </LayoutItem>
                        )
                    })}
                </Layout>
            </LayoutContainer>
        </Container>
     )
};

export default TodoLayout;
