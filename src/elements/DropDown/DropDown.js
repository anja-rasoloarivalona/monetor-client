import React, {useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { useWindowSize } from '../../hooks'

const Container = styled.div`
    overflow: hidden;
    position: absolute;
    top: calc(100% + 1rem);
    background: ${props => props.theme.surface};
    border-radius: .5rem;
    box-shadow: ${props => props.theme.boxShadow};
    z-index: 4;
    transition: width .3s ease-in, height .3s ease-in;

    ${props => {
        const { config : {w, h, style}, windowHeight } = props
        return {
            width: `${w}px`,
            height: `${Math.min(windowHeight*.8, h)}px`,
            ...style
        }
    }}
`

const Content = styled.div`
    height: max-content;
`


const DropDown = props => {

    const { config } = props

    const { windowHeight } = useWindowSize()

    return (
        <Container config={config} windowHeight={windowHeight}>
            <Content>
                {props.children}
            </Content>
        </Container>
     )
};

export default DropDown;
