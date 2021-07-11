import * as actionTypes from '../actions/actionTypes'
import axios from 'axios'

const setUser = user => {
    return {
        type: actionTypes.SET_USER,
        user
    }
}

const clearUser = () => {
    return {
        type: actionTypes.CLEAR_USER
    }
}

const setCheckedUserToken = value => {
    return {
        type: actionTypes.SET_CHECKED_USER_TOKEN,
        value
    }
}

const addWallet = wallet => {
    return {
        type: actionTypes.ADD_WALLET,
        wallet
    }
}

const addBudget = budget => {
    return {
        type: actionTypes.ADD_BUDGET,
        budget
    }
}

const setTodoLists = todoLists => {
    return {
        type: actionTypes.SET_TODO_LISTS,
        todoLists
    }
}


const updateTodoLits = data => {
    return async function(dispatch, getState){
        try {

            const {
                user: { todoLists }
            } = getState()

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

            console.log({
                res
            })
        } catch(err){
            console.log({
                err
            })
        }
    }
    
}


export {
    addBudget,
    addWallet,
    setUser,
    clearUser,
    setCheckedUserToken,
    setTodoLists,
    updateTodoLits
}