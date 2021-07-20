import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utils'
import axios from 'axios'
import { arrayToObject } from '../../functions'

const initialState = {
    id: null,
    token: null,
    budgets: null,
    wallets: null,
    transactions: null,
    todoLists: null,
    checkedToken: false
}

const clearUser = () => {
    localStorage.removeItem("token")
    axios.defaults.headers.common['Authorization'] = 'Bearer ';
    return {
        ...initialState,
        checkedToken: true
    }
}


const setUser = (state, action) => {
    const token = action.user.token
    localStorage.setItem("token", token)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return updatedObject(state, {
        ...action.user,
        checkedToken: true,
        todoLists: arrayToObject(action.user.todoLists, "id"),
    })
}

const checkedToken = (state, action) => {
    return updatedObject(state, {
        checkedToken: action.value
    })
}

const addWallet = (state, action) => {
    return updatedObject(state, {
        wallets: state.wallets ? [...state.wallets, action.wallet] : [action.wallet]
    })
}

const addBudget = (state, action) => {
    return updatedObject(state, {
        budgets: state.budgets ? [...state.budgets, action.budget] : [action.budget]
    })
}


const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_USER: return setUser(state, action)
        case actionTypes.CLEAR_USER: return clearUser()
        case actionTypes.SET_CHECKED_USER_TOKEN: return checkedToken(state, action)
        case actionTypes.ADD_WALLET: return addWallet(state, action)
        case actionTypes.ADD_BUDGET: return addBudget(state, action)
        case actionTypes.SET_TODO_LISTS: return updatedObject(state, {todoLists: action.todoLists})
        default: return state
    }
}

export default reducer