import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utils'

const initialState = {
    locale: "en",
    currency: null
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_LOCALE: return updatedObject(state, {locale: action.locale})
        case actionTypes.SET_CURRENCY: return updatedObject(state, {currency: JSON.parse(action.currency)})
        default: return state
    }
}

export default reducer