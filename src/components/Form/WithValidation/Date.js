import React, { useEffect } from "react"
import {  DateContainer as Container, Label, Error, DateInput } from '../FormStyle'
import { useSelector } from 'react-redux'
import "react-datepicker/dist/react-datepicker.css";


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
