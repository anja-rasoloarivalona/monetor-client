import React from "react"
import styled from "styled-components"

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
    return (
        <Container  className="hour"/>
     )
};

export default HourComponent;
