/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome'
import { useOnClickOutside, useWindowSize } from '../../../hooks'
import { ScrollBar } from '../../../components'
import Input from './Input'

const Container = styled.div`
    height: 4.5rem;
    position: relative;
    color: ${props => props.theme.text};
    width: max-content; 

    input {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        border: 1px solid ${props => props.theme.form.focused.border};
        font-size: 1.4rem;
    }

    ${props => {
        if(props.showList && !props.isSearchable){
            return {
                ".current": {
                    border: `1px solid ${ props.theme.form.focused.border}`,
                }
            }
        }
    }}

    ${props => {
        if(props.showList && props.isSearchable){
            return {
                ".current": {
                    border: "none"
                },
                input: {
                    zIndex: 2,
                }
            }
        }
    }}
`

const CurrentValue = styled.div`
    width: max-content;
    height: 4.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    font-size: 1.4rem;
    color: ${props => props.theme.textLight};
    border: 1px solid ${props => props.theme.form.unfocused.border};
    border-radius: .5rem;
    background: ${props => props.theme.surface};
    padding: 0 1.2rem;
    position: relative;

    svg {
        margin-left: 1rem;
        font-size: 1.4rem;
    }
`


const CurrentValueIcon = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    right: 1.2rem;
    z-index: 3;
    display: flex;
    align-items: center;
`

const List = styled(ScrollBar)`
    position: absolute;
    top: 100%;
    right: 0;
    width: 100%;
    min-width: 15rem;
    border: 1px solid ${props => props.theme.form.focused.border};
    background: ${props => props.theme.background};
    z-index: 4;
    top: calc(100% + .7rem);
    border-radius: .5rem;


    ${props => {
        if(props.theme.type === "light"){
            return {
                background: props.theme.surface,
                boxShadow: "0 0 0 1px hsl(0deg 0% 0% / 10%), 0 4px 11px hsl(0deg 0% 0% / 10%)",
                border: "none",
            }
        }
    }}
`

const ListItem = styled.div`
    padding: 1rem 2rem;
    padding-left: 1.2rem;
    cursor: pointer;
    font-size: 1.4rem;

    :hover {
        background: ${props => props.theme.textLight};
        color: ${props => props.theme.background};
    }

    ${props => {
        if(props.theme.type === "light"){
            return {
                ":hover": {
                    background: props.theme.onSurface,
                    color: props.theme.text
                }

            }
        }
    }}
`

const Select = props => {

    const { options: _options, currentValue, onChange, displayValue, isSearchable  } = props

    let displayedValue = null
    const currentOption = _options.find(option => option.value === currentValue)
    if(currentOption){
        if(displayValue){
            displayedValue = currentOption.value
        } else {
            displayedValue = currentOption.label
        }
    }


    const [ showList, setShowList ] = useState(false)
    const [ search, setSearch ] = useState(displayedValue)
    const [ options, setOptions ] = useState(_options)

    const { windowHeight } = useWindowSize()

    const container = useRef()
    const list = useRef()
    useOnClickOutside(container, () => toggleListHandler(false))
    
    const selectHandler = optionValue => {
        onChange(optionValue)
        toggleListHandler(false)
    }   

    const toggleListHandler = value => {
        if(value && !showList){
            setShowList(true)
        } else {
            setShowList(false)
            setSearch(displayedValue)
            setOptions(_options)
        }
    }


    useEffect(() => {
        if(list.current && container.current){
            const listFromTop = 65 + container.current.offsetTop + list.current.offsetTop
            const maxListHeight = windowHeight - listFromTop - 100
            list.current.style.maxHeight = `${maxListHeight}px`
        }
    },[list, container, showList, windowHeight ])


    useEffect(() => {
        if(showList && isSearchable){
            if(search !== "" && search !== displayedValue){
                const updatedOptions = options.filter(option => {
                    if(option.label.toLowerCase().includes(search.toLowerCase())){
                        return true
                    }
                    return false
                })
                setOptions(updatedOptions)
            } else {
                setOptions(_options)
            }
        }
    },[search])

    return (
        <Container
            showList={showList}
            isSearchable={isSearchable}
            style={{...props.customContainerStyle}}
            ref={container}
        >
            <CurrentValue
                onClick={() => toggleListHandler(true)}
                style={{...props.customValueStyle}}
                customContainerStyle={props.customContainerStyle}
                className="current"
            >
                {displayedValue || "Select..."}
                <CurrentValueIcon>
                    <FontAwesomeIcon icon="chevron-down" />
                </CurrentValueIcon>
            </CurrentValue>

            {showList && isSearchable && (
                <Input 
                    value={search}
                    onChange={setSearch}
                    focusOnMount
                />
            )}

            {showList && (
                <List
                    style={{...props.customListStyle}}
                    ref={list}
                >
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
