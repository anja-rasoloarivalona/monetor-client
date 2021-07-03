import React, { useState } from "react"
import styled from "styled-components"
import Sidebar from "./Sidebar";
import Currency from "./sections/Currency";
import Wallet from "./sections/Wallet";
import { useSelector } from 'react-redux'

const Container = styled.div`
    width: 100vw;
    padding-left: 20rem;
    min-height: calc(100vh - 8rem);
`
const SectionContainer = styled.div`
    width: 100%;
    height: 100%;
`

const Setup = () => {

    
    const {
        text: { text }
    } = useSelector(state => state)

  

    const initialSteps = [
        {id: "currency", label: text.currency, icon: "money-bill", isDisabled: true},
        {id: "wallet", label: text.wallet, icon: "wallet", isDisabled: false},
        {id: "budget", label: text.budget, icon: "coins", isDisabled: false}
    ]

    const [ currentStep, setCurrentStep ] = useState("currency")
    const [ steps, setSteps ] = useState(initialSteps)

    const [ selectedCurrency, setSelectedCurrency ] = useState(null)

    const changeSectionHandler = sectionId => {
        const updatedSteps = []
        initialSteps.forEach(step => {
            const updatedStep = {...step }
            if(step.id === sectionId){
                updatedStep.isDisabled = true
            }
            updatedSteps.push(updatedStep)
        })
        setSteps(updatedSteps)
        setCurrentStep(sectionId)
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
                        selectedCurrency={selectedCurrency}
                        setSelectedCurrency={setSelectedCurrency}
                        changeSectionHandler={changeSectionHandler}
                    />
                )}
                {currentStep === "wallet" && (
                    <Wallet 
                        changeSectionHandler={changeSectionHandler}
                    />
                )}
       
            </SectionContainer>
        </Container>
     )
};

export default Setup;
