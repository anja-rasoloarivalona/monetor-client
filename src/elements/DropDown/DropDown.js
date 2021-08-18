import React, {useState, useEffect, useRef } from "react"
import styled from "styled-components"

const Container = styled.div`
    overflow: hidden;
    position: absolute;
    top: calc(100% + 1rem);
    background: ${props => props.theme.surface};
    border-radius: .5rem;
    box-shadow: ${props => props.theme.boxShadow};
    z-index: 4;

    ${props => {
        const { config : {w, h, style} } = props
        return {
            width: `${w}px`,
            height: `${h}px`,
            ...style
        }
    }}
`

const Content = styled.div`
    height: max-content;
`


const DropDown = props => {

    const { config } = props

    return (
        <Container config={config}>
            <Content>
                {props.children}
            </Content>
        </Container>
     )
};

export default DropDown;
