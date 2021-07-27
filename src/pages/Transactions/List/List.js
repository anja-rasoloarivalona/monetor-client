import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import Header from './Header'
import View from './View'
import { useSelector } from 'react-redux'
import { formatDate } from '../../../functions'

const Container = styled.div`
    width: 100%;
    min-height: calc(100vh - 6.5rem);
    background: ${props => props.theme.surface};
    border-left: 1px solid ${props => props.theme.form.unfocused.border};
    display: flex;
    justify-content: center;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 100rem;
    width: 100%;
`

const List = () => {


    const {
        settings: { locale },
        text: { text },
        user: { transactions },
        categories
    } = useSelector(s => s)


    const [ search, setSearch ] = useState("")
    const [ data, setData] = useState(null)


    useEffect(() => {
        setData(transactions)
    },[transactions])


    useEffect(() => {
        if(search !== ""){
            searchHandler()
        } else {
            setData(transactions)
        }
    },[search])

    const searchHandler = () => {
        const res = []
        const lookupKeys = {
            amount: value => value.toString(),
            date: value => formatDate(new Date(value), "dd mm yyyy", locale, "long"),
            category: category => {
                if(category.categoryType === "income"){
                    return categories.income.children[category.id].locale[locale].title
                } else {
                    return categories.expense[category.parentId].children[category.id].locale[locale].title
                }
            },
            type: value => value.toLowerCase(),
            counterpary: value => value.toLowerCase() 
        }

        transactions.forEach(transaction => {
            let rawData = ""
            Object.keys(transaction).forEach(key => {
                if(lookupKeys[key]){
                    rawData += ` ${lookupKeys[key](transaction[key])}`
                }
            })

            const searchTerms = search.split(" ")
            let isValid = true
            searchTerms.forEach(term => {
                if(!rawData.toLocaleLowerCase().includes(term.toLocaleLowerCase())){
                    isValid = false
                }
            })

            if(isValid){
                res.push(transaction)
            }

      
        })
        setData(res)
    }


    if(!data){
        return null
    }

    return (
        <Container>
            <Content>
                <Header 
                    search={search}
                    setSearch={setSearch}
                />
                <View 
                    data={data}
                    setData={setData}
                />
            </Content>
        </Container>
     )
};

export default List;
