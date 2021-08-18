import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import { getHoursDate } from './functions'
import { Button } from '../../../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useOnClickOutside } from "../../../../hooks"
import moment from 'moment'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    border-right: 1px solid ${props =>  props.theme.form.unfocused.border};
    position: relative;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 4;

`

const HourLayout = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: max-content;
    z-index: 2;
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
        background: ${props => props.theme.background};
    };

    ${props => {
        const { isHighLighted, current, index} = props
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

const InputContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200%;
    min-height: 19rem;
    z-index: 4;
    background: ${props => props.theme.background};
    box-shadow: ${props => props.theme.boxShadow};
    display: flex;
    flex-direction: column;
`

const Input = styled.textarea`
    padding: 1rem;
    flex: 1;
    background: transparent;
    resize: none;
    border: none;
    line-height: 1.4;
    :focus {
        outline: none;
    }
`

const InputCta = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: .5rem;

    button {
        font-size: 1.2rem !important;
        padding: .6rem 2rem;
    }
`
const CloseIcon = styled(FontAwesomeIcon)`
    position: absolute;
    top: .5rem;
    right: .5rem;
    z-index: 2;
`

const WeekDay = props => {

    const { 
        data: { formatted, range, day, date }, 
    } = props

    const containerRef = useRef()
    const inputRef = useRef()

    const { 
        settings: { locale,unitType },
        text: { text }
    } = useSelector(state => state) 

    
    const [ isAdding, setIsAdding ] = useState(false)
    const [ title, setTitle ] = useState("")

    useOnClickOutside(containerRef, () => {
        setIsAdding(false)
        setTitle("")
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
                    {getHoursDate(unitType).map((h, index) => (
                        <HourLayoutItem
                            key={index}
                            className="item"
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
                                <InputContainer>
                                    <CloseIcon icon="times"/>
                                    <Input 
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                        ref={inputRef}
                                    />
                                    <InputCta>
                                        <Button square small transparent>
                                            {text.cancel}
                                        </Button>
                                        <Button square small>
                                            {text.add}
                                        </Button>

                                    </InputCta>
                                </InputContainer>
                            )}
                        </HourLayoutItem>
                    ))}
                </HourLayout>
            </Content>
        </Container>
     )
};

export default WeekDay;
