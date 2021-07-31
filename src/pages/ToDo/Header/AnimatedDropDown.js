import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button,ButtonLabel,ButtonContainer, ButtonIcon,ListContainer } from './style'

const Container = styled.div`
    position: relative;   
    transition: all .3s ease-in;

    ${props => {
        const { w, h, isDisplayed} = props
        if(isDisplayed){
            return {
                boxShadow: props.theme.boxShadow,
                "> .button__container": {
                    width: `${w}px`,
                    background: props.theme.onSurface,
                    borderBottomLeftRadius: "0px",
                    borderBottomRightRadius: "0px"
                },
                ".button": {
                    color: props.theme.text,
                    "&__label": {
                        opacity: 1,
                        transform: "translateX(3.5rem)"
                    }
                },
                ".list__container": {
                    width: `${w}px`,
                    height: `${h}px`,
                    boxShadow: props.theme.boxShadow
                },
                ".list": {
                    width: `${w}px`,
                },
                ".close": {
                    width: "2rem",
                    height: "2rem",
                    "&__icon": {
                        transform: "translateX(0)",
                    }
                }
            }
        } else {
            return {
                ".list__container": {
                    height: `${h}px`,
                },
                ".list": {
                    width: `${w}px`,
                }
            }
        }
    }}
`

const CloseIconContainer = styled.div`
    position: absolute;
    width: 0rem;
    height: 0rem;
    top: 1rem;
    right: 1rem;
    overflow: hidden;
    z-index: 4;
`

const CloseIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    top: 1rem;
    right: 1rem;
    z-index: 2;
    font-size: 1.2rem;
    cursor: pointer;
    transform: translateX(2rem);
    transition-delay: 2s;
    transition: all .3s ease-in;
`

const AnimtedDropDown = props => {
    const { id, sectionTitle, setDisplayed, isDisplayed } = props

    return (
        <Container {...props}>
            <ButtonContainer
                onClick={()=> setDisplayed(id)}
                className={`button__container ${isDisplayed ? "in" : "out"}`}
            >
                <Button className="button">
                    <ButtonIcon
                        className="button__icon"
                        onClick={sectionTitle.onClick ? sectionTitle.onClick : null}
                    >
                        <FontAwesomeIcon icon={sectionTitle.icon} />
                    </ButtonIcon>
                    <ButtonLabel className="button__label">
                        {sectionTitle.label}
                    </ButtonLabel>
                </Button>        
            </ButtonContainer>
            <CloseIconContainer className="close">
                <CloseIcon
                    className="close__icon"
                    onClick={() => setDisplayed(null)}
                >
                    <FontAwesomeIcon icon="times"/>
                </CloseIcon>
            </CloseIconContainer>
            <ListContainer className="list__container">
                {props.children}
            </ListContainer>

        </Container>
     )
};

export default AnimtedDropDown;
