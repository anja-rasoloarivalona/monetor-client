import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { AppDate, Amount } from '../../../components'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useOnClickOutside } from '../../../hooks'

const config = [10, 25, 20, 30, 15]
const backgrounds = ["red","blue", "orange", "green", "salmon"]


const Container = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`

const Table = styled.div`
    display: flex;
    flex-direction: column;
    background: ${props => props.theme.surface};
    width: 100%;
`

const TableHeader = styled.div`
    display: flex;
    align-items: center;
    padding: 0 5rem;
    font-size: 1.2rem;
    background: ${props => props.theme.onSurface};
    border-radius: .5rem;
`

const TableHeaderItem = styled.div`
    width: ${props =>  config[props.index]}%;
    // background: ${props => backgrounds[props.index]};
    height: 5rem;
    display: flex;
    align-items: center;
`

const TableBody = styled.div`
    display: flex;
    flex-direction: column;
`

const TableBodyRow = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    height: 5rem;
    font-size: 1.4rem;
    padding: 0 5rem;
    cursor: pointer;
    position: relative;
    :hover {
        background: ${props => props.theme.background};
    }
    ${props => {
        if(props.isOdd){
            return {
                background: "#fbfbfb"
            }
        }
    }}
`

const TableBodyRowItem = styled.div`
    width: ${props =>  config[props.index]}%;
    // background: ${props => backgrounds[props.index]};
`
const TableBodyRowItemLabel = styled.div``

const TableAmount = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
`


const TableBodyRowCtaIcon = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    right: 1rem;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    svg {
        color: ${props => props.theme.textLight};
    }

    :hover {
        background: ${props => props.theme.surface};
    }
`


const CtaList = styled.div`
    position: absolute;
    top: 4rem;
    right: 0;
    z-index: 3;
    width: 20rem;
    background: ${props => props.theme.surface};
    box-shadow: ${props => props.theme.boxShadow};
`

const CtaListItem = styled.div`
    padding: 1.5rem 1rem;
    cursor: pointer;
    :hover {
        background: ${props => props.theme.background};
    }
`

const View = props => {


    const { data, setData} = props


    const [ showCta, setShowCta ] = useState(null)

    const listRef= useRef()

    useOnClickOutside(listRef, () => toggleListHandler())


    const {
        settings: { locale },
        text: { text },
        categories
    } = useSelector(s => s)


    const displayedColumns = {
        date: {
            component: value => <AppDate value={value} format="dd mm" month="short" />,
            index: 0,
            label: text.date
        },
        category: {
            component: category => {
                let categoryLabel = ""
                if(category.categoryType === "income"){
                    categoryLabel = categories.income.children[category.id].locale[locale].title
                } else {
                    categoryLabel = categories.expense[category.parentId].children[category.id].locale[locale].title
                }
                return (
                    <TableBodyRowItemLabel>{categoryLabel}</TableBodyRowItemLabel>
                )
            },
            index: 1,
            label: text.category
        },
        type: {
            component: text => <TableBodyRowItemLabel>{text}</TableBodyRowItemLabel>,
            index: 2,
            label: text.type
        },
        counterparty: {
            component: text => <TableBodyRowItemLabel>{text}</TableBodyRowItemLabel>,
            index: 3,
            label: text.counterparty
        },
        amount: {
            component: value => (
                <TableAmount>
                    <Amount value={value}/>
                </TableAmount>
                    
            ),
            index: 4,
            label: <TableAmount>{text.amount}</TableAmount>
        }
    }


    const toggleListHandler = id => {
        if(id){
            setShowCta(id)
        } else {
            setShowCta(null)
        }
    }

    return (
        <Container>
            <Table>
                <TableHeader>
                    {Object.keys(displayedColumns).map((column, index) => (
                        <TableHeaderItem key={index} index={index}>
                            {displayedColumns[column].label}
                        </TableHeaderItem>

                    ))}
                </TableHeader>
                <TableBody>
                    {data
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .map((transaction, index) => (
                        <TableBodyRow
                            key={index}
                            isOdd={index % 2}
                        >
                            {Object.keys(transaction)
                                .filter(key => displayedColumns[key])
                                .sort((a, b) => displayedColumns[a].index - displayedColumns[b].index )
                                .map((key, itemIndex) => (
                                    <TableBodyRowItem key={itemIndex} index={displayedColumns[key].index}>
                                        {displayedColumns[key].component(transaction[key])}
                                    </TableBodyRowItem >
                            ))}
                            <TableBodyRowCtaIcon onClick={() => toggleListHandler(transaction.id)}>
                                <FontAwesomeIcon icon="ellipsis-h"/>
                            </TableBodyRowCtaIcon>
                            {showCta === transaction.id && (
                                <CtaList ref={listRef}>
                                    <CtaListItem>
                                        {text.edit}
                                    </CtaListItem>
                                    <CtaListItem>
                                        {text.delete}
                                    </CtaListItem>
                                </CtaList>
                            )}
                        </TableBodyRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
     )
};

export default View;
