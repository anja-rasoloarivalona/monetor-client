import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utils'

const initialState = {
    todoBoards: null,
    activeBoardId: null
}

const setTodoBoardLabels = (state, action) => {
    const { labels, boardId } = action.data
    return updatedObject(state, {
        [boardId]: {
            ...state.todoBoards[boardId],
            labels
        }
    })
}

const setTodoLists = (state, action) => {
    const { todoLists, boardId } = action.data
    if(state.todoBoards){
        return updatedObject(state, {
            todoBoards: updatedObject(state.todoBoards, {
                [boardId]: updatedObject(state.todoBoards[boardId], {
                    todoLists
                })
            })
        })
    }
    return state
}

const setTodoBoard = (state, action) => {
    const { board } = action
    return updatedObject(state, {
        todoBoards: updatedObject(state.todoBoards, {[board.boardId]: board })
    })
}


const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_TODO_BOARDS: return updatedObject(state, {todoBoards: action.boards})
        case actionTypes.SET_ACTIVE_TODO_BOARD: return updatedObject(state, {activeBoardId: action.boardId})
        case actionTypes.SET_TODO_BOARD_LABELS: return setTodoBoardLabels(state, action)
        case actionTypes.SET_TODO_LISTS: return setTodoLists(state, action)
        case actionTypes.SET_TODO_BOARD: return setTodoBoard(state, action)
        default: return state
    }
}

export default reducer