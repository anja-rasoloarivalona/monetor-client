import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import { useWindowSize } from '../../../../hooks'
import GridLayout from 'react-grid-layout'
import "../../../../../node_modules/react-grid-layout/css/styles.css"
import "../../../../../node_modules/react-resizable/css/styles.css"
import TodoItem from './TodoItem'
import moment from 'moment'
import { getHourData } from '../../functions'

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index 1;
    display: flex;

    .layout {
        width: 100%;
    }
`

const TodoItemContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.theme.surface};
    padding: .2rem;
    box-shadow: ${props => props.theme.boxShadow};
    border-radius: .2rem;

    .react-resizable-handle.react-resizable-handle-se {
        bottom: .2rem !important;
        right: .2rem !important;
    }
`


const DraggableGrid = props => {

    const { current } = props

    const [layout, setLayout] = useState(null)

    const { windowWidth } = useWindowSize()

    const {
        user: { todoLists },
        settings: { unitType }
    } = useSelector(state => state)


    useEffect(() => {
        const data = []
        const _layout = []

        const isInRange = item => {
            if(!item.dueDate) return false
            const date = new Date(item.dueDate)
            if(date <= new Date(current.end) && date >= new Date(current.start)){
                return true
            }
            return false
        }
        Object.keys(todoLists).forEach(listId => {
            const list = todoLists[listId]
            list.todos.forEach(todo => {
                if(isInRange(todo)){
                    data.push(todo)
                }
                if(todo.checkList){
                    todo.checkList.forEach(listItem => {
                        if(isInRange(listItem)){
                            data.push(listItem)
                        }
                    })
                }
            })
        })
        data.forEach(item => {
            const date = new Date(item.dueDate)
            const configData = {
                day: date.getDay() ,
                ...getHourData(date, unitType)
            }
            const pos = {
                x: configData.day * 2,
                y: configData.hour * 2,
                w: 2,
                h: 1,
                i: item.id
            }
            _layout.push({
                ...pos,
                item,
                configData
            })
        })
        setLayout(_layout)
    },[todoLists, current])

    if(!layout){
        return null
    }

    return (
        <Container>
            <GridLayout
                className="layout"
                layout={layout}
                cols={14}
                rows={48}
                rowHeight={40}
                width={windowWidth - 200}
                isDraggable={true}
                isResizable={true}
                margin={[0, 0]}
                compactType={null}
            >
                {layout.map(item => (
                    <TodoItemContainer key={item.i}>
                        <TodoItem item={item} />
                    </TodoItemContainer>
                ))}
            </GridLayout>
        </Container>
     )
};

export default DraggableGrid;
