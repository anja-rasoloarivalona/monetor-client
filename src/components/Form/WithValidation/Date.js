import React, { useEffect } from "react"
import {  Container as _Container, Label, Error, Unit } from '../FormStyle'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import en from 'date-fns/locale/en-US'
import fr from 'date-fns/locale/fr-CA'
import { registerLocale } from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from 'react-datepicker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

registerLocale('en', en)
registerLocale('fr', fr)

const Container = styled(_Container)`

    margin-bottom: 3rem;

    .react-datepicker__triangle {
        display: none;
    }

    .react-datepicker-popper {
        transform: translate(0px, 45px);
        width: 100%;
        z-index: 20;

        & > div:first-child {
            display: flex;
            justify-content: flex-end
        }
    }

    .react-datepicker-wrapper {
        width: 100%;
    }

    .react-datepicker {
        width: 100%;
        max-width: 25rem;

    }

    .react-datepicker__month-container {
        width: 100%;
        max-width: 25rem;
    }

    .react-datepicker__day-names {
        margin-top: 1rem;
    }

    .react-datepicker__day-name {
        width: 2.5rem;
        padding: .5rem 0;
    }

    .react-datepicker__day-name, .react-datepicker__day, .react-datepicker__time-name {
        width: 2.5rem;
        padding: .5rem 0;

    }

`

const DateInput = styled(ReactDatePicker)`
    width: 100%;
    height: 4.5rem;
    border-radius: .5rem;
    margin-top: 1rem;
    margin-bottom: 0rem;
    padding-left: 1.2rem;
    font-family: Roboto;
    font-size: 1.6rem;
`


const Date = props => {

    const {
        settings: { locale }
    } = useSelector(state => state)
    const format = locale === "fr" ? "dd-MM-yyyy" : "MM-dd-yyyy"

    const { input, errors, touched, values, onChange, index, currentFormStyle } = props

    useEffect(() => {
        if(values[input.name] === undefined){
            props.onChange(input.name, "")
        }
    }, [])

    return (
        <Container>
                <DateInput 
                    dateFormat={format}
                    id={input.id}
                    name={input.name}
                    minDate={input.minDate ? input.minDate : null}
                    maxDate={input.maxDate ? input.maxDate : null}
                    selected={values[input.name]}
                    onChange={date => onChange(input.name, date)}
                    onFocus={e => e.target.blur()}
                    // popperPlacement="bottom-start"
                    popperModifiers={{
                        // flip: {
                        //     behavior: ["bottom"] // don't allow it to flip to be above
                        // },
                        // preventOverflow: {
                        //     enabled: false // tell it not to try to stay within the view (this prevents the popper from covering the element you clicked)
                        // },
                        // hide: {
                        //     enabled: false // turn off since needs preventOverflow to be enabled
                        // }
                    }}
                    autoComplete="off"
                    placeholderText={input.required ? `${input.label} \u002A` : input.label}
                />
               <Label
                    htmlFor={input.id}
                    style={{...input.labelStyle}}
                    error={touched[input.name] && errors[input.name]}
                >
                    {input.label} {input.required &&  `\u002A`} 
                </Label>
                {touched[input.name] && errors[input.name] && (
                    <Error>
                        {errors[input.name]} 
                    </Error>
                )}
         
        </Container>
     )
};

export default Date;
