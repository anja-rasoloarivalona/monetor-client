import React, { useState, useRef } from "react"
import styled from "styled-components"
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome'
import { useOnClickOutside } from '../../../hooks'

const Container = styled.div`
    height: 4rem;
    position: relative;
    color: ${props => props.theme.text};
    width: max-content;
`

const CurrentValue = styled.div`
    width: max-content;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    svg {
        margin-left: 1rem;
        font-size: 1.4rem;
    }
`

const List = styled.ul`
    position: absolute;
    top: 100%;
    right: 0;
    min-width: 15rem;
    list-style: none;
    border: 1px solid ${props => props.theme.form.unfocused.border};
    background: red;
    z-index: 2;
`

const ListItem = styled.div`
    padding: 1rem;
    cursor: pointer;
`

const Select = props => {

    const { options, currentValue, onChange, displayValue  } = props

    const [ showList, setShowList ] = useState(false)

    const list = useRef()

    useOnClickOutside(list, () => setShowList(false))
    

    let displayedValue = null
    const currentOption = options.find(option => option.value === currentValue)
    if(currentOption){
        if(displayValue){
            displayedValue = currentOption.value
        } else {
            displayedValue = currentOption.label
        }
    }


    const selectHandler = optionValue => {
        onChange(optionValue)
        setShowList(false)
    }   

    return (
        <Container style={{...props.customContainerStyle}}>
            <CurrentValue
                onClick={() => setShowList(true)}
                style={{...props.customValueStyle}}
            >
                {displayedValue || "Select..."}
                <FontAwesomeIcon 
                    icon="chevron-down"
                />
            </CurrentValue>
            {showList && (
                <List ref={list}>
                    {options.map(option => (
                        <ListItem
                            key={option.value}
                            onClick={() => selectHandler(option.value)}
                        >
                            {option.label}
                        </ListItem>
                    ))}
                </List>
            )}
        </Container>
     )
};

export default Select;
