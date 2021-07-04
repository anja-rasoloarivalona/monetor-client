import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utils'

const initialState = {
    id: null,
    token: null,
    budgets: null,
    wallets: null,
    transactions: null,
    checkedToken: false
}

const clearUser = () => {
    return initialState
}

const setUser = (state, action) => {
    localStorage.setItem("token", action.user.token)
    return updatedObject(state, {
        ...action.user,
        checkedToken: true
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
        default: return state
    }
}

export default reducer