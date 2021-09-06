import React, {useEffect, useState } from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from 'react-redux'
import moment from "moment"
import * as actions from '../../../../store/actions'
import AppIcon from '../../../../icons'
import { HeaderCta, HeaderCtaItem, HeaderLabel } from '../style'

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 2rem;
    border-radius: 1rem;
    background: ${({ theme }) => theme.secondarySurface};
    position: relative;
`

const Header = styled.div`
    margin-bottom: 2rem;
    display: flex;
`
const List = styled.div`
`
const ListItem = styled.div`
    padding: 1rem;
    min-height: 4rem;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 1rem;
    background: ${({ theme }) => theme.surface};
    box-shadow: ${({ theme }) => theme.boxShadowExtraLight};
    border-radius: .5rem;
`


const TodayTasks = () => {

    const dispatch = useDispatch()

    const {
        text: { text },
        todos: { todoBoards }
    } = useSelector(state => state)

    const [ data, setData ] = useState([])

    const start = new Date(moment().set("hour", 0).set("minute", 0).set("second", 0))
    const end =  new Date(moment().set("hour", 23).set("minute", 59).set("second", 59))


    const isInRange = todo  => {
        const { dueDate, startDate } = todo
        if(dueDate && new Date(dueDate) < end){
            return true
        }
        if(startDate && new Date(startDate) < end && new Date(startDate) > start){
            return true
        }
        return false
    }

    useEffect(() => {
        if(todoBoards){
            const res = []
            Object.values(todoBoards).forEach(board => {
                Object.values(board.todoLists).forEach(list => {
                    list.todos.forEach(todo => {
                        if(isInRange(todo)){
                            res.push(todo)
                        }
                        if(todo.checkList){
                            todo.checkList.forEach(item => {
                                if(isInRange(item)){
                                    res.push(item)
                                }
                            })
                        }
                    })
                })
            })
            setData(res)
        } else {
            dispatch(actions.getUserTodos())
        }
    },[todoBoards])

    return (
        <Container>
            <Header>
                <HeaderLabel>{text.today_tasks}</HeaderLabel>
                <HeaderCta>
                    <HeaderCtaItem>
                        <AppIcon id="plus"/>
                    </HeaderCtaItem>
                    <HeaderCtaItem className="small">
                        <AppIcon id="ellipsis-h"/>
                    </HeaderCtaItem>
                </HeaderCta>
            </Header>
            <List>
                {data.map(item => (
                    <ListItem key={item.id}>
                        {item.title}
                    </ListItem>
                ))}
            </List>
        </Container>
     )
};

export default TodayTasks;
