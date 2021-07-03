import React from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 20rem;
    height: 100vh;
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
        if(props.isActive || props.isDisabled){
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
    }}
`

const ListItemIconContainer = styled.div`
    width: 5.5rem;
    height: 5.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: ${props => props.theme.onSurface};

    svg {
        color: ${props => props.theme.type === "dark" ? props.theme.text : props.theme.white};
        font-size: 1.8rem;
    }
`

const ListItemLabel = styled.div`
    color: ${props => props.theme.text};
    font-size: 1.6rem;
    margin: 1rem 0;
`

const ListItemBar = styled.div`
    width: .7rem;
    height: 6rem;
    background: ${props => props.theme.onSurface};
`

const Sidebar = props => {

    const {
        text: { text }
    } = useSelector(state => state)

    const { currentStep, steps } = props


    return (
        <Container>
            <List>
                {steps.map((step, index) => (
                    <ListItem
                        key={step.id}
                        isActive={currentStep === step.id}
                        isDisabled={step.isDisabled}
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
