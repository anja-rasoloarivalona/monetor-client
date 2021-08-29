import React, { useState, useRef } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import { AppDate } from '../../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DueDateInput  from './DueDateInput'
import { useOnClickOutside } from '../../../hooks'


const Container = styled.div`
    margin: 2rem 0;
    margin-left: 2rem;
    display: flex;
    align-items: center;
`

const Item = styled.div`
    &.start {
        margin-right: 2rem;
    }
`

const Content = styled.div`
    display: flex;
    align-items: center;
    height: 4.5rem;
`

const Title = styled.div`
    font-size: 1.4rem;
    color: ${props => props.theme.textLight};
    text-transform: uppercase;
`

const CheckBoxContainer = styled.div`
    width: 1.8rem;
    height: 1.7rem;
    border: 1px solid ${props => props.themetextLight};
    border-radius: .3rem;
    cursor: pointer;
    margin-right: 1rem;
    &.reverse {
        order: 2;
        margin-right: 0rem;
        margin-left: 1rem;
    }
`

const DueDateContainer = styled.div`
    font-size: 1.4rem;
    background: ${props => props.theme.background};
    padding: .6rem 1rem;
    border-radius: .3rem;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 2;
`

const CompletedLabel = styled.div`
    background: ${props => props.theme.green};
    color: ${props => props.theme.white};
    padding: .5rem;
    margin-left: 1rem;
    border-radius: .8rem;
    font-size: 1.2rem;

`

const Toggle = styled.div`
    height: 100%;
    width: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 1rem;
    cursor: pointer;
    
    svg {
        font-size: 1rem;
        color: ${props => props.themetextLight};
    }

    :hover {
        svg {
            color: initial;
        }
    }
`

const DueDate = props => {

    const { dueDate, setDueDate,startDate, setStartDate,  edited, isEditingDate, setIsEditingDate } = props

    const {
        text: { text }
    } = useSelector(state => state)


    const dueDateRef = useRef()
    const startDateRef = useRef()
    const [ isSelectingTime, setIsSelectingTime ] = useState(false)

    useOnClickOutside(dueDateRef, () => {
        if(isEditingDate === "due-date" && !isSelectingTime){
            setIsEditingDate(null)
        }
    })

    useOnClickOutside(startDateRef, () => {
        if(isEditingDate === "start-date" && !isSelectingTime){
            setIsEditingDate(null)
        }
    })

    const toggleHandler = id => {
        if(id !== isEditingDate){
            setIsEditingDate(id)
        } else {
            setIsEditingDate(null)
        }
    }

    const renderDateComponent = props => {
        const time = new Date(props.value).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        return (
            <DueDateContainer ref={props.ref}>
                <AppDate 
                    value={props.value}
                    format="dd mm"
                    month="short"
                />
                &nbsp;{text.at} {time}
                {edited.completedAt && props.id === "due-date" && (
                    <CompletedLabel>
                        {text.complete}
                    </CompletedLabel>
                )}
                <Toggle onClick={() => toggleHandler(props.id)}>
                    <FontAwesomeIcon icon="chevron-down"/>
                </Toggle>
                    {isEditingDate === props.id && (
                        <DueDateInput 
                            dueDate={props.value}
                            setDueDate={props.onChange}
                            closeHandler={() => setIsEditingDate(false)}
                            formTitle={props.formTitle}
                            isSelectingTime={isSelectingTime}
                            setIsSelectingTime={setIsSelectingTime}
                            // minDate={props.id === "due-date" ? startDate || null : null}
                            // maxDate={props.id === "start-date" ? dueDate || null : null}
                        />
                    )}
                </DueDateContainer>
        )
    }

    return (
        <Container>
            {startDate && (
                <Item className="start">
                    <Title>{text.start_date}</Title>
                    <Content>
                        {renderDateComponent({
                            id: "start-date",
                            value: startDate,
                            onChange: setStartDate,
                            ref: startDateRef,
                            formTitle: text.change_start_date
                        })}
                    </Content>
                </Item>
            )}
            <Item>
                <Title>
                    {text.due_date}
                </Title>
                <Content>
                    <CheckBoxContainer className={startDate ? "reverse" : ""}>
      
                    </CheckBoxContainer>
                    {renderDateComponent({
                        id: "due-date",
                        value: dueDate,
                        onChange: setDueDate,
                        ref: dueDateRef,
                        formTitle: text.change_due_date
                    })}
                </Content>
                    
            </Item>
        </Container>
     )
};

export default DueDate;
