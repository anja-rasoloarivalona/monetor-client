import React, { useState } from "react"
import styled from "styled-components"
import Sidebar from "./Sidebar";
import Currency from "./sections/Currency";
import Budget from "./sections/Budget";
import Wallet from "./sections/Wallet";
import { useSelector } from 'react-redux'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import axios from 'axios'

const Container = styled.div`
    width: calc( 100vw - 14rem);
    margin-left: 14rem;
    min-height: calc(100vh - 8rem);
    position: relative;
    padding-bottom: 3rem;
`
const SectionContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
`

const ArrowContainer = styled.div`
    position: absolute;
    top: 0;
    bottom: 30%;
    margin: auto;
    width: 6rem;
    height: 6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    background: ${props => props.theme.text};

    ${props => {
        if(props.left){
            return {
                "left": "10%"
            }
        } else {
            return {
                "right": "10%"
            }
        }
    }}

    svg {
        font-size: 3rem;
    }
`

const Setup = () => {

    
    const {
        text: { text },
        settings: { currency },
        user: { wallets, budgets }
    } = useSelector(state => state)

  

    const initialSteps = [
        {id: "currency", label: text.currency, icon: "money-bill", isEnabled: true},
        {id: "wallet", label: text.wallet, icon: "wallet", isEnabled: false},
        {id: "budget", label: text.budget, icon: "coins", isEnabled: false}
    ]

    const [ currentStep, setCurrentStep ] = useState("currency")
    const [ steps, setSteps ] = useState(initialSteps)
    const [ isSubmitting, setIsSubmitting ] = useState(false)


    const navigateHandler = direction => {
        const index = steps.findIndex(step => step.id === currentStep)
        if(direction === "prev"){
            if(index > 0){
                const prevSectionId = steps[index - 1].id
                setCurrentStep(prevSectionId)
            }
        }
        if(direction === "next"){
            const nextSection = steps[index + 1]
            if(nextSection){
                if(!nextSection.isEnabled){
                    const updatedSteps = []
                    steps.forEach(step => {
                        const updatedStep = {...step }
                        if(step.id === nextSection.id){
                            updatedStep.isEnabled = true
                        }
                        updatedSteps.push(updatedStep)
                    })
                    setSteps(updatedSteps)
                }
                setCurrentStep(nextSection.id)
            }
        }
    }

    const isNextSectionEnabled = () => {
        const index = steps.findIndex(step => step.id === currentStep)
        const nextSection = steps[index + 1]
        if(nextSection && nextSection.isEnabled){
            return true
        }
        return false
    }

    const enabelSectionHandler = sectionId => {
        const updatedSteps = []
        steps.forEach(step => {
            const updatedStep = {...step }
            if(step.id === sectionId){
                updatedStep.isEnabled = true
            }
            updatedSteps.push(updatedStep)
        })
        setSteps(updatedSteps)
    }

    const submitSetupHandler = async () => {
        try {
            setIsSubmitting(true)
            const data = {
                currency: JSON.stringify(currency),
                assets: wallets,
                budgets
            }
            const res = await axios.post("/setup/init", data)
            console.log({
                res
            })
        } catch(err){
            console.log({
                err
            })
            setIsSubmitting(false)
        }
    }


    return (
        <Container>
            <Sidebar
                currentStep={currentStep}
                steps={steps}
            />
            <SectionContainer>
                {currentStep === "currency" && (
                    <Currency 
                        navigateHandler={navigateHandler}
                    />
                )}
                {currentStep === "wallet" && (
                    <Wallet 
                        navigateHandler={navigateHandler}
                        enabelSectionHandler={enabelSectionHandler}
                    />
                )}
                {currentStep === "budget" && (
                    <Budget 
                        submitSetupHandler={submitSetupHandler}
                    />
                )}

                {currentStep !== "currency" && (
                    <ArrowContainer
                        left
                        onClick={() => navigateHandler("prev")}
                    >
                        <FontAwesomeIcon icon="chevron-left"/>
                    </ArrowContainer>
                )}
                {isNextSectionEnabled() && (
                    <ArrowContainer
                        onClick={() => navigateHandler("next")}
                    >
                        <FontAwesomeIcon icon="chevron-right"/>
                    </ArrowContainer>
                )}


       
            </SectionContainer>
        </Container>
     )
};

export default Setup;
