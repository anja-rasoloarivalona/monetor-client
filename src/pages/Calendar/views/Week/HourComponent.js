import React from "react"
import styled from "styled-components"

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    border-right: 1px solid ${props => props.theme.form.unfocused.border};
    border-bottom: 1px solid ${props => props.theme.form.unfocused.border};

    :before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        left: 0;
        width: 100%;
        height: 1px;
        z-index: 1;
        background:  ${props => props.theme.background};
    }
`

const Content = styled.div`
    position: relative;
    z-index: 2;
`

const HourComponent = props => {

    const { viewMode, item  } = props

    return (
        <Container>
            <Content>
            </Content>
        </Container>
     )
};

export default HourComponent;
