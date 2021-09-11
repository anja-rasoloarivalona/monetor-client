import React, {useEffect, useState, useRef } from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from 'react-redux'
import moment from "moment"
import * as actions from '../../../../store/actions'
import AppIcon from '../../../../icons'
import { HeaderCta, HeaderCtaItem, HeaderLabel,HeaderCtaItemIcon,  Cta, CtaItem } from '../style'
import { useOnClickOutside } from '../../../../hooks'
import { Input } from '../../../../components/Form/WithoutValidation'
import { withRouter  } from 'react-router-dom'

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 2rem 1.5rem;
    border-radius: 1rem;
    background: ${({ theme }) => theme.surface};
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
    background: ${({ theme }) => theme.secondarySurface};
    // box-shadow: ${({ theme }) => theme.boxShadowExtraLight};
    border-radius: .5rem;
`
const InputContainer = styled.div`
    margin-bottom: 1rem;
    input {
        height: 4rem;
    }
`


const TodayTasks = props => {

    const { setIsManaginDashboard, setIsInFront, index } = props

    const dispatch = useDispatch()

    const {
        text: { text },
        todos: { todoBoards }
    } = useSelector(state => state)

    const [ data, setData ] = useState([])
    const [ showCta, setShowCta ] = useState(false)
    const [ isAdding, setIsAdding ] = useState(false)
    const [ title, setTitle ] = useState("")
    const [ addIsHovered, setAddIsHovered ] = useState(false)

    const ctaRef = useRef()
    const inputRef = useRef()

    useOnClickOutside(ctaRef, () => {
        if(showCta){
            setShowCta(false)
        }
    })

    useOnClickOutside(inputRef, () => {
        if(title === "" && !addIsHovered){
            setIsAdding(false)
        }
    })

    const toggleList = () => {
        if(!showCta){
            setIsInFront(index)
            setShowCta(true)
        } else {
            setShowCta(false)
        }
    }

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
                            res.push({
                                ...todo,
                                boardId: board.boardId
                            })
                        }
                        if(todo.checkList){
                            todo.checkList.forEach(item => {
                                if(isInRange(item)){
                                    res.push({
                                        ...item,
                                        boardId: board.boardId
                                    })
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

    const ctaList = [
        {label: text.add_a_card, onClick: () => setIsAdding(true) },
        {label: text.move_and_resize, onClick: () => setIsManaginDashboard(true)}
    ]

    const onClickTodo = todo => {
        dispatch(actions.setForm({
            edited: todo,
            opened: "todo"
        }))
        props.history.push({
            search: `?active=td&id=${todo.id}&bid=${todo.boardId}&lid=${todo.todoListId}`
        })
    }

    return (
        <Container>
            <Header>
                <HeaderLabel>{text.today_tasks}</HeaderLabel>
                <HeaderCta >
                    <HeaderCtaItem onClick={() => !isAdding ? setIsAdding(true) : null} onMouseEnter={() => setAddIsHovered(true)} onMouseLeave={() => setAddIsHovered(false)}>
                        <HeaderCtaItemIcon>
                            <AppIcon id="plus"/>
                        </HeaderCtaItemIcon>
                    </HeaderCtaItem>
                    <HeaderCtaItem ref={ctaRef} >
                        <HeaderCtaItemIcon onClick={toggleList} isActive={showCta} className="small" > 
                            <AppIcon id="ellipsis-h"/>
                        </HeaderCtaItemIcon>
                        {showCta && (
                            <Cta>
                                {ctaList.map((action, index) => (
                                    <CtaItem
                                        key={index}
                                        onClick={action.onClick}
                                    >
                                        {action.label}
                                    </CtaItem>
                                ))}
                            </Cta>
                        )}
                    </HeaderCtaItem>
                </HeaderCta>
            </Header>
            <List>
                {isAdding && (
                    <InputContainer>
                        <Input 
                            value={title}
                            onChange={setTitle}
                            placeholder="New task..."
                            focusOnMount
                            customRef={inputRef}
                        />
                    </InputContainer>
                )}
                {data.map(item => (
                    <ListItem
                        key={item.id}
                        style={{ backgroundColor: todoBoards[item.boardId].color }}
                        onClick={() => onClickTodo(item)}
                    >
                        {item.title}
                    </ListItem>
                ))}
            </List>
        </Container>
     )
};

export default withRouter(TodayTasks);
