import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utils'

const initialState = {
    locale: "en",
    currency: null
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_LOCALE: return updatedObject(state, {locale: action.locale})
        default: return state
    }
}

export default reducer