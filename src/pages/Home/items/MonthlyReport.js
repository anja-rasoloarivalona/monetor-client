import React from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'


const Container = styled.div`
    width: 100%;
    height: 100%;
`

const MonthlyReport = () => {

    const {
        home: { weather }
    } = useSelector(state => state)

    return (
        <Container>
          MonthlyReport
        </Container>
     )
};

export default MonthlyReport;
