import React from "react"
import {  DateContainer as Container, DateInput } from '../FormStyle'
import { useSelector } from 'react-redux'
import "react-datepicker/dist/react-datepicker.css";


const Date = props => {

    const { input, currentValue, onChange } = props

    const {
        settings: { locale }
    } = useSelector(state => state)
    const format = locale === "fr" ? "dd-MM-yyyy" : "MM-dd-yyyy"

    return (
        <Container>
                <DateInput 
                    dateFormat={format}
                    minDate={input.minDate ? input.minDate : null}
                    maxDate={input.maxDate ? input.maxDate : null}
                    selected={currentValue}
                    onChange={date => onChange(date)}
                    onFocus={e => e.target.blur()}
                    autoComplete="off"
                    placeholderText={input.required ? `${input.label} \u002A` : input.label}
                />
        </Container>
     )
};

export default Date;
