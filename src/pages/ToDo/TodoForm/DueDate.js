import React, { useState, useRef } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import { AppDate } from '../../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DueDateInput  from './DueDateInput'
import { useOnClickOutside } from '../../../hooks'


const Container = styled.div`
    margin: 2rem 0;
    margin-left: 4rem;
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
`

const DueDateContainer = styled.div`
    margin-left: 1rem;
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

    const { dueDate, setDueDate, edited } = props

    const {
        text: { text }
    } = useSelector(state => state)


    const time = new Date(dueDate).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

    const [ isChangingDate, setIsChangingDate ] = useState(false)

    const inputRef = useRef()

    useOnClickOutside(inputRef, () => {
        setIsChangingDate(false)
    })

    return (
        <Container>
            <Title>
                {text.due_date}
            </Title>
            <Content>
                <CheckBoxContainer>
                    
                </CheckBoxContainer>
                <DueDateContainer>
                    <AppDate 
                        value={dueDate}
                        format="dd mm"
                        month="short"
                    />
                    &nbsp;{text.at} {time}
                    { edited.completedAt && (
                        <CompletedLabel>
                            {text.complete}
                        </CompletedLabel>
                    )}
                    <Toggle onClick={() => setIsChangingDate(prev => !prev)}>
                        <FontAwesomeIcon icon="chevron-down"/>
                    </Toggle>
                    {isChangingDate && (
                        <DueDateInput 
                            dueDate={dueDate}
                            setDueDate={setDueDate}
                            customRef={inputRef}
                            closeHandler={() => setIsChangingDate(false)}
                        />
                    )}
                </DueDateContainer>
            </Content>
        </Container>
     )
};

export default DueDate;
