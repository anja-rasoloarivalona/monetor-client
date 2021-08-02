import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useOnClickOutside } from '../../hooks'
import Icon from '../../icons'

const Container = styled.div`
    position: relative;

    ${props => {
        const isLabelFloating = props.label.text && props.label.floating
        if(isLabelFloating){
            return {
                width: "3.5rem",
                transition: "all .3s ease-in",
                ".list": {
                    top: "100%",
                    borderTopLeftRadius: "0px",
                    borderTopRightRadius: "0px",
                    transitionDelay: ".3s",
                }
            }
        } else {
            return {
                ".list": {
                    transitionDelay: "0s",
                }
            }
        }
    }}

    ${props => {
        const isLabelFloating = props.label.text && props.label.floating
        const { w, h } = props.config
        if(props.showList){
            if(isLabelFloating){
                return {
                    width: `${w}px`,
                    ".label": {
                        boxShadow: props.theme.boxShadow,
                        width: isLabelFloating ? `${w}px` : "3.5rem",
                        justifyContent: "flex-start",
                        padding: "0 1rem",
                        borderBottomRightRadius: 0,
                        borderBottomLeftRadius: 0,
                        "&__text": {
                            opacity: `${1} !important`,
                        }
                    },
                    '.list': {
                        width: `${w}px`,
                        height: `${h}px`,
                        opacity: 1,
                        boxShadow: props.theme.boxShadow
                    },
                    ".close": {
                        width: "max-content",
                        opacity: 1,
                    }
                }
            } else {
                return {
                    width: "initial",
                    ".label": {
                        boxShadow: props.theme.boxShadow,
                        "&__text": {
                            opacity: `${1} !important`,
                        }
                    },
                    '.list': {
                        width: `${w}px`,
                        height: `${h}px`,
                        opacity: 1,
                        boxShadow: props.theme.boxShadow
                    },
                }
            }
 
        }
    }}


`
const Label = styled.div`
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.theme.onSurface};
    color: ${props => props.theme.textLight};
    fill: ${props => props.theme.textLight};
    cursor: pointer;
    transition: width .3s ease-in;
    position: relative;
    border-radius: .5rem;
    :hover {
        box-shadow: ${props => props.theme.boxShadow};
    }
    ${props => {
        if(props.label.text){
            if(props.label.floating){
                return {
                    width: "3.5rem",
                    overflowX: "hidden",
                    ".label__text": {
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        opacity: 0,
                        left: "4.5rem",
                        margin: "auto",
                        zIndex: 1,
                        width: 'max-content',
                        display: "flex",
                        alignItems: "center",
                    }
                }
            } else {
                return {
                    padding: "0 1.5rem",
                    ".label__icon": {
                        width: "unset"
                    }
                }
            }
        }
    }}
`

const LabelIcon = styled.div`
    width: 3.5rem;
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        font-size: 1.4rem;
        width: 2.2rem;
        height: 2.2rem;
    }
`

const LabelText = styled.div`
    font-size: 1.4rem;
    margin-left: 1rem;

    &.show {
        transition: none;
    }

    &.hide {
        transition: all .3s ease-in;
    }
`

const List = styled.div`
    height: 0;
    background: ${props => props.theme.surface};
    position: absolute;
    top: calc(100% + 1rem);
    right: 0;
    opacity: 0;
    border-radius: .5rem;
    z-index: 1;
    transition: all .3s ease-in;
    overflow: hidden;

    &.hide {
        transition: all 0s ease-in !important;
        transition-delay: 0s !important;
    }
`

const ListContent = styled.div`
    width: 100%;
    height: max-content;
`

const CloseButton = styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 2;
    cursor: pointer;
    transition: all .3s ease-in;
    transition-delay: .5s;
    width: 0;
    overflow: hidden;
    opacity: 0;

    svg {
        font-size: 1.2rem;
    }

    &.hide {
        transition: all 0s ease-in !important;
        transition-delay: 0s !important;
    }
`

const CustomDropdown = props => {

    const { label } = props
    const [ showList, setShowList ] = useState(false)
    const container = useRef()

    useOnClickOutside(container, () => toggleHandler(false, "outside"))

    const toggleHandler = (value, from) => {
        if(!props.setShowList){
            setShowList(value)
        } else {
            if(from !== "outside"){
                props.setShowList(value ? props.id : null)
            }
        }
    }

    const showListValue = props.setShowList ? props.showList === props.id : showList

    return (
        <Container
            {...props}
            showList={showListValue}
            ref={container}
            className="container"
        >
            <Label
                label={label}
                className={`label ${showListValue ? "show" : "hide"}`}
                onClick={() => toggleHandler(true)}
            >
                <LabelIcon onClick={props.label.onClick || null} className="label__icon">
                    {label.icon ?
                        <FontAwesomeIcon icon={label.icon}/>
                            :
                        <Icon id={label.iconId}/>
                    }
                </LabelIcon>
   
                <LabelText className="label__text">{label.text}</LabelText>
            </Label>
            <CloseButton
                className={`close ${showListValue ? "show" : "hide"}`}
                onClick={() => toggleHandler(false)}
            >
                <FontAwesomeIcon icon="times"/>
            </CloseButton>
            <List className={`list ${showListValue ? "show" : "hide"}`}>
                <ListContent>
                    {props.children}
                </ListContent>
            </List>
        </Container>
     )
};

export default CustomDropdown;
