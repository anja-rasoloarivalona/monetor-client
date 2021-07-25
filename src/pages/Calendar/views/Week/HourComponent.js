import React from "react"
import styled from "styled-components"
import HourComponentPart from "./HourComponentPart"

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    border-right: 1px solid ${props => props.theme.form.unfocused.border};
    border-bottom: 1px solid ${props => props.theme.form.unfocused.border};
    display: flex;
    flex-direction: column;

    :before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 100%;
        height: 1px;
        background: ${props => props.theme.background};
    }
`

const HourComponent = props => {

    const { viewMode, item  } = props

    const parts = [0, 1]

    return (
        <Container>
            {/* {parts.map(part => (
                <HourComponentPart
                    index={part} 
                    item={item}
                />
            ))} */}
        </Container>
     )
};

export default HourComponent;
