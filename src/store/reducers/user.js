import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utils'

const initialState = {
    id: null,
    token: null,
    budgets: null,
    assets: null,
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

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_USER: return setUser(state, action)
        case actionTypes.CLEAR_USER: return clearUser()
        case actionTypes.SET_CHECKED_USER_TOKEN: return checkedToken(state, action)
        default: return state
    }
}

export default reducer