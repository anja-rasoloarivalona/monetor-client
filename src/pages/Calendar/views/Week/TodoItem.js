import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import moment from "moment"
import { addDays } from './functions'

const Container = styled.div`
    width: 100%;
    height: 100%;
    background: ${props => props.theme.suface};
    padding: 1rem;
`

const Title = styled.div`
    font-size: 1.2rem;
    margin: .5rem;
    display: flex;
`


const TodoItem = props => {

    const { item, setToBeSaved  } = props

    const [ data, setData ] = useState(null)


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


    return (
        <Container >
            <Title>{data.title}</Title> {moment(new Date(data.dueDate)).format("hh-mm-ss")}
        </Container>
     )
};

export default TodoItem;
