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

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_TODO_BOARDS: return updatedObject(state, {todoBoards: action.boards})
        case actionTypes.SET_ACTIVE_TODO_BOARD: return updatedObject(state, {activeBoardId: action.boardId})
        case actionTypes.SET_TODO_BOARD_LABELS: return setTodoBoardLabels(state, action)
        default: return state
    }
}

export default reducer