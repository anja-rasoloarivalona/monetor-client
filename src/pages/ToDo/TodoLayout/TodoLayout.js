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
`

const LayoutContainer = styled.div`
    width: 100%;
    height: calc(100vh - 20.5rem);
    overflow-y: scroll;
    position: relative;
    padding-left: 1rem;

    &::-webkit-scrollbar {
        display: none;
    }

    .layout {
        width: 0px !important;
        z-index: 2;
        .react-grid-item {
            max-width: 36rem !important;
            min-width: 36rem !important;
            width: 36rem !important;
        }
    }
    .react-grid-item.react-grid-placeholder {
        background-color: ${({theme}) => theme.text};
    }

`

const LayoutItem = styled.div`

`


const TodoLayout = props => {

    const { todoLists, setTodoLists, setIsEdited,config,setIsEditingListOrder } = props
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
                    index: prev[todoListId].todos.length,
                    checkList: [],
                    todoLabels: [],
                    attachments: []
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
                    if(!todo.archivedAt){
                        let h = 1.5
                        let detailH = (todo.dueDate || (todo.description && todo.description !== "<p><br></p>") || (todo.checkList && todo.checkList.length > 0)) ? 1 : 0
                        let labelH = todo.todoLabels && todo.todoLabels.length > 0 ? 1 : 0
                        let coverH = todo.coverImage ? 4.5 : 0
                        const todoConfig = {
                            x: list.index,
                            y: todoIndex,
                            h: h + detailH + labelH + coverH,
                            w: 1,
                            i: todo.id,
                            isResizable: false,
                            todo
                        }
                        _copy[list.id].todos[todo.id] = todoConfig
                        _layout.push(todoConfig)
                    }
                })
            }
        })
        setLayout(_layout)
    },[todoLists])


    if(!layout){
        return null
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
                setIsEditingListOrder={setIsEditingListOrder}
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
                    containerPadding={[0,0]}
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
