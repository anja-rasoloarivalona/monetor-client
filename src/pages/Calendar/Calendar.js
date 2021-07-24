import React, { useState } from "react"
import styled from "styled-components"
import Header from './Header'
import View from './View'
import moment from 'moment'

const Container = styled.div`
    width: 100%;
    height: calc(100vh - 6.5rem);
    background: orange;
    display: flex;
    flex-direction: column;
`


const Calendar = () => {


    const initialViewMode = {
        type: "month",
        current: {
            month: new Date().getMonth(),
            year: new Date().getFullYear()
        }
    }

    const [ viewMode, setViewMode ] = useState(initialViewMode)

    return (
        <Container>
            <Header 
                viewMode={viewMode}
                setViewMode={setViewMode}
            />
            <View 
                viewMode={viewMode}
                setViewMode={setViewMode}
            />
        </Container>
     )
};

export default Calendar;
