import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { useOnClickOutside } from '../../../hooks'
import { ListItemInput, ListItemCta,ListItemCtaSection,ListItemCheckboxContainer, ListItemCheckbox  } from './CheckListStyle'
import { Button, AppDate } from '../../../components'
import { Input } from '../../../components/Form/WithoutValidation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DateInput from './DateInput'

const Container = styled.div`
    grid-column: 2 / 3;
    grid-row: 1 / -1;
    position: relative;


    input {
        height: 4rem;
    }
`

const DueDate = styled.div`
    color: ${props => props.themetextLight};
    position: relative;

    :hover {
        color: ${props => props.theme.text};
    };
    svg {
        margin-right: 1rem;
    }

    ${props => {
        if(props.isAbsolute){
            return {
                position: "absolute",
                top: "0",
                bottom: "0",
                margin: "auto",
                right: "1rem",
                display: "flex",
                alignItems: "center"
            }
        }
    }}
`

const DueDateLabel = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 1.4rem;
`


const CheckListInput = props => {

    const { title, setTitle, text, cancelHandler, submitHandler, currentCheckList, onChangeDueDateHandler, dueDate, customRef, customStyle, checkList } = props

    const inputRef = useRef()
    const container = useRef()
    const dateRef = useRef()

    useEffect(() => {
        inputRef.current.focus()
    },[])

    const [ isAddingDueDate, setIsAddingDueDate ] = useState(false)


    useOnClickOutside(container, () =>  cancelHandler())

    const renderDueDate = isAbsolute => {
        return (
            <DueDate isAbsolute={isAbsolute}>
                <DueDateLabel
                    onClick={() => setIsAddingDueDate(prev => !prev)}
                >
                    <FontAwesomeIcon icon="clock"/>
                    {isAbsolute ?
                        <AppDate 
                            value={currentCheckList.dueDate}
                            format="mm dd"
                            month="short"
                        /> 
                        : text.due_date}
                </DueDateLabel>
                {isAddingDueDate && (
                    <DateInput 
                        currentDate={dueDate ? dueDate : currentCheckList.dueDate} 
                        setCurrentDate={val => onChangeDueDateHandler(val)}
                        customRef={dateRef}
                        closeHandler={() => setIsAddingDueDate(false)}
                        formTitle={text.change_due_date}
                    />
                )}

            </DueDate>
        )
    }


    return (
        <Container
            ref={customRef ? customRef : container}
            style={{...customStyle}}
        >
            <ListItemInput checkList={checkList}>
                {currentCheckList && currentCheckList.dueDate && renderDueDate(true)}
                <Input 
                    customRef={inputRef}
                    value={title}
                    onChange={setTitle}
                />
            </ListItemInput>

            <ListItemCta  checkList={checkList}>
                <ListItemCtaSection>
                    <Button
                        small
                        onClick={submitHandler}
                    >
                        {text.save}
                    </Button>
                    <Button
                        small
                        transparent
                        onClick={cancelHandler}
                    >
                        {text.cancel}
                    </Button>
                </ListItemCtaSection>
                <ListItemCtaSection>
                    {(!currentCheckList  || !currentCheckList.dueDate ) && renderDueDate()}
                </ListItemCtaSection>
                </ListItemCta>         
        </Container>
     )
};

export default CheckListInput;
