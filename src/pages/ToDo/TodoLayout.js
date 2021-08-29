import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Layout from 'react-grid-layout'
import "../../../node_modules/react-grid-layout/css/styles.css"
import "../../../node_modules/react-resizable/css/styles.css"
import Card from './Card'
import CardInput from './CardInput'
import AddList from './AddList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { generateId, arrayToObject } from '../../functions'


const Container = styled.div`
    flex: 1;
    height: calc(100vh - 13.8rem);
    display: flex;

    .layout {
        width: 0px !important;
    }
    .react-grid-item.react-grid-placeholder {
        background-color: ${({theme}) => theme.text};
    }
`
const LayoutItem = styled.div`
`

const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const Title = styled.div`
    height: 100%;
    font-size: 1.6rem;
    font-weight: 600;
    color: ${props => props.theme.dynamicText};
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

const AddCard = styled.div`
    width: 100%;
    height: 100%;
    font-size: 1.3rem;
    color: ${({ theme }) => theme.dynamicTextLight};
    cursor: pointer;
    background: ${({theme}) => theme.surface};
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: ${({theme}) => theme.boxShadowLight};
    :hover {
        color: ${props => props.theme.text}
    }
    svg {
        margin-right: 1rem;
    }
`

const TodoLayout = props => {

    const { todoLists, setTodoLists, setIsEdited } = props
    const [ layout, setLayout ] = useState(null)
    const [ copy, setCopy ] = useState(null)
    const [ isAddingCard, setIsAddingCard ] = useState(false)
    const [ isDragging, setIsDragging ] = useState(null)

    const addCardHandler = listId => {
        if(isAddingCard !== listId){
            setIsAddingCard(listId)
        }
    }

    const submitCardHandler = (title, todoListId ) => {
        const tempId = generateId()
        const tempTodo = {
            title,
            id: tempId,
            todoListId,
            type: "todo",
            saved: false,
            index: Object.keys(copy[todoListId].todos).length
        }
        setTodoLists(prev => ({
            ...prev,
            [todoListId]: {
                ...prev[todoListId],
                todos: [...prev[todoListId].todos, tempTodo]
            }
        }))
        setIsAddingCard(false)
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
            const listConfig = {
                x: list.index,
                y: 0,
                w: 1,
                h: 1,
                i: `title-${list.id}`,
                static: true,
                isResizable: false,
                list
            }
            _copy[list.id] = {...listConfig, todos: {}}
            _layout.push(listConfig)
            _layout.push({
                x: list.index,
                y: 1,
                h: 1.5,
                w: 1,
                i: `add-${list.id}`,
                isResizable: false,
                isDraggable: false,
                static: true,
                todoListId: list.id
            })
            list.todos.forEach((todo, todoIndex) => {
                let h = 1.5
                let detailH = (todo.dueDate || (todo.description && todo.description !== "<p><br></p>") || (todo.checkList && todo.checkList.length > 0)) ? 1 : 0
                let labelH = todo.todoLabels && todo.todoLabels.length > 0 ? 1 : 0
                const todoConfig = {
                    x: list.index,
                    y: 1 + (todoIndex),
                    h: h + detailH + labelH,
                    w: 1,
                    i: todo.id,
                    isResizable: false,
                    todo
                }
                _copy[list.id].todos[todo.id] = todoConfig
                _layout.push(todoConfig)
            })
        })
        setCopy(_copy)
        setLayout(_layout)
    },[todoLists])


    if(!layout){
        return null
    }

    return (
        <Container>
            <Layout
                className="layout"
                layout={layout}
                rowHeight={20}
                cols={todoLists.length}
                width={todoLists.length * 350}
                margin={[15, 15]}
                onDrag={() => setIsDragging(true)}
                onDragStop={stopDragHandler}
            >
                {layout.map(item => {
                    if(item.i.includes("title")){
                        return (
                            <LayoutItem key={item.i} id={item.i}>
                                <TitleContainer>
                                    <Title>{item.list.title}</Title>
                                    <TitleCta>
                                        <FontAwesomeIcon icon="ellipsis-h"/>
                                    </TitleCta>
                                </TitleContainer>
                         
                            </LayoutItem>
                        )
                    }
                    if(item.i.includes("add")){
                        return (
                            <LayoutItem key={item.i} id={item.i}>
                                <AddCard onClick={() => addCardHandler(item.todoListId)}>
                                    {isAddingCard === item.todoListId ?
                                        <CardInput 
                                            submitCardHandler={(title) => submitCardHandler(title, item.todoListId)}
                                            setIsAddingCard={setIsAddingCard}
                                        /> :
                                        <FontAwesomeIcon icon="plus" />
                                    }
                                </AddCard>
                            </LayoutItem>
                        )
                    }
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
            <AddList 
                setTodoLists={setTodoLists}
                todoLists={todoLists}
           />
        </Container>
     )
};

export default TodoLayout;
