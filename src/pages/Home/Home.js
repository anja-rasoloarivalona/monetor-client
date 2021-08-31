/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { layout as defaultLayout } from './defaultLayout.json'
import { useWindowSize } from '../../hooks'
import { useSelector } from 'react-redux'
import GridLayout from 'react-grid-layout'
import "../../../node_modules/react-grid-layout/css/styles.css"
import "../../../node_modules/react-resizable/css/styles.css"
import Header from './Header/Header'
import WeatherDashboardItem from "./items/Weather/WeatherDashboardItem"
import WeatherFullView from './items/Weather/Weather'
import RecentNotes from './items/RecentNotes/RecentNotes'
import TodayTasks from './items/TodayTasks/TodayTasks'


import AppSelector from "./items/AppSelector/AppSelector"
import Calendar from "./items/Calendar/Calendar"
import Balance from '../Transactions/Dashboard/items/Balance'
import LastTransactions from '../Transactions/Dashboard/items/Transactions'
import MonthlyReport from '../Transactions/Dashboard/items/MonthlyReport'
import Notes from '../../elements/Notes/Notes'
import {ScrollBar } from '../../components'
import axios from 'axios'

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    z-index: 2;
    overflow-x: hidden;
    height: calc(100vh - 6.5rem);
    background: ${props => props.theme.backgroundImage ? "none" : props.theme.background};
`

const GridContainer = styled(ScrollBar)`
    flex: 1;
    height: calc(100vh - 12.5rem);
    display: flex;
    
    &::-webkit-scrollbar {
        display: none;
    }
    .layout {
        width: 100%;
    }
`

const GridItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    ${props => {
        if(props.id !== "calendar"){
            return {
                padding: "2rem",
                boxShadow: props.theme.boxShadowLight,
                borderRadius: "1rem",
                background: props.theme.surface
            }
        } 
    }}

    ${props => {
        if(props.id === "weather" || props.id === "today_tasks"){
            return {
                padding: "0rem"
            }
        }
    }}

    ${props => {
        if(props.id === "notes"){
            return {
                padding: "1rem"
            }
        }
    }}

    ${props => {
        if(props.isViewingWeather && props.id !== "weather"){
            return {
                opacity: 0
            }
        }
    }}

    .react-resizable-handle.react-resizable-handle-se {
        bottom: 1rem !important;
        right: 1rem !important;
    }

    ${props => {
        if(props.isManagingDashboard){
            return {
                '.react-resizable-handle.react-resizable-handle-se': {
                    zIndex: 11
                }
            }
        }
    }}
`

const GridItemLayer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    cursor: move;
`

const Home = () => {

    const { windowWidth } = useWindowSize()

    const weatherRef = useRef()

    const {
        dashboards: {
            breakpoints,
            main: {
                layout: userLayout
            }
        },
        notes
    } = useSelector(state => state)

    const [ layout, setLayout ] = useState(null)
    const [ originalLayout, setOriginalLayout ] = useState(null)

    const [ config, setConfig ] = useState(null)
    const [ isManagingDashboard, setIsManaginDashboard ] = useState(false)
    const [ isSavingDashboardChanges, setIsSavingDashboardboardChanges ] = useState(false)
    const [ isUserLayout, setIsUserLayout ] = useState(false)
    const [ isViewingWeather, setIsViewingWeather ] = useState(false)

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
                setLayout(userLayout[config.breakpoint])
                setIsUserLayout(true)
            } else {
                const initialLayout = defaultLayout[config.breakpoint]
                setLayout(initialLayout)
                setIsUserLayout(false)
            }
        }
    },[config])

    useEffect(() => {
        if(config && layout){
            setLayout(prev => {
                const updated = prev.map(item => ({
                    ...item,
                    display: item.i === 'notes' ? !notes.open : item.display
                }))
                return updated
            })
        }
    },[notes.open])

    useEffect(() => {
        if(isManagingDashboard){
            setOriginalLayout(layout)
        }
    },[isManagingDashboard])

    
    const components = {
        "weather": ()  => (
            <WeatherDashboardItem
                setIsViewingWeather={setIsViewingWeather}
                isViewingWeather={isViewingWeather}
                isManagingDashboard={isManagingDashboard}
                customRef={weatherRef} 
            />
        ),
        "appSelector": AppSelector,
        "calendar": Calendar,
        "balance": Balance,
        "monthly_report": MonthlyReport,
        "last_transactions": LastTransactions,
        "today_tasks": TodayTasks,
        "recent_notes": RecentNotes,

        "notes": () => <Notes disabled={true} />
    }


    if(!config || !layout){
        return <div></div>
    }

    const renderItem = item => {
        const Component = item.Component ? item.Component : components[item.i]
        return (
            <GridItem
                key={item.i}
                id={item.i}
                isManagingDashboard={isManagingDashboard}
                isViewingWeather={isViewingWeather}
            >
                {isManagingDashboard && <GridItemLayer />}
                <Component item={item} />
            </GridItem>
        )
    }

    const stopHandler = updated => {
        const updatedLayout = []
        updated.forEach(item => {
            const prev = layout.find(i => i.i === item.i)
            updatedLayout.push({
                ...item,
                display: prev.display,
                id: prev.id
            })
        })
        console.log({
            updatedLayout
        })
        setLayout(updatedLayout)
    }

    const cancelDashboardChangesHandler = () => {
        setLayout(originalLayout)
        setIsManaginDashboard(false)
    }

    const saveDashboardChangesHandler = async () => {
        try {
            setIsSavingDashboardboardChanges(true)
            const data = layout.map(item => ({
                ...item,
                breakpoint: config.breakpoint,
                layout: "main"
            }))
            const res = await axios({
                method: isUserLayout ? "PUT" : "POST",
                url: "/layout-items",
                data
            })
            if(res.status === 200){
                setIsManaginDashboard(false)
                setIsSavingDashboardboardChanges(false)
            }
        } catch(err){
            console.log({
                err
            })
        }
    }

    return (
        <Container>
            <Header 
                setIsManaginDashboard={setIsManaginDashboard}
                cancelDashboardChangesHandler={cancelDashboardChangesHandler}
                saveDashboardChangesHandler={saveDashboardChangesHandler}
                isManagingDashboard={isManagingDashboard}
                isSavingDashboardChanges={isSavingDashboardChanges}
            />
            <WeatherFullView 
                isViewingWeather={isViewingWeather}
                setIsViewingWeather={setIsViewingWeather}
                weatherRef={weatherRef}
                isManagingDashboard={isManagingDashboard}
            />
            <GridContainer>
                <GridLayout
                    className="layout"
                    layout={layout}
                    cols={config.cols}
                    rowHeight={34}
                    width={windowWidth}
                    margin={[15, 15]}
                    isDraggable={isManagingDashboard}
                    isResizable={isManagingDashboard}
                    onDragStop={stopHandler}
                    onResizeStop={stopHandler}
                >
                    {layout.filter(i => i.display === true).map(renderItem)}
                </GridLayout>
            </GridContainer>
        </Container>
     )
};

export default Home;
