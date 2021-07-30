import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { ScrollHorizontalBar } from './Scrollbar'

const Container = styled.div`
    width: 100%;
    height: 100%;
    cursor: grab; 
    overflow-x: scroll;
`

const ScrollDrag = props => {

    const [isScrolling, setIsScrolling] = useState(false)
    const [clientX, setClientX] = useState(0)
    const [scrollX, setScrollX] = useState(0)

    const ref = useRef()

    const mouseDown = e => {
        setIsScrolling(true)
        setClientX(e.clientX)
        if(props.outer){
            props.setIsScrolling(true)
            props.setClientX(e.clientX)
        }
    }

    const mouseUp = () => {
        setIsScrolling(false)
        if(props.outer){
            props.setIsScrolling(false)
        }
    }

    const mouseMove = e => {
        if(isScrolling){
            ref.current.scrollLeft = scrollX - e.clientX + clientX;
            setScrollX(prev => prev - e.clientX + clientX);
            setClientX(e.clientX)
            if(props.outer){
                props.setScrollX(prev => prev - e.clientX + clientX);
                props.setClientX(e.clientX)
            }

        }
    }

    const mouseLeave = () => {
        setIsScrolling(false)
        if(props.outer){
            props.setIsScrolling(false)
        }
    }

    useEffect(() => {
        ref.current.scrollLeft = ref.current.clientWidth
    },[])


    return (
        <Container
            style={{ ...props.style}}
            ref={ref}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            onMouseMove={mouseMove}
            onMouseLeave={mouseLeave}
        >
            {props.children}
        </Container>
    )
}

export {
    ScrollDrag
}
