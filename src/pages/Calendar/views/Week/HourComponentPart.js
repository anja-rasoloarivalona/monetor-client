import React, { useRef } from "react"
import styled from "styled-components"
import {  useDrop } from "react-dnd";

const Container = styled.div`
    width: 100%;
    height: 100%;

    ${props => {
        if(props.index === 0){
            return {
                borderBottom: `1px solid ${props.theme.background}`
            }
        }
    }}
`

const HourComponentPart = props => {

    const { item, index } = props

    const ref = useRef(null);

    const [{ handlerId }, dropRef ] = useDrop({
        accept: "card",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
        },
    });
    dropRef(ref)

    return (
        <Container
            index={index}
            ref={dropRef}
            data-handler-id={handlerId}
        >
          
        </Container>
     )
};

export default HourComponentPart;
