import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utils'

const initialState = {
    locale: localStorage.getItem("language") || "en",
    currency: null
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
        default: return state
    }
}

export default reducer