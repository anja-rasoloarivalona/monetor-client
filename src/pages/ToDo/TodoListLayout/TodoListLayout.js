import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Layout from 'react-grid-layout'
import Card from "../Card"
import "../../../../node_modules/react-grid-layout/css/styles.css"
import "../../../../node_modules/react-resizable/css/styles.css"

const Container = styled.div`
    height: calc(100vh - 15.5rem);
    width: 100%;
    max-width: ${({ length }) => length * 320}px;

    .layout {
        .react-grid-item {
            max-width: 30rem !important;
            min-width: 30rem !important;
            width: 30rem !important;
        }
    }
`

const List = styled.div`
    background: ${({ theme }) => theme.secondarySurface};
    box-shadow: ${({ theme }) => theme.boxShadowExtraLight};
    border-radius: .8rem;
    padding: 0 1rem;
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
`

const Title = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: ${props => props.theme.text};
`

const Todos = styled.div`
    > div {
        margin-bottom: 1.5rem;
    }
`

const TodoListLayout = props => {

    const { todoLists,  setListLayout, listLayout  } = props

    useEffect(() => {
        const _layout = []
        todoLists.forEach(list => {
            let h = 5
            if(list.todos && list.todos.length > 0){
                h += 4
            }
            list.todos.forEach((todo, index) => {
                let detailH = (todo.dueDate || (todo.description && todo.description !== "<p><br></p>") || (todo.checkList && todo.checkList.length > 0)) ? 3.5 : 0
                let labelH = todo.todoLabels && todo.todoLabels.length > 0 ? 3.5 : 0
                let coverH = todo.coverImage ? 16 : 0
                let origin = detailH > 0 || labelH > 0 || coverH > 0 ? 3.5 : 5.5
                h += (origin + detailH + labelH + coverH)
            })
            _layout.push({
                x: list.index,
                y: 0,
                w: 1,
                h,
                i: list.id,
                list
            })
        })
        setListLayout(_layout)
    },[])


    if(!listLayout){
        return null
    }
    const config = {
        rowHeight: 10,
        listWidth: 300,
        margin: [10, 0]
    }

    const stopDragHandler = layout => {
        const updatedLayout = []
        layout.forEach(item => {
            const list = todoLists.find(list => list.id === item.i)
            updatedLayout.push({
                ...item,
                list
            })
        })
        setListLayout(updatedLayout)
    }

    return (
        <Container length={todoLists.length}>
            <Layout
                className="layout"
                layout={listLayout}
                maxRows={1}
                rowHeight={config.rowHeight}
                cols={todoLists.length}
                width={todoLists.length * config.listWidth + (20 * todoLists.length)}
                margin={config.margin}
                isResizable={false}
                compactType='horizontal'
                containerPadding={[0,0]}
                onDragStop={stopDragHandler}
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
                                            todo={todo}
                                            setIsEdited={() => null}
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
