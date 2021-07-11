import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Container, Title, SubTitle } from './components'
import { useSelector, useDispatch } from 'react-redux'
import { Form, formProps, Button, Amount } from '../../../components'
import * as actions from '../../../store/actions'

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
`

const FormContainer = styled.div`
    margin-top: 3rem;
    width: 35rem;

`

const BudgetList = styled.div`
    width: 50%;
    max-width: 35rem;
    margin-left: 8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${props => props.theme.text};

    > div {
        margin-bottom: 2rem;
    }
`

const BudgetListSection = styled.div`
    width: 100%;
`

const BudgetListSectionTitle = styled.div`
    font-size: 2rem;
    margin-bottom: 2rem;
`
const BudgetListSectionList = styled.div`

`

const BudgetListSectionListItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.4rem;
`

const BudgetListSectionListItemLabel = styled.div``

const BudgetListSectionListItemValue = styled.div`
    display: flex;
    align-items: center;
`


const Budget = props => {

    const dispatch = useDispatch()

    const {submitSetupHandler } = props

    const {
        user: { budgets },
        text: { text },
        settings: { currency, locale},
        data: { frequencies }
    } = useSelector(state => state)

    const initialInputs = [
        {
            id: "category",
            input_type: "category",
            name: "category",
            label: text.category,
            placeholder: text.category,
            required: true,
            type: "object",
        },
        {
            id: "amount",
            input_type: "input",
            type: "number",
            placeholder: text.amount,
            label: text.amount,
            name: "amount",
            unit: currency ? currency.symbol : null,
            required: true
        },
        {
            id: "type",
            input_type: "select",
            type: "text",
            placeholder: text.type,
            label: text.type,
            name: "type",
            required: true,
            options: [
                {label: text.variable, value: "variable"},
                {label: text.fixed, value: "fixed"}
            ]
        },
        {
            id: "frequency",
            input_type: "select",
            type: "text",
            placeholder: text.frequency,
            label: text.frequency,
            name: "frequency",
            required: true,
            options: [
                // {label: text.per_day, value: "per_day"},
                {label: text.per_week, value: "per_week"},
                {label: text.per_month, value: "per_month"},
                {label: text.per_year, value: "per_year"},
            ]
        },
        {
            id: "lastPaiementDate",
            input_type: "date",
            type: "date",
            placeholder: text.last_date_of_payment,
            label: text.last_date_of_payment,
            name: "lastPaiementDate",
            required: true
        },
        {
            id: "periodStart",
            input_type: "date",
            type: "date",
            placeholder: text.period_start,
            label: text.period_start,
            name: "periodStart",
            required: true
        }
    ]


    const [inputs, setInputs ] = useState([initialInputs[0]])
    const [values, getValues] = useState(null)

    useEffect(() => {
        if(values){
 
            if(values.category){

                let displayedInputsIds = []
                const isIncome = values.category.type === "income"
                const hasType = typeof values.type === "string"
                const isTypeFixed = values.type === "fixed"

                if(isIncome){
                    displayedInputsIds = ["category", "amount", "frequency", "periodStart"]
                } else {

                    if(hasType){
                        if(isTypeFixed){
                            displayedInputsIds = ["category", "type", "frequency", "amount", "lastPaiementDate"]
                        } else {
                            displayedInputsIds = ["category", "type", "frequency", "amount"]
                        }   
                    } else {
                        displayedInputsIds = ["category", "type"]
                    }
                }
                const updatedInputs = []
                displayedInputsIds.forEach(inputId => {
                    const currentInput = initialInputs.find(input => input.id === inputId)
                    updatedInputs.push(currentInput)  
                })
                console.log({
                    updatedInputs
                })
                setInputs(updatedInputs)
            }
        }
    },[values])

    const addBugetHandler = data => {
        console.log({
            data
        })
        const budget = {
            ...data,
            id: data.category.id 
        }
        dispatch(actions.addBudget(budget))
        formProps.resetForm()
    }


    const renderBudgetList = () => {

        const sections = {
            incomesBudget: [],
            expensesBudget: []
        }
        
        budgets.forEach(budget => {
            if(budget.type === "income"){
                sections.incomesBudget.push(budget)
            } else {
                sections.expensesBudget.push(budget)
            }
        })

        return (
            <BudgetList>
                {Object.keys(sections).map(sectionName => {
                    if(sections[sectionName].length > 0){
                        const isIncome = sections[sectionName][0].type === "income"
                        return (
                            <BudgetListSection>
                                <BudgetListSectionTitle>
                                    {isIncome ? text.incomes : text.expenses}
                                </BudgetListSectionTitle>
                                <BudgetListSectionList>
                                    {sections[sectionName].map(budget => (
                                        <BudgetListSectionListItem>
                                            <BudgetListSectionListItemLabel>
                                                {budget.category.locale[locale].title}
                                            </BudgetListSectionListItemLabel>
                                            <BudgetListSectionListItemValue>
                                                <Amount value={budget.amount}/>/{frequencies[budget.frequency].unit[locale]}
                                            </BudgetListSectionListItemValue>
                                        </BudgetListSectionListItem>
                                    ))}
                                </BudgetListSectionList>
                            </BudgetListSection>
                        )
                    }
                    return null
                })}
            </BudgetList>
        )
    }

    return (
        <Container>
            <Content>
                <Title>{text.budget}</Title>
                <SubTitle>
                    {text.budget_text}
                </SubTitle>
                    <FormContainer>
                        <Form 
                            inputs={inputs}
                            submitHandler={addBugetHandler}
                            buttonLabel={text.add}
                            getValues={val => getValues(val)}
                            secondaryLabel={text.skip}
                            onClickSecondary={submitSetupHandler}
                            secondaryButtonStyle={{
                                order: 2
                            }}
                        />
                    </FormContainer>
            </Content>
            {budgets && budgets.length > 0 && renderBudgetList()}
        </Container>
     )
};

export default Budget;
