import React, { useState, useRef } from "react"
import styled from "styled-components"
import moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from '../../../../components'
import { months } from '../../data'
import { useSelector } from 'react-redux'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import { AppDate } from '../../../../components/Form/WithoutValidation'
import { useOnClickOutside } from '../../../../hooks'

const HeaderSection = styled.div`
    display: flex;
    align-items: center;
    background: ${props =>  props.theme.surface};
    margin-top: .5rem;
    color: ${props => props.theme.text};
    min-width: 20rem;
`
const HeaderLabel = styled.div`
    font-size: 2rem;
    font-weight: 500;
    margin: 0 2rem;
`

const HeaderIcon = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    :hover {
        background: ${props => props.theme.background};
    }
`

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid ${props => props.theme.background};
    height: 3.5rem;
    border-radius: .5rem;

    > div:not(:last-child){
        border-right: 1px solid ${props => props.theme.background};
    }

`

const ButtonItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0 1.5rem;
    font-size: 1.2rem;
    cursor: pointer;

    svg {
        color: ${props => props.theme.textLight};
    }
`


const HeaderButtons = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.form.unfocused.border};
    margin-left: 1.5rem;
    border-radius: 4px;
    
    > div:not(:last-child){
        border-right: 1px solid ${({ theme }) => theme.form.unfocused.border};
    }

    > div:first-child {
        border-top-left-radius: .5rem;
        border-bottom-left-radius: .5rem;
    }
    > div:last-child {
        border-top-right-radius: .5rem;
        border-bottom-right-radius: .5rem;
    }
`

const HeaderButton = styled.div`
    font-size: 1.4rem;
    color: ${({ theme }) => theme.textLight};
    cursor: pointer;
    position: relative;
    :hover {
        background: ${({ theme }) => theme.secondarySurface};
        color: ${({ theme }) => theme.text};
    }
    &.text {
        color: ${({ theme }) => theme.text};
        font-weight: 600;
        padding: .8rem 1.4rem;
    }
    &.active {
        svg {
            color: ${({ theme }) => theme.text};
        }
    }
`

const HeaderButtonIcon = styled.div`
    padding: .8rem 1rem;
`

const CalendarContainer = styled.div`
    position: absolute;
    top: calc(100% + .8rem);
    left: 0;
    z-index: 2;
    width: 30rem;

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

const WeekHeaderLarge = props => {


    const { setPos, current, periods, config, getPeriods } = props

    const [ showCalendar, setShowCalendar ] = useState(null)
    const calendarRef = useRef()

    useOnClickOutside(calendarRef, () => {
        if(showCalendar){
            setShowCalendar(false)
        }
    })

    const { 
        settings: { locale },
        text: { text }
    } = useSelector(state => state) 


    const goToToday = () => {
        const formattedToday = moment(new Date()).format("DD-MM-YYYY")
        const todayData = periods.find(period => period.formatted === formattedToday)
        if(todayData){
            setPos(todayData.index.pos - Math.floor(config.days / 2))
        } else {
            getPeriods(new Date())
        }
    }

    const changeDateHandler = value => {
        const formatted = moment(new Date(value)).format("DD-MM-YYYY")
        const existing = periods.find(period => period.formatted === formatted)
        if(!existing){
            getPeriods(new Date(value))
        } else {
            setPos(existing.index.pos - Math.floor(config.days / 2))

        }
    }


    return (
        <>
                <HeaderSection>
                    <HeaderButtons>
                        <HeaderButton className="text" onClick={goToToday}>Today</HeaderButton>
                        <HeaderButton onClick={() => setPos(prev => prev - 4)}>
                            <HeaderButtonIcon>
                                <FontAwesomeIcon icon="angle-double-left"/>
                            </HeaderButtonIcon>
                        </HeaderButton>
                        <HeaderButton onClick={() => setPos(prev => prev - 1)}>
                            <HeaderButtonIcon>
                                <FontAwesomeIcon icon="angle-left"/>
                            </HeaderButtonIcon>
                        </HeaderButton>
                        <HeaderButton onClick={() => setPos(prev => prev + 1)}>
                            <HeaderButtonIcon>
                                <FontAwesomeIcon icon="angle-right"/>
                            </HeaderButtonIcon>

                        </HeaderButton>
                        <HeaderButton onClick={() => setPos(prev => prev + 4)}>
                            <HeaderButtonIcon>
                                <FontAwesomeIcon icon="angle-double-right"/>
                            </HeaderButtonIcon>

                        </HeaderButton>
                        <HeaderButton ref={calendarRef} className={showCalendar ? 'active' : ""}>
                            <HeaderButtonIcon onClick={() => setShowCalendar(prev => !prev)}>
                                <FontAwesomeIcon icon={faCalendar}/>
                            </HeaderButtonIcon>
                            {showCalendar && (
                                <CalendarContainer>
                                    <AppDate 
                                        input={{
                                            label: ""
                                        }}
                                        currentValue={new Date()}
                                        onChange={changeDateHandler}
                                        props={{
                                            autoFocus: true,
                                            inline: true
                                        }}                                    
                                    />
                             </CalendarContainer>
                            )}
                            
                        </HeaderButton>
                    </HeaderButtons>
                </HeaderSection>
                <HeaderSection>
                    <HeaderLabel>
                        {months[locale][current.date.getMonth()].long} {current.date.getFullYear()}
                    </HeaderLabel>
                </HeaderSection>
                <HeaderSection>
                    <ButtonContainer>
                        <ButtonItem>
                            <FontAwesomeIcon icon="eye"/>
                            {text.months}
                        </ButtonItem>
                        <ButtonItem>
                            <FontAwesomeIcon icon="plus"/>
                            {text.add}
                        </ButtonItem>
                    </ButtonContainer>
                </HeaderSection> 
        </>
    )
};

export default WeekHeaderLarge;
