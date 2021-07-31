import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utils'

const initialState = {
    locale: localStorage.getItem("locale") || "en",
    currency: null,
    socket: null,
    unitType: localStorage.getItem("unitType") || "imperial",
    defaultBackground: null,
}

const setCurrency = (state, action) => {
    return updatedObject(state, {
        currency: typeof action.currency === "string" ? JSON.parse(action.currency) : action.currency
    })
}

const setLocale = (state, action) => {
    localStorage.setItem("locale", action.locale)
    return updatedObject(state, {
        locale: action.locale
    })
}

const setUnitType = (state, action) => {
    localStorage.setItem("unitType", action.unit)
    return updatedObject(state, {
        unitType: action.unit
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_LOCALE: return setLocale(state, action)
        case actionTypes.SET_CURRENCY: return setCurrency(state, action)
        case actionTypes.SET_SOCKET: return updatedObject(state, {socket: action.socket})
        case actionTypes.SET_UNIT_TYPE: return setUnitType(state, action)
        case actionTypes.SET_DEFAULT_BACKGROUND: return updatedObject(state, {defaultBackground: action.image})
        default: return state
    }
}

export default reducer