/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import SideBar from './Sidebar'
import { useSelector, useDispatch } from 'react-redux'
import WeekHeader from './WeekHeader'
import WeekDay from "./WeekDay"
import { useWindowSize } from '../../../../hooks'
import { ScrollBar, ScrollDrag } from '../../../../components'
import GridLayout from 'react-grid-layout'
import "../../../../../node_modules/react-grid-layout/css/styles.css"
import "../../../../../node_modules/react-resizable/css/styles.css"
import TodoItem from './TodoItem'
import { addDays, getPeriod, getInRangeTodoLists, addPeriods } from './functions'
import * as actions from "../../../../store/actions"
import axios from "axios"
import moment from 'moment'

const Container = styled.div`
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    width: 100%;
    height: 100%;
    display: grid;
    background: ${props => props.theme.surface};

    ${props => {
        const { config: { sidebar, header, length, d, h, windowWidth, pos,isAddingPeriod, small }} = props
        return {
            gridTemplateColumns: `${sidebar}px 1fr`,
            gridTemplateRows: `${header}px 1fr`,
            ".header": {
                "&__slider": {
                    width: `${d * length}px`,
                    gridTemplateColumns: `repeat(auto-fit, ${d}px)`,
                    transform: `translateX(${d * pos * -1}px)`,
                    transition: isAddingPeriod ? "none" : ".3s ease-in",
                    height: small ? "4rem" : "initial",
                    "> div": {
                        marginBottom: small ? "0rem" : "1rem"
                    }
                },
                "&__header": {
                    transform: `translateX(-${sidebar}px)`,
                    padding: small ? "0" : "0 4rem",
                    width: small ? `${d + sidebar}px` : "100vw",
                    ":before": {
                        height: small ? "4rem" : "2.5rem",
                        width: `${sidebar}px`
                    }
                }
            },
            ".content": {
                gridTemplateColumns: `${sidebar}px 1fr`,
                maxHeight: `calc(100vh - 6.5rem - ${header}px)`,
                "&__slider": {
                    width: `${d * length}px`,
                    gridTemplateColumns: `repeat(auto-fit, ${d}px)`,
                    transform: `translateX(${d * pos * -1}px)`,
                    transition: isAddingPeriod ? "none" : ".3s ease-in"

                }
            },
            ".sidebar": {
                "&__list": {
                    "&__item": {
                        height: `${h}px`
                    }
                }
            },
            ".weekday": {
                width: `${d}px`,
                "&__content": {
                    height: `${h * 24}px`,
                    "&__item": {
                        height: `${h}px`
                    }
                }
            },
            ".item": {
                height: `${h}px`
            }
        }
    }}
`

const Content = styled(ScrollBar)`
    display: grid;
    grid-template-rows: max-content;
    grid-column: 1 / 3;
    grid-row: 2 / 3;
`


const ContentView = styled.div`
    width: 100%;
    height: 100%;
    grid-column: 2 / 3;
    grid-row: 1 / 3;
`

const ContentSlider = styled.div`
    display: grid;
    transition: all .3s ease-in;
    position: relative;

    .layout {
        position: absolute;
        top: 0;
        left: 0;
    }
`

const GridLayoutItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.theme.surface};
    padding: .2rem;
    box-shadow: ${props => props.hideBackground ? "none" : props.theme.boxShadow};
    border-radius: .2rem;
    position: relative;
    z-index: 5;
    transition: box-shadow .3s ease-in;

    .react-resizable-handle.react-resizable-handle-se {
        bottom: .2rem !important;
        right: .2rem !important;
    }
`

const Week = props => {

    const { windowWidth } = useWindowSize()
    const dispatch = useDispatch()

    const { 
        user: { todoBoards, activeTodoBoardId }
    } = useSelector(state => state) 

    const todoLists = todoBoards[activeTodoBoardId].todoLists

    const config = {
        days: 7,
        h: 80,
        sidebar: 200,
        header: 100,
        d: (windowWidth - 200) / 7,
        ...props.config
    }

    const [ periods, setPeriods ] = useState(null)
    const [ pos, setPos ] = useState(null)
    const [ layout, setLayout ] = useState(null)
    const [ toBeSaved, setToBeSaved ] = useState([])
    const [ isScrollInitialized, setIsScrollInitialized] = useState(false)
    const [ isAddingPeriod, setIsAddingPeriod ] = useState(false)
    const [ isPeriodAdded, setIsPeriodAdded ] = useState(false)


    const [isScrolling, setIsScrolling] = useState(false)
    const [clientX, setClientX] = useState(0)
    const [scrollX, setScrollX] = useState(0)


    useEffect(() => {
        const res = []
        if(config.small){
            for(let i = 4 * -2; i < 4 * 5; i++){
                res.push({
                    ...getPeriod(addDays(new Date(), i)),
                    index: {
                        index: i
                    }
                })
            }
        } else {
            for(let i = config.days * -2; i < config.days * 5; i++){
                res.push({
                    ...getPeriod(addDays(new Date(), i)),
                    index: {
                        index: i
                    }
                })
            }
        }
        res.forEach((item, index) => {
            res[index].index.pos = index
        })
        const current = res.find(i => i.index.index === 0)
        setPos(current.index.pos)
        setPeriods(res)
    },[])

    useEffect(() => {
        if(periods){
            const _layout = []
            periods.forEach(period => {
                const inRange = getInRangeTodoLists(todoLists, period.range)
                if(inRange.length > 0){
                    inRange.forEach(item => {
                        let h = 1
                        if(item.startDate){
                            h = (Math.abs(new Date(item.dueDate) - new Date(item.startDate)) / 36e5 ) * 2  ;   
                        }
                        const itemLayout = {
                            w: 1,
                            h,
                            x: period.index.pos,
                            y: (new Date(item.dueDate).getHours() * 2) - h,
                            i: item.id,
                        }
                        _layout.push({
                            ...item,
                            period,
                            ...itemLayout
                        })
                    })
                }
            })
            setLayout(_layout)
        }
    },[periods])

    useEffect(() => {
        if(periods && layout){
            const formattedToday = moment(new Date()).format("DD-MM-YYYY")
            const currentId = `${formattedToday} ${new Date().getHours() - 2}h`
            const el = document.getElementById(currentId)
            if(el && !isScrollInitialized){
                el.scrollIntoView("alignToTop")
                setIsScrollInitialized(true)
            }
        }
    },[periods, layout])

    useEffect(() => {

        const check = config.small ? 4 : 10

        if(pos && isScrollInitialized){
            if(pos < check || pos > periods.length - check){
                const prevPeriod = periods.find(period => period.index.pos === pos)
                const updatedPeriods = [...addPeriods(periods, 20  * (pos < check ? -1 : 1  ))]
                const updatedPos = updatedPeriods.find(period => period.formatted === prevPeriod.formatted).index.pos
                setIsAddingPeriod(true)
                setPos(updatedPos)
                setPeriods(updatedPeriods)
                setIsPeriodAdded(true)
            }

        }
    },[pos])

    useEffect(() => {
        if(isAddingPeriod && isPeriodAdded){
            setIsAddingPeriod(false)
        }
    },[periods, pos])

    let timeout
    useEffect(() => {
        clearTimeout(timeout)
        if(toBeSaved.length > 0){
            timeout = setTimeout(() => {
                saveHandler(toBeSaved)
                setToBeSaved([])
            },500)
        }
    },[toBeSaved])

    const stopHandler = (data, more) => {
        const updated = []
        layout.forEach(item => {
            const updatedData = data.find(i => i.i === item.i)
            updated.push({
                ...item,
                x: updatedData.x,
                y: updatedData.y,
                h: updatedData.h
            })
        })
        setLayout(updated)
    }

    const saveHandler = async data => {
        const updatedTodoLists = {...todoLists}
        const payload = []
        data.forEach(item => {
            if(item.type === "todo"){
                const todoIndex = updatedTodoLists[item.todoListId].todos.findIndex(todo => todo.id === item.id)
                console.log("fonf", updatedTodoLists[item.todoListId].todos[todoIndex])

                updatedTodoLists[item.todoListId].todos[todoIndex] = {
                    ...updatedTodoLists[item.todoListId].todos[todoIndex],
                    startDate: item.startDate,
                    dueDate: item.dueDate
                }
                payload.push(updatedTodoLists[item.todoListId].todos[todoIndex])
            }
            if(item.type === "checkList"){
                Object.keys(todoLists).forEach(listId => {
                    const todos = todoLists[listId].todos
                    todos.forEach((todo, todoIndex) => {
                        if(todo.id === item.todoId){
                            const checkIndex = todo.checkList.findIndex(i => i.id === item.id)
                            todoLists[listId].todos[todoIndex].checkList[checkIndex] = {
                                ...todoLists[listId].todos[todoIndex].checkList[checkIndex] ,
                                startDate: item.startDate,
                                dueDate: item.dueDate
                            }
                            payload.push(todoLists[listId].todos[todoIndex].checkList[checkIndex])
                        }
                    })
                })
            }
        })
        dispatch(actions.setTodoLists(updatedTodoLists))
        // try {
        //     const res = await axios({
        //         method: "PUT",
        //         url: "/todo/many",
        //         data: payload
        //     })
        //     console.log({
        //         res
        //     })
        // } catch(err){
        //     console.log({
        //         err
        //     })
        // }

    }

    if(!periods || !layout){
        return null
    }

    return (
        <Container
            config={{
                ...config,
                length: periods.length,
                windowWidth,
                pos,
                isAddingPeriod
            }}
        >
            <WeekHeader 
                setPeriods={setPeriods}
                periods={periods} 
                pos={pos}
                setPos={setPos}
                small={config.small}
                setIsAddingPeriod={setIsAddingPeriod}
            />
            <Content className="content">
                <SideBar />
                <ScrollDrag
                    style={{
                        width: config.small ? `${config.d}px` : `calc(100vw - ${config.sidebar}px)`,
                        height: "100%",
                        gridColumn: "2/3",
                        gridRow: "1/3"
                    }}
                >
                    <ContentView className="content__view">
                        <ContentSlider className="content__slider">
                            <GridLayout
                                className="layout"
                                layout={layout}
                                cols={periods.length}
                                rows={48}
                                rowHeight={config.h / 2}
                                width={config.d * periods.length}
                                isDraggable={true}
                                isResizable={true}
                                margin={[0, 0]}
                                compactType={null}
                                onDragStop={stopHandler}
                                onResizeStop={stopHandler}
                                preventCollision={true}
                                useCSSTransforms={false}
                            >
                                {layout.map(item => {
        
                                    return (
                                        <GridLayoutItem
                                            key={item.i}
                                            hideBackground={config.small && item.x !== pos}
                                        >
                                            <TodoItem
                                                item={item} 
                                                setToBeSaved={setToBeSaved}
                                            />
                                        </GridLayoutItem>
                                    )
                                })}
                            </GridLayout>
                            {periods.map((data, index) => (
                                <WeekDay 
                                    key={index}
                                    data={data}
                                />
                            ))}
                        </ContentSlider>
                </ContentView>
                </ScrollDrag>
            </Content>

        </Container>
     )
};

export default Week;
