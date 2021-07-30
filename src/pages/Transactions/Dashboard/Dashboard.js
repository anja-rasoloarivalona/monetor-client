import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { layout as defaultLayout } from './defaultLayout.json'
import { useWindowSize } from '../../../hooks'
import { useSelector, useDispatch } from 'react-redux'
import GridLayout from 'react-grid-layout'
import "../../../../node_modules/react-grid-layout/css/styles.css"
import "../../../../node_modules/react-resizable/css/styles.css"
import Overview from './items/Overview'
import Expenses from './items/Expenses'
import Transactions from './items/Transactions'
import History from "./items/History"
import Wallet from "./items/Wallet"
import Balance from './items/Balance'
import MonthlyReport from './items/MonthlyReport'

const GridContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;

    .layout {
        width: 100%;
    }
`

const GridItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.theme.surface};
    border-radius: 1.5rem;
    box-shadow: ${props => props.theme.boxShadowLight};
    padding: 2rem;

    .react-resizable-handle.react-resizable-handle-se {
        bottom: 1rem !important;
        right: 1rem !important;
    }
`

const Dashboard = () => {

    const dispatch = useDispatch()
    const { windowWidth } = useWindowSize()

    const { 
        finance: { dashboard: { breakpoints, layout: userLayout } },
        user: { wallets }
    } = useSelector(state => state)

    const [layout, setLayout] = useState(null)

    const [config, setConfig] = useState(null)



    useEffect(() => {
        Object.keys(breakpoints).forEach(size => {
            if(windowWidth >= breakpoints[size].min && windowWidth <= breakpoints[size].max){
                setConfig({
                    breakpoint: size,
                    ...breakpoints[size]
                })
                return 
            }
        })
    }, [windowWidth])


    useEffect(() => {
        if(config){

            
            if(userLayout && userLayout[config.breakpoint]){

            } else {
                const initialLayout = defaultLayout[config.breakpoint]
                // if(wallets){
                //     wallets.forEach((wallet, index) => {
                //         const yData = (6 * (index + 1)) - 6
                //         initialLayout.push({
                //             w: breakpoints[config.breakpoint].wallet.size,
                //             x: breakpoints[config.breakpoint].wallet.x,
                //             y: yData,
                //             h: 4,
                //             i: `${wallet.id}-wallet`,
                //             display: true,
                //             Component: () => <Wallet wallet={wallet} />
                //         })
                //     })
                // }
                setLayout(initialLayout)
            }
        }
    },[config, wallets])




    const components = {
        "overview": Overview,
        "expenses": Expenses,
        "transactions": Transactions,
        "history": History,
        "balance": Balance,
        "monthly_report": MonthlyReport
    }


    if(!config || !layout){
        return <div></div>
    }


    const renderItem = item => {
        const Component = item.Component ? item.Component : components[item.i]
        return (
            <GridItem key={item.i}>
                <Component />
            </GridItem>
        )
    }

    const stopHandler = layout => {
        console.log({
            layout
        })
    }

    return (
        <GridContainer>
            <GridLayout
                className="layout"
                layout={layout}
                cols={config.cols}
                rowHeight={34}
                width={windowWidth - 250}
                margin={[15, 15]}
                isDraggable={true}
                isResizable={true}
                onDragStop={stopHandler}
                onResizeStop={stopHandler}
            >
                {layout.filter(i => i.display === true).map(renderItem)}
            </GridLayout>
        </GridContainer>
     )
};

export default Dashboard;
