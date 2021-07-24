import React, { useState, useEffect } from "react"
import styled from "styled-components"
import DraggableMessage from './DraggableMessage'
import { useSelector, useDispatch } from 'react-redux'


const Draggable = () => {

    const {
        user: { contacts }
    } = useSelector(state => state)


    const [displayed, setDisplayed ] = useState([])

    useEffect(() => {
        if(contacts){
            const opened = []
            contacts.forEach(contact => {
                if(contact.isDragOpened){
                    opened.push(contact)
                }
            })
            setDisplayed(opened)
        }
    },[contacts])

    return (
        <>
            {displayed.map(item => (
                <DraggableMessage current={item} key={item.id} />
            ))}
        </>
     )
};

export default Draggable;
