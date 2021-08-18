import React from "react"
import styled from "styled-components"
import { days } from "../../data"
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from '../../../../components'
import { months } from '../../data'
import moment from "moment"
import WeekHeaderLarge from './WeekHeaderLarge'
import WeekHeaderSmall from './WeekHeaderSmall'

const Container = styled.div`
    background: ${props => props.theme.surface};
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid ${props => props.theme.form.unfocused.border};
`


const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    position: relative;
    z-index: 9;

    
    :before {
        content: "";
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 9;
        border-bottom: 1px solid ${props => props.theme.form.unfocused.border};
        background: ${props =>  props.theme.surface};
    }
`

const Slider = styled.div`
    display: grid;
    transition: all .3s ease-in;
`

const Label = styled.div`
    font-size: 1.2rem;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;

    ${props => {
        if(props.isHighLighted && !props.small){
            return {
                ".header__slider__date": {
                    color: props.theme.white,
                    ":before": {
                        background: props.theme.primary,
                    }
                }
            }
        }
    }}

`

const LabelDay = styled.div`
    display: flex;
    align-items: center;
    margin-right: .5rem;
`
const LabelDate = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 2.5rem;

    :before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom 0;
        margin: auto;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        z-index: -1;
    }
`


const WeekHeader = props => {
    
    const { periods,setPeriods,  setPos, pos, small,setIsAddingPeriod } = props

    const { 
        settings: { locale },
        text: { text }
    } = useSelector(state => state) 

    const current = periods.find(period => period.index.pos === pos)
    const formattedToday = moment(new Date()).format("DD-MM-YYYY")


    const renderSliderLabel = (period, index) => {
        return (
            <Label
                key={index}
                isHighLighted={formattedToday === period.formatted}
                small={small}
            >
                {small && formattedToday === period.formatted ?
                    text.today :
                    <>
                        <LabelDay>
                            {days[locale][period.day].short} 
                        </LabelDay>
                        <LabelDate className="header__slider__date">
                            {period.date.getDate()}
                        </LabelDate>
                    </>
                }
            </Label>
        )
    }

    return (
        <Container className="header">
            <Header className="header__header">
                {small ?
                    <WeekHeaderSmall 
                        setPos={setPos}
                        current={current}
                        setPeriods={setPeriods}
                        periods={periods}
                        setIsAddingPeriod={setIsAddingPeriod}
                    /> :
                    <WeekHeaderLarge 
                        setPos={setPos}
                        current={current}
                    />
                }
            </Header>
            <Slider  className="header__slider">
                {periods.map((period, index) => renderSliderLabel(period, index))}
            </Slider>
        </Container>
     )
};

export default WeekHeader;
