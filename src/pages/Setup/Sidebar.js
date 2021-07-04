import React from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Container = styled.div`
    position: fixed;
    top: 8rem;
    left: 0;
    width: 14rem;
    height: calc(100vh - 8rem);
    z-index: 10;
    background: ${props => props.theme.surface};
    border-right: 1px solid ${props => props.theme.onSurface};
    padding-top: 10rem;
`

const List = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const ListItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    ${props => {
        if(!props.isEnabled){
            return {
                cursor: "not-allowed"
            }
        }
    }}


    ${props => {

        const { isActive, isEnabled, index, currentIndex } = props

        const isHighilighted = isEnabled && index <= currentIndex

        if(isActive || isHighilighted){
            return {
                ".icon-container": {
                    background: props.theme.primary,
                    "svg": {
                        color: props.theme.type === "dark" ? props.theme.textActive : props.theme.white
                    }
                },
                ".label": {
                    color: props.theme.textActive
                },
                ".bar": {
                    background: props.theme.primary
                }
            }
        }
        if(isEnabled && index > currentIndex){
            return {
                ".icon-container": {
                    background: props.theme.secondary,
                    "svg": {
                        color: props.theme.type === "dark" ? props.theme.textActive : props.theme.white
                    }
                },
                ".label": {
                    color: props.theme.textActive
                },
                ".bar": {
                    background: props.theme.secondary
                }
            }
        }
    }}
`

const ListItemIconContainer = styled.div`
    width: 5.5rem;
    height: 5.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: ${props => props.theme.background};

    svg {
        color: ${props => props.theme.type === "dark" ? props.theme.text : props.theme.grey};
        font-size: 1.8rem;
    }
`

const ListItemLabel = styled.div`
    color: ${props => props.theme.type === "dark" ? props.theme.text : props.theme.grey};
    font-size: 1.6rem;
    margin: 1rem 0;
`

const ListItemBar = styled.div`
    width: .7rem;
    height: 6rem;
    background: ${props => props.theme.background};
`

const Sidebar = props => {

    const {
        text: { text }
    } = useSelector(state => state)

    const { currentStep, steps } = props

    console.log({
        steps
    })

    const currentIndex = steps.findIndex(step => step.id === currentStep )


    return (
        <Container>
            <List>
                {steps.map((step, index) => (
                    <ListItem
                        key={step.id}
                        isActive={currentStep === step.id}
                        isEnabled={step.isEnabled}
                        index={index}
                        currentIndex={currentIndex}
                    >
                        {index !== 0 && (
                            <ListItemBar className="bar"/>
                        )}
                        <ListItemIconContainer className="icon-container">
                            <FontAwesomeIcon icon={step.icon}/>
                        </ListItemIconContainer>
                        <ListItemLabel className="label">
                            {step.label}
                        </ListItemLabel>

                    </ListItem>
                ))}
            </List>
        </Container>
     )
};

export default Sidebar;
