import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utils'

const initialState = {
    expense: null,
    income: null
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_CATEGORIES: return updatedObject(state, {...state, ...action.categories})
        default: return state
    }
}

export default reducer