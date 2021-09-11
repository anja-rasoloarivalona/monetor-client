import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Layout from 'react-grid-layout'
import Card from "../Card"
import "../../../../node_modules/react-grid-layout/css/styles.css"
import "../../../../node_modules/react-resizable/css/styles.css"

const Container = styled.div`
    margin-left: 2rem;
    height: calc(100vh - 15rem);
    width: 100%;

    .layout {
        transform: translateY(-1.5rem);
    }
`

const List = styled.div`
    background: ${({ theme }) => theme.secondarySurface};
    box-shadow: ${({ theme }) => theme.boxShadowExtraLight};
    border-radius: .5rem;
    padding: 0 1rem;
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

const Todos = styled.div``

const TodoListLayout = props => {
    const { todoLists } = props
    const [ layout, setLayout ] = useState(null)

    useEffect(() => {
        const _layout = []
        todoLists.forEach(list => {
            let h = 3
            list.todos.forEach((todo, index) => {
                let detailH = (todo.dueDate || (todo.description && todo.description !== "<p><br></p>") || (todo.checkList && todo.checkList.length > 0)) ? 1 : 0
                let labelH = todo.todoLabels && todo.todoLabels.length > 0 ? 1 : 0
                h += (2 + detailH + labelH)
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
        console.log({
            _layout
        })
        setLayout(_layout)
    },[todoLists])


    if(!layout){
        return null
    }
    const config = {
        rowHeight: 10,
        listWidth: 393,
        margin: [10, 15]
    }

    return (
        <Container>
            <Layout
                className="layout"
                layout={layout}
                maxRows={1}
                rowHeight={config.rowHeight}
                cols={todoLists.length}
                width={todoLists.length * config.listWidth}
                margin={config.margin}
                isResizable={false}
                compactType='horizontal'
            >
                    {layout.map(item => {
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
