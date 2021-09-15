import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Layout from 'react-grid-layout'
import Card from "../Card"
import "../../../../node_modules/react-grid-layout/css/styles.css"
import "../../../../node_modules/react-resizable/css/styles.css"
import {  getTodoConfig } from '.././functions'
import { useSelector } from 'react-redux'

const Container = styled.div`
    height: calc(100vh - 15.5rem);
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;

    .layout {
        .react-grid-item {
            max-width: ${({ config: { listWidth }}) => listWidth }px !important;
            min-width: ${({ config: { listWidth }}) => listWidth }px !important;
            width: ${({ config: { listWidth }}) => listWidth }px !important;
        }
    }
    .react-grid-item.react-grid-placeholder {
        background-color: transparent;
    }
`

const List = styled.div`
    background: red;
    border-radius: .8rem;
    cursor: move;
    
    * {
        cursor: move;
    }
`

const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 5rem;
    background: green;
`

const Title = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: ${props => props.theme.text};
`

const Todos = styled.div`
    padding: 10px 0;
    > div {
        margin-bottom: 20px;
    }
`

const TodoListLayout = props => {


    const { todoLists, config, setIsEditingListOrder, setTodoLists } = props

    const {
        todos: { todoBoards, activeBoardId }
    } = useSelector(state => state)

    const [ listLayout, setListLayout ] = useState(null)

    useEffect(() => {
        const _layout = []
        todoLists.forEach(list => {
            let h = 5
            const listTodos = []
            list.todos.forEach((todo, index) => {
                const todoConfig = getTodoConfig(
                    todo, 
                    [list.index, index, config.listWidth - 30],
                    todoBoards[activeBoardId].labels
                )
                listTodos.push(todoConfig.todo)
                h += todoConfig.h
            })
            _layout.push({
                x: list.index,
                y: 0,
                w: 1,
                h,
                i: list.id,
                list: {
                    ...list,
                    todos: listTodos
                }
            })
        })
        setListLayout(_layout)
    },[todoLists])


    if(!listLayout){
        return null
    }

    const stopDragHandler = layout => {
        const updatedLayout = []
        layout.forEach(item => {
            const list = listLayout.find(i => i.list.id === item.i).list
            updatedLayout.push({
                ...item,
                list
            })
        })
        const updatedTodoLists = {}
        todoLists.forEach(list => {
            updatedTodoLists[list.id] = {
                ...list,
                index: updatedLayout.find(i => i.i === list.id).x
            }
        })
        setTodoLists(updatedTodoLists)
        setTimeout(() => {
            setIsEditingListOrder(false)
        },[600])
    }

    return (
        <Container length={todoLists.length} config={config}>
            <Layout
                className="layout"
                layout={listLayout}
                maxRows={1}
                rowHeight={config.rowHeight}
                cols={todoLists.length}
                width={todoLists.length * config.listWidth + (40 * todoLists.length)}
                margin={[0, 0]}
                isResizable={false}
                compactType='horizontal'
                containerPadding={[0,0]}
                onDragStop={stopDragHandler}
                onDrag={() => setIsEditingListOrder(true)}
            >
                    {listLayout.map(item => {
                        return (
                            <List key={item.i} config={config}>
                                <TitleContainer>
                                    <Title>
                                        {item.list.title}
                                    </Title>
                                </TitleContainer>
                                <Todos>
                                    {item.list.todos.map(todo => (
                                        <Card 
                                            key={todo.id}
                                            todo={{
                                                ...todo,
                                                metadata: {
                                                    ...todo.metadata,
                                                    cardH: todo.metadata.cardH 
                                                }
                                            }}
                                            setIsEdited={() => null}
                                            config={config}
                                        />
                                    ))}
                                </Todos>
                            </List>
                        )
                    })}
                </Layout>            
        </Container>
    )
};

export default TodoListLayout;
