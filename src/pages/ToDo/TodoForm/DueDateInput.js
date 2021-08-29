import React, {useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import { AppDate } from '../../../components/Form/WithoutValidation'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { formatDate } from '../../../functions'
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import { Button } from '../../../components'
import { useOnClickOutside } from '../../../hooks'


const Container = styled.div`
    position: absolute;
    top: calc(100% + 1rem);
    left: 0;
    z-index: 2;
    width: 35rem;
    height: max-content;
    background: ${props => props.theme.surface};
    box-shadow: ${props => props.theme.boxShadow};
    border-radius: .5rem;
    padding: 0 1rem;
`

const Header = styled.div`
    padding: 1rem;
    text-align: center;
    margin-bottom: 1rem;
    border-bottom: 1px solid ${props => props.theme.onSurface};
    position: relative;
    font-size: 1.4rem;

    svg {
        position: absolute;
        top: 0rem;
        bottom: 0rem;
        margin: auto;
        right: 1rem;
        z-index: 3;
        cursor: pointer;

    }
`

const ValueContainer = styled.div`
    width: 100%;
    min-height: 5rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const ValueSection = styled.div`
    width: 49%;
    display: flex;
    flex-direction: column;




    .MuiFormControl-marginNormal {
        margin: 0 !important;
        background: white;
        height: 3.5rem;
    }

    .MuiInput-root {
        height: 100%;
        font-size: 1.4rem;
        border: 1px solid ${props => props.theme.form.unfocused.border};

        input {
            padding-left: 1rem;
        }
    }

    .MuiInput-underline:after, .MuiInput-underline:before {
        display: none;
    }

    .MuiSvgIcon-root {
        margin-right: 0px;
    }



    ${props => {
        if(props.clickable){
            return {
                cursor: "pointer",
                "input": {
                    cursor: "pointer",
                }
            }
        }

        if(props.dateInput){
            return {
                input: {
                    border: `1px solid ${props.theme.form.unfocused.border}`,
                    ":focus": {
                        outline: "none",
                        border: `1px solid ${props.theme.form.focused.border}`
                    }
                }
            }
        }
    }}


`
const ValueSectionTitle = styled.div`
    font-weight: bold;
    margin-bottom: .5rem;
    font-size: 1.4rem;
`
const ValueSectionInput = styled.input`
    height: 3.5rem;
    font-size: 1.4rem;
    border: 1px solid ${props => props.theme.form.unfocused.border};
    padding-left: 1rem;
`

const CalendarContainer = styled.div`
    margin-top: 2rem;

    > div:first-child {
        margin-bottom: 0px;
    }

    .react-datepicker, .react-datepicker__month-container {
        max-width: unset;
    }

    .react-datepicker__day-names, .react-datepicker__week {
        display: flex;
        justify-content: space-evenly;
    }

    .react-datepicker__day--selected {
        background: ${({theme}) => theme.primary};
    }
`

const CtaContainer = styled.div`
    margin: 1rem 0;
    display: flex;
    justify-content: flex-end;
`

const AddDueDate = props => {



    const { dueDate, setDueDate, closeHandler, customRef, formTitle, isSelectingTime,setIsSelectingTime, minDate, maxDate } = props

    const {
        text: { text },
        settings: { locale }
    } = useSelector(state => state)

    const container = useRef()

    const format = locale === "fr" ? "dd/mm/yy" : "mm/dd/yy"

    const initalValue = dueDate ? new Date(dueDate) : new Date()

    const [ tempDate, setTempDate ] = useState(initalValue)
    const [ formattedTempDate, setFormattedDate ] = useState(formatDate(initalValue, format, locale))
    const [ dateInputIsFocused, setDateInputIsFocused ] = useState(false)

    const isValidDate = (d) => {
        return d instanceof Date && !isNaN(d);
    }

    const changeDateHandler = value => {
        setTempDate(value)
        setFormattedDate(formatDate(value, format, locale)) 
        setIsSelectingTime(false)
    }

    const submitDateHandler = () => {
        setDueDate(tempDate)
        closeHandler()
    }

    const toggleTimeHandler = () => {
        if(!isSelectingTime){
            setIsSelectingTime(true)
        }
    }

    useEffect(() => {
        const el = document.getElementById("time-picker")
        el.disabled = true
    },[])

    useEffect(() => {
        const isFormattedValid = isValidDate(new Date(formattedTempDate))
        if(!dateInputIsFocused && isFormattedValid){
            if(formattedTempDate !== formatDate(tempDate, format, locale)){
                const selectedTime = tempDate.toLocaleTimeString('en-Us').split(" ")[0]
                const newDate = new Date(Date.parse(`${formattedTempDate} ${selectedTime}`)) 
                setTempDate(newDate)
            }
        }
    },[formattedTempDate, dateInputIsFocused])



    return (
        <Container ref={customRef || container}>
            <Header>
                {formTitle}
                <FontAwesomeIcon 
                    icon="times"
                    onClick={() => closeHandler()}
                />
            </Header>
            <ValueContainer>
                <ValueSection
                    dateInput
                >
                    <ValueSectionTitle>
                        {text.date}
                    </ValueSectionTitle>
                    <ValueSectionInput 
                        value={formattedTempDate}
                        onChange={e => setFormattedDate(e.target.value)}
                        onFocus={() => setDateInputIsFocused(true)}
                        onBlur={() => setDateInputIsFocused(false)}
                    />
                </ValueSection>
                <ValueSection
                    onClick={toggleTimeHandler}
                    clickable
                >
                    <ValueSectionTitle>
                        {text.time}
                    </ValueSectionTitle>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardTimePicker
                            margin="normal"
                            id="time-picker"
                            value={tempDate}
                            onChange={val => changeDateHandler(val, "time-picker")}
                            onClose={() => setIsSelectingTime(false)}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                            open={isSelectingTime}
                        />
                    </MuiPickersUtilsProvider>

                </ValueSection>
            </ValueContainer>
            <CalendarContainer>
                <AppDate 
                    input={{
                        label: "",
                        minDate: minDate ? Math.max(new Date(minDate), new Date()) : new Date(),
                        maxDate: maxDate ? new Date(maxDate) : null,
                    }}
                    currentValue={tempDate}
                    onChange={changeDateHandler}
                    props={{
                        autoFocus: true,
                        inline: true
                    }}
                />
            </CalendarContainer>
            <CtaContainer>
                <Button medium onClick={submitDateHandler}>
                    {text.save}
                </Button>
            </CtaContainer>
        </Container>
     )
};

export default AddDueDate;
