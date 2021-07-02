import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utils'

const initialState = {
    id: null,
    token: null,
    budgets: null,
    assets: null,
    transactions: null
}

const clearUser = () => {
    return initialState
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_USER: return updatedObject(state, {...action.user})
        case actionTypes.CLEAR_USER: return clearUser()
        default: return state
    }
}

export default reducer