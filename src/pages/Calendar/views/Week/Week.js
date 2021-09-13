/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import SideBar from './Sidebar'
import { useSelector, useDispatch } from 'react-redux'
import WeekHeader from './WeekHeader'
import WeekDay from "./WeekDay"
import { useWindowSize } from '../../../../hooks'
import { enableScroll, disableScroll } from '../../../../functions'
import { ScrollBar, ScrollDrag } from '../../../../components'
import GridLayout from 'react-grid-layout'
import "../../../../../node_modules/react-grid-layout/css/styles.css"
import "../../../../../node_modules/react-resizable/css/styles.css"
import TodoItem from './TodoItem'
import { addDays, getPeriod, getInRangeTodoLists, addPeriods } from './functions'
import * as actions from "../../../../store/actions"
import axios from "axios"
import moment from 'moment'
import { isFirefox } from 'react-device-detect'
import { Container, Content, ContentView, ContentSlider, GridLayoutItem  } from './style'


const Week = props => {

    const { windowWidth } = useWindowSize()
    const dispatch = useDispatch()

    const { 
        todos: { todoBoards, activeBoardId }
    } = useSelector(state => state) 

    // const todoLists = todoBoards &&  activeBoardId ? todoBoards[activeBoardId].todoLists : null


    const [ todoLists, setTodoLists ] = useState(null)


    const config = {
        days: 7,
        h: 80,
        sidebar: 80,
        header: 120,
        d: (windowWidth - 80) / 7,
        ...props.config
    }

    const [ periods, setPeriods ] = useState(null)
    const [ pos, setPos ] = useState(null)
    const [ layout, setLayout ] = useState(null)
    const [ toBeSaved, setToBeSaved ] = useState([])
    const [ isScrollInitialized, setIsScrollInitialized] = useState(false)
    const [ isAddingPeriod, setIsAddingPeriod ] = useState(false)
    const [ isPeriodAdded, setIsPeriodAdded ] = useState(false)
    const [ isDragging, setIsDragging ] = useState(null)


    const [isScrolling, setIsScrolling] = useState(false)
    const [clientX, setClientX] = useState(0)
    const [scrollX, setScrollX] = useState(0)


    useEffect(() => {
        if(!todoBoards){
            dispatch(actions.getUserTodos())
        } else {
            if(!isScrollInitialized){
                getPeriods(new Date())
            }
            const currentLists = {}
            Object.values(todoBoards).forEach(board => {
                Object.values(board.todoLists).forEach(list => {
                    currentLists[list.id] = list
                })
            })
            setTodoLists(currentLists)
        }
    },[todoBoards])

    const getPeriods = date => {
        const res = []
        if(config.small){
            for(let i = 4 * -2; i < 4 * 5; i++){
                res.push({
                    ...getPeriod(addDays(new Date(date), i)),
                    index: {
                        index: i
                    }
                })
            }
        } else {
            for(let i = config.days * -2; i < config.days * 5; i++){
                res.push({
                    ...getPeriod(addDays(new Date(date), i)),
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
    }

    useEffect(() => {
        if(periods){
            const _layout = []
            if(todoLists){
                periods.forEach(period => {
                    const inRange = getInRangeTodoLists(todoLists, period.range)
                    if(inRange.length > 0){
                        inRange.forEach(item => {
                            let h = 1
                            let y = new Date(item.dueDate).getHours() * 2
                            if(item.startDate){
                                h = (Math.abs(new Date(item.dueDate) - new Date(item.startDate)) / 36e5 ) * 2  ;
                                const tempY = new Date(item.startDate).getHours() * 2
                                const tempH = new Date(item.startDate).getMinutes()
                                y = tempH >= 30 ? tempY + 1 : tempY
                            }
                            const itemLayout = {
                                w: 1,
                                h,
                                x: period.index.pos,
                                y,
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
            }
            setLayout(_layout)
        }
    },[periods, todoLists])

    useEffect(() => {
        if(periods && layout){
            const formattedToday = moment(new Date()).format("DD-MM-YYYY")
            const currentId = `${formattedToday} ${new Date().getHours() - 2}h`
            const el = document.getElementById(currentId)
            if(el && !isScrollInitialized){
                el.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.scrollTop = el.offsetTop
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

    const stopHandler = (data) => {
        setTimeout(() => {
            setIsDragging(false)
            console.log("ANOUT TO")
        },200)
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
        dispatch(actions.setTodoLists({
            todoLists: updatedTodoLists,
            boardId: activeBoardId
        }))
        // console.log({
        //     payload
        // })
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


    if(!periods || !layout || !todoLists){
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
                config={config}
                getPeriods={getPeriods}
            />
            <Content className="content">
                <SideBar />
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
                                onDrag={() => setIsDragging(true)}
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
                                                periods={periods}
                                                isDragging={isDragging}
                                            />
                                        </GridLayoutItem>
                                    )
                                })}
                            </GridLayout>
                            {periods.map((data, index) => (
                                <WeekDay
                                    key={index} data={data}
                                />
                            ))}
                        </ContentSlider>
                </ContentView>
            </Content>

        </Container>
     )
};

export default Week;
