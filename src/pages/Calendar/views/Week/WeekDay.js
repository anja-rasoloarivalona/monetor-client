import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import { getHoursDate } from './functions'
import { useOnClickOutside } from "../../../../hooks"
import moment from 'moment'
import WeekDayInput from "./WeekDayInput"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    border-right: 1px solid ${props =>  props.theme.form.unfocused.border};
`
const Content = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
`
const HourLayout = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: max-content;
`
const HourLayoutItem = styled.div`
    cursor: pointer;
    border-bottom: 1px solid ${props =>  props.theme.form.unfocused.border};
    position: relative;
    :after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 0px;
        background: ${props => props.theme.primary};
    }

    :hover {
        background: ${props => props.theme.secondarySurface};
    };
    ${props => {
        const { isHighLighted, current, index } = props
        if(isHighLighted && current.h === index){ 
            return {
                ":after": {
                    height: "1px",
                    top: `${100 * current.m / 60}%`
                }
            }
        }
    }}
`

const WeekDay = props => {

    const { 
        data: { formatted, date }, 
    } = props


    const containerRef = useRef()
    const inputRef = useRef()

    const { 
        settings: { unitType },
    } = useSelector(state => state) 

    
    const [ isAdding, setIsAdding ] = useState(false)

    useOnClickOutside(containerRef, () => {
        setIsAdding(false)
    })

    const toggleHandler = value => {
        if(!isAdding || (isAdding !== value)){
            setIsAdding(value)
        }
    }

    useEffect(() => {
        if(isAdding){
            if(inputRef.current){
                inputRef.current.focus()
            }
        }
    },[isAdding])


    const isHighLighted = moment(new Date()).format("DD-MM-YYYY") === formatted

    return (
        <Container className="weekday" ref={containerRef}>
            <Content className="weekday__content">
                <HourLayout>
                    {getHoursDate(unitType).map((h, index) => {
                        return (
                            <HourLayoutItem
                                key={index}
                                className="item"
                                isAdding={h === isAdding}
                                onClick={() => toggleHandler(h)}
                                isHighLighted={isHighLighted}
                                h={h}
                                index={index}
                                current={{
                                    h: new Date().getHours(),
                                    m: new Date().getMinutes()
                                }}
                                id={`${formatted} ${index}h`}
                            >
                                {isAdding === h && (
                                    <WeekDayInput
                                        date={date}
                                        hour={index}
                                        closeHandler={() => setIsAdding(false)}
                                    />
                                )}
                            </HourLayoutItem>
                        )
                    })}
                </HourLayout>
            </Content>
        </Container>
     )
};

export default WeekDay;
