import React, { useState } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import { AppDate } from '../../../../components/Form/WithoutValidation'
import moment from 'moment'
import { addPeriods, getPeriod, addDays } from './functions'

const Container = styled.div`
    width: 100%;
    height: 6rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    position: relative;


    :after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background: ${props => props.theme.background};
        z-inde: 2;
    }
`

const Section = styled.div`
    display: flex;
    align-items: center;
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

const CalendarSelector = styled(ButtonContainer)`
    margin-left: .5rem;
    padding: 0 1rem;
    position: relative;
    z-index: 10;
`

const CalendarSelectorLabel = styled.div`
    cursor: pointer;
    svg {
        margin: 0 .3rem;
    }
`
const CalendarContainer = styled.div`
    position: absolute;
    top: calc(100% + .5rem);
    left: 0;
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
`

const Header = props => {

    const { setPos, current, setPeriods, periods, setIsAddingPeriod } = props

    const {
        text: { text }
    } = useSelector(state => state)

    const [ showCalendar, setShowCalendar ] = useState(false)

    const changeDateHandler = value => {
        const selected = moment(new Date(value)).format("DD-MM-YYYY")
        const exists = periods.find(period => selected === period.formatted)
        if(exists){
            setPos(exists.index.pos)
            setShowCalendar(false)
        } else {
            const newPeriods = []
            for(let i = 4 * -2; i < 4 * 5; i++){
                newPeriods.push({
                    ...getPeriod(addDays(new Date(value), i)),
                    index: {
                        index: i
                    }
                })
            }
            newPeriods.forEach((item, index) => {
                newPeriods[index].index.pos = index
            })
            const newPos = newPeriods.find(i => i.formatted ===  selected).index.pos

            setIsAddingPeriod(true)
            setPeriods(newPeriods)
            setPos(newPos)
            setShowCalendar(false)
        }
    }


    return (
        <Container>
            <Section>
                <ButtonContainer>
                    <ButtonItem>
                        {text.today}
                    </ButtonItem>
                    <ButtonItem onClick={() =>setPos(prev => prev - 1)}>
                        <FontAwesomeIcon icon="chevron-left"/>
                    </ButtonItem>
                    <ButtonItem onClick={() =>setPos(prev => prev + 1)}>
                        <FontAwesomeIcon icon="chevron-right"/>
                    </ButtonItem>
                </ButtonContainer>
                <CalendarSelector>
                    <CalendarSelectorLabel onClick={() => setShowCalendar(prev => !prev)}>
                        <FontAwesomeIcon icon={faCalendar}/>
                        <FontAwesomeIcon icon="chevron-down" />
                    </CalendarSelectorLabel>
                    {showCalendar && (
                        <CalendarContainer>
                            <AppDate 
                                input={{
                                    label: "",
                                }}
                                currentValue={current.date}
                                onChange={changeDateHandler}
                                props={{
                                    autoFocus: true,
                                    inline: true
                                }}
                            />
                        </CalendarContainer>
                    )}

                </CalendarSelector>
            </Section>
            <Section>
                <ButtonContainer>
                    <ButtonItem>
                        <FontAwesomeIcon icon="cog"/>
                    </ButtonItem>
                </ButtonContainer>
            </Section>
        </Container>
     )
};

export default Header;
