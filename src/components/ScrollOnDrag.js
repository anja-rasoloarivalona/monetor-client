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
    }

    const mouseUp = () => {
        setIsScrolling(false)
    }

    const mouseMove = e => {
        if(isScrolling){
            ref.current.scrollLeft = scrollX - e.clientX + clientX;
            setScrollX(prev => prev - e.clientX + clientX);
            setClientX(e.clientX)

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
            onMouseLeave={() => setIsScrolling(false)}
        >
            {props.children}
        </Container>
    )
}

export {
    ScrollDrag
}
