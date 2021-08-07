import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import styled from "styled-components"

const Container = styled.div`
    overflow: hidden;
    position: absolute;
    top: calc(100% + 1rem);
    background: ${props => props.theme.surface};
    border-radius: .5rem;
    box-shadow: ${props => props.theme.boxShadow};
    z-index: 4;


    &.hidden {
        transition: none;

    }

    &.show {
        transition: all .3s ease-in;
    }

    ${props => {
        const { config : {w, h, style}, show } = props
        return {
            width: `${w}px`,
            height: show ? `${h}px` : 0,
            ...style
        }
    }}
`

const Content = styled.div`
    height: max-content;
`

const CloseButton = styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 1;
    font-size: 1.4rem;
`

const DropDown = props => {

    const { config, show } = props

    return (
        <Container
            config={config}
            show={show}
            className={show ? "show" : "hidden"}
        >
            <Content>
                {/* <CloseButton>
                    <FontAwesomeIcon icon="times"/>
                </CloseButton> */}
                {props.children}
            </Content>
        </Container>
     )
};

export default DropDown;
