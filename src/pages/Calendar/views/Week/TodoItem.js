import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import moment from "moment"
import { addDays, getHoursDate } from './functions'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Container = styled.div`
    width: 100%;
    height: 100%;
    background: ${props => props.theme.suface};
    padding: 1rem;
    position: relative;
    cursor: pointer;
`

const Title = styled.div`
    font-size: 1.2rem;
    margin: .5rem;
    display: inline-block;
    line-height: 1.4;
    text-overflow: ellipsis;
    white-space: nowrap;
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

const Delete = styled.div`
    position: absolute;
    top: .5rem;
    right: .5rem;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: ${props => props.theme.background};
`

const TodoItem = props => {

    const { item, setToBeSaved  } = props

    const [ data, setData ] = useState(null)

    const {
        settings: { unitType }
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
            if(itemHasChanged()){
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
                setToBeSaved(prev => ([...prev, updatedItem]))
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

    return (
        <Container >
            <Title>{data.title}</Title>
            <Delete>
                <FontAwesomeIcon icon="times"/>
            </Delete>
            {renderTimeStamp()}
        </Container>
     )
};

export default TodoItem;
