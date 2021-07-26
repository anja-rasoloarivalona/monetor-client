import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"


const GridContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    // background: salmon;


    ${props => {
        return {
            ".container": {
                gridTemplateColumns: `repeat(${props.length}, 100%)`
            }
        }
    }}
`

const Container = styled.div`
    display: grid;
    position: absolute;
    top: 0;
    left: 0;
    margin: auto;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    transform: translateX(${props => props.pos}%);
    transition: all .3s ease-in;
`


const DynamicSlider = props => {

    const { pos } = props
    
    return (
        <GridContainer
            length={props.length}
        >
            <Container
                className="container"
                pos={pos}
            >
                {props.children}
            </Container>      
        </GridContainer>
     )
};

export default DynamicSlider;
