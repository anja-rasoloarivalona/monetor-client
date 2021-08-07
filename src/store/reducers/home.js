import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utils'


const initialState = {
    weather: null
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_WEATHER: return updatedObject(state, {weather: action.data })
        default: return state
    }
}

export default reducer