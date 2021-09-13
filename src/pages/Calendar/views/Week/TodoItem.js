import React, { useState, useEffect } from "react"
import styled from "styled-components"
import moment from "moment"
import { addDays, getHoursDate } from './functions'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import  * as actions from '../../../../store/actions'

const Container = styled.div`
    width: 100%;
    height: 100%;
    background: ${({ color }) => color};
    cursor: pointer;
`

const Title = styled.div`
    font-size: 1.2rem;
    display: inline-block;
    line-height: 1.4;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 1rem .5rem;
`

const Timestamp = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    padding: .5rem 1rem;
    font-size: 1.1rem;
    color: ${props => props.theme.textLight};
`


const TodoItem = props => {

    const dispatch = useDispatch()

    const { item, setToBeSaved, periods , isDragging } = props

    const [ data, setData ] = useState(null)
    const [ periodsCount, setPeriodsCount ] = useState(periods.length)

    const {
        settings: { unitType },
        todos: { todoBoards }
    } = useSelector(state => state)


    const itemHasChanged = () => {
        let hasChanged = false
        const variables = ["x", "y","h"]
        variables.forEach(key => {
            if(!hasChanged){
                hasChanged = data[key] !== item[key]
            }
        })
        return hasChanged
    }

    const hoursData = getHoursDate(unitType)


    useEffect(() => {
        if(data){
            if(periodsCount ===  periods.length){
                if(itemHasChanged()){
                    console.log("LOOOOOOL", {
                        item,
                        data
                    })
                    const diffDays = item.x - data.x
                    const date = addDays(item.period.range.start, diffDays)
                    const hour = item.y / 2
                    const min = item.h * 30
                    const startDate = new Date(moment(date).set("hour",  hour).set("minute", (hour % 1) * 60 )) 
                    const endDate = new Date(moment(date).set("hour",  hour).set("minute", min + ((hour % 1) * 60))) 
                    const updatedItem = {
                        ...item,
                        startDate,
                        dueDate: endDate
                    }
                    setData(updatedItem)
                    console.log({
                        updatedItem
                    })
                    setToBeSaved(prev => ([...prev, updatedItem]))
                }
            } else {
                setData(item)
                setPeriodsCount(periods.length)
            }
        } else {
            setData(item)
        }
    },[item])

    if(!data){
        return null
    }


    const getTimeLocale = (date, type) => {
        const h = new Date(date).getHours() - 1
        const hour = hoursData[h]
        const min = new Date(date).getMinutes()
        if(type === "start"){
            let displayedH = hour.split(" ")[0]
            if(min > 0){
                displayedH += `:${min}`
                return displayedH
            }
        } 
        let displayedH = hour
        if(min > 0){
            displayedH += `:${min}`
        }
        return displayedH
    }


    const renderTimeStamp = () => {
        if(!data.startDate) return null
        const startH = new Date(data.startDate)
        const endH = new Date(data.dueDate)
        const diff =   Math.abs(endH - startH) / 36e5;
        if(diff < 1) return null
        return (
            <Timestamp>
                {getTimeLocale(startH, "start")} - {getTimeLocale(endH, "end")} ({diff}h)
            </Timestamp>
        )
    }

    const onClickHandler = () => {
        if(!isDragging){
            dispatch(actions.setForm({
                edited: item,
                opened: "todo"
            }))
            props.history.push({
                search: `?active=td&id=${item.id}&bid=${item.boardId}&lid=${item.todoListId}`
            })
        }
    }

    return (
        <Container color={todoBoards[item.boardId].color} onClick={onClickHandler}>
            <Title>{data.title}</Title>
            {renderTimeStamp()}
        </Container>
     )
};

export default withRouter(TodoItem);
