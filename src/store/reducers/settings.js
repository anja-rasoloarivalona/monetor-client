import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utils'

const initialState = {
    locale: localStorage.getItem("language") || "en",
    currency: null,
    socket: null
}

const setCurrency = (state, action) => {
    return updatedObject(state, {
        currency: typeof action.currency === "string" ? JSON.parse(action.currency) : action.currency
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_LOCALE: return updatedObject(state, {locale: action.locale})
        case actionTypes.SET_CURRENCY: return setCurrency(state, action)
        case actionTypes.SET_SOCKET: return updatedObject(state, {socket: action.socket})
        default: return state
    }
}

export default reducer