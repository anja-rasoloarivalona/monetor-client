import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import styled from "styled-components"
import { faCircle } from '@fortawesome/free-regular-svg-icons'

const Container = styled.div`
    display: flex;
`
const Unit = styled.div`
    display: flex;

    svg {
        font-size: 30%;
        margin-top: 20%;
    }
`

const UnitLabel = styled.span``


const UnitComponent = props => {
    return (
        <Container className="unit">
            <span>{props.children}</span>
            <Unit>
                <FontAwesomeIcon icon={faCircle} />
                <UnitLabel className="unit__label">C</UnitLabel>
            </Unit>
        </Container>
     )
};

export default UnitComponent;
