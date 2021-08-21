import * as actionTypes from './actionTypes'
import axios from 'axios'
import { arrayToObject } from '../../functions'

const getUserTodos = () => {
    return async function(dispatch){
        try  {
            const res = await axios.get("/todo/boards")
            let activeTodoBoardId = null
            const updatedBoards = {}
            res.data.data.forEach(board => {
                if(!activeTodoBoardId){
                    activeTodoBoardId = board.boardId
                }
                updatedBoards[board.boardId] = {
                    ...board,
                    ...board.todoBoard,
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
            dispatch(setActiveBoard(activeTodoBoardId))
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

const setActiveBoard = boardId => {
    return {
        type: actionTypes.SET_ACTIVE_TODO_BOARD,
        boardId
    }
}

export {
    getUserTodos
}