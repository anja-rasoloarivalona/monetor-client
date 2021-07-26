/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import { useWindowSize } from '../../../../hooks'
import GridLayout from 'react-grid-layout'
import "../../../../../node_modules/react-grid-layout/css/styles.css"
import "../../../../../node_modules/react-resizable/css/styles.css"
import TodoItem from './TodoItem'
import moment from 'moment'
import {getInRangeTodoLists,  getHourData } from '../../functions'

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index 1;
    display: flex;
    transform: translateX(${props => props.pos * 110}%);
    transition: transform .3s ease-in;

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

    const { current: _current, config, pos, id } = props

    const [layout, setLayout] = useState(null)

    const { windowWidth } = useWindowSize()

    const [ current, setCurrent ] = useState({..._current})

 

    const {
        user: { todoLists },
        settings: { unitType }
    } = useSelector(state => state)

    useEffect(() => {
        const updatedCurrent = {...current}
        if(id === 'next'){
            updatedCurrent.start = moment(new Date(current.start)).add(config.days, "day")
            updatedCurrent.end = moment(new Date(current.end)).add(config.days, "day")
            updatedCurrent.id = "next"
        }

        if(id === "prev"){
            updatedCurrent.start = moment(new Date(current.start)).subtract(config.days, "day")
            updatedCurrent.end = moment(new Date(current.end)).subtract(config.days, "day")
            updatedCurrent.id = "prev"
        }
        setCurrent(updatedCurrent)
    },[_current])


    useEffect(() => {
        const _layout = getInRangeTodoLists(todoLists, current, unitType)
        setLayout(_layout)
    },[todoLists, current])

    if(!layout){
        return null
    }


    const getDashboardWidth = () => {
        if(props.config && props.config.container.current){
            return props.config.container.current.clientWidth - props.config.sidebar
        } 
        return windowWidth - 200
    }

    return (
        <Container pos={pos}>
            <GridLayout
                className="layout"
                layout={layout}
                cols={config.days * 2}
                rows={48}
                rowHeight={config.hourItem.height / 2}
                width={getDashboardWidth()}
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
