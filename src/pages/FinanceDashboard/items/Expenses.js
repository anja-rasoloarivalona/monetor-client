import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Title } from './style'
import { useSelector } from 'react-redux'
import { Select } from '../../../components/Form/WithoutValidation'
import { Amount, AppDate } from '../../../components'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Doughnut } from "react-chartjs-2";
import { renderAmount } from '../../../functions'

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
`
const Header = styled.div`
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;

    > div:last-child {
        width: 50%;
        display: flex;
        justify-content: flex-end;
    }
`

const Body = styled.div`
    flex: 1;
    display: flex;
    align-items: center;

    > div:first-child {
        margin-right: 1rem;
    }
`

const BodySection = styled.div`
    width: 50%;
    height: 100%;

    ${props => {
        if(props.centered){
            return {
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }
        }
    }}
`


const List = styled.ul`
    list-style: none;
    margin-top: 3rem;
`

const ListItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;


    ${props => {
        return {
            ".label__icon": {
                background: props.category.color
            }
        }
    }}
`

const ListItemInfo = styled.div`
    display: flex;
    align-items: center;

`

const ListItemLabel = styled.div`
    display: flex;
    flex-direction: column;
`

const ListItemLabelText = styled.div`
    font-size: 1.4rem;
`


const ListItemIcon = styled.div`
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin-right: 1rem;

    svg {
        color: ${props => props.theme.surface};
    }
`

const ListItemAmount = styled.div`
    font-size: 1.4rem;
    height: 3rem;
    display: flex;
    align-items: flex-start;
`

const Chart = styled.div`
  width: 85%;
  height: 85%;
  position: relative;


  canvas {
    height: 100%;
  }
`;

const Total = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: -1;
    margin: auto;
    color: ${(props) => props.theme.text};
    border-radius: 50%;
    width: 8.5em;
    height: 8.5em;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
`;

const Expenses = () => {

    const {
        text: { text },
        user: { transactions },
        categories: { expense: reduxExpenses },
        settings: { locale, currency },
        theme,
        finance: { filters }
    } = useSelector(state => state)


    const [expensesData, setExpensesData] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [ period, setPeriod ] = useState("all")


    useEffect(() => {
        const expenses = transactions.filter(transaction => transaction.type === "expense")
        const data = {}
        expenses.forEach(transaction => {
            if(data[transaction.categoryId]){
                data[transaction.categoryId].amount += parseFloat(transaction.amount)
            } else {
                data[transaction.categoryId] = {
                    amount: parseFloat(transaction.amount),
                    category: transaction.category,
                    label: reduxExpenses[transaction.category.parentId].children[transaction.category.id].locale[locale].title
                }
            }
        })
        setExpensesData(data)
    },[transactions, locale])

    useEffect(() => {
        const datasets = {
            datasets: [
                {
                    data: [],
                    backgroundColor: [],
                    borderColor: theme.surface
                }
            ],
            labels: []
        }
        if(expensesData){
            Object.keys(expensesData).forEach(id => {
                const expense = expensesData[id]
                datasets.datasets[0].data.push(expense.amount)
                datasets.datasets[0].backgroundColor.push(expense.category.color)
                datasets.labels.push(expense.label)
            })
            setChartData(datasets)
        }

    },[expensesData])

    if(!chartData || !expensesData){
        return null
    }

    const options = {
        elements: {
          arc: {
            borderWidth: 4.5,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        cutoutPercentage: 60,
        legend: {
          display: false,
        },
        tooltips: {
          enabled: true,
          callbacks: {
            // title: function (tooltipItem, data) {
            //   return data.datasets[0].labels[tooltipItem.index];
            // },
            label: function (item, data) {
                return `${data.labels[item.index]}:  ${renderAmount(data.datasets[0].data[item.index], locale, currency.symbol)}`
            },
          },
        },
    };


    const getSelectOptions = () => {
        const res = []
        Object.keys(filters).forEach(period => {
            res.push({
                value: period,
                label: filters[period].label
            })
        })
        return res
    }

    const getTotal = () => {
        let total = 0
        Object.keys(expensesData).forEach(id => {
            const expense = expensesData[id]
            total += expense.amount
        })
        return total
    }

    return (
        <Container>
            <Header>
                <Title>{text.expenses}</Title>
                <Select 
                    options={getSelectOptions()}
                    currentValue={period}
                    onChange={setPeriod}
                    customValueStyle={{
                        padding: "0 1rem"
                    }}
                />
            </Header>
            <Body>
                <BodySection centered>
                    <Chart>
                        <Doughnut 
                            data={chartData}
                            options={options}
                        />
                        <Total>
                            <Amount value={getTotal()} />
                        </Total>
                    </Chart>
                </BodySection>
                <BodySection>
                    <List>
                        {Object.keys(expensesData).map(id => {
                            const expense = expensesData[id]
                            return (
                                <ListItem 
                                    key={expense.category.id}
                                    category={expense.category}
                                >
                                    <ListItemInfo>
                                        <ListItemIcon className="label__icon">
                                            <FontAwesomeIcon icon={expense.category.icon}/>
                                        </ListItemIcon>
                                        <ListItemLabel>
                                            <ListItemLabelText>
                                                {reduxExpenses[expense.category.parentId].children[expense.category.id].locale[locale].title}
                                            </ListItemLabelText>
                                        </ListItemLabel>
                                    </ListItemInfo>
                                    <ListItemAmount>
                                        <Amount value={parseFloat(expense.amount)}/>
                                    </ListItemAmount>
                                </ListItem>
                            )
                        })}
                    </List>
 
                </BodySection>
            </Body>
        </Container>
     )
};

export default Expenses;
