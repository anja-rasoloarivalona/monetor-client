import * as actionTypes from './actionTypes'
import axios from 'axios'
import { arrayToObject } from '../../functions'
import * as actions from './index'

const getUserTodos = (boardIdParams) => {
    return async function(dispatch){
        try  {
            const res = await axios.get("/todo/boards")
            const updatedBoards = {}
            res.data.data.forEach(board => {
                updatedBoards[board.boardId] = {
                    boardId: board.boardId,
                    isAdmin: board.isAdmin,
                    labels: board.labels,
                    color: board.color,
                    rule: board.rule,
                    title: board.todoBoard.title,
                    backgroundImage: board.backgroundImage,
                    todoLists: board.todoBoard.todoLists ?
                        arrayToObject(
                            board.todoBoard.todoLists
                                .sort((a, b) => a.index - b.index)
                                .map(list => {
                                    return {
                                        ...list,
                                        todos: list.todos.sort((a, b) => a.index - b.index)
                                    }
                                }), "id")
                        :
                        {}
                }
            })
            const activeTodoBoardId =
                boardIdParams && updatedBoards[boardIdParams] ?
                boardIdParams 
                    :  Object.keys(updatedBoards).length > 0 ?
                            updatedBoards[Object.keys(updatedBoards)[0]].boardId 
                            : null
            dispatch(setActiveTodoBoard(activeTodoBoardId))
            dispatch(setTodoBoards(updatedBoards))
        } catch(err){
            console.log({
                err
            })
        }
    }
}

const setTodoBoards = boards => {
    return {
        type: actionTypes.SET_TODO_BOARDS,
        boards
    }
}

const setActiveTodoBoard = boardId => {
    return {
        type: actionTypes.SET_ACTIVE_TODO_BOARD,
        boardId
    }
}

const setTodoBoardLabels = data => {
    return {
        type: actionTypes.SET_TODO_BOARD_LABELS,
        data
    }
}

const updateTodoLists = data => {
    return async function(){
        try {
            const { action, item } = data
            const methods = {
                "add": "post",
                "delete": "delete",
                "update": "put"
            }
            const res = await axios({
                method: methods[action],
                url: "/todo",
                data: item
            })
        } catch(err){
            console.log({
                err
            })
        }
    }
}

const setTodoLists = data => {
    return {
        type: actionTypes.SET_TODO_LISTS,
        data
    }
}

const setTodoBoard = board => {
    return {
        type: actionTypes.SET_TODO_BOARD,
        board
    }
}

const saveTodo = data => {
    return async function(dispatch, getState){
        const { boardId, todoListId  } = data
        dispatch(actions.setUploadActivity(true))
        const { todos: { todoBoards }} = getState()
        const updatedTodoLists = {...todoBoards[boardId].todoLists[todoListId]}
        updatedTodoLists.todos.push(data)
        dispatch(setTodoLists({
            todoLists: {
                ...todoBoards[boardId].todoLists,
                [todoListId]: updatedTodoLists
            },
            boardId
        }))
        try {
            const res = await axios.post("/todo", data)
            dispatch(actions.setUploadActivity(false))
        } catch(err){
            console.log({ err })
            dispatch(actions.setUploadActivity(false))

        }
    }
}


export {
    getUserTodos,
    setTodoBoardLabels,
    updateTodoLists,
    setTodoLists,
    setActiveTodoBoard,
    setTodoBoard,
    saveTodo
}