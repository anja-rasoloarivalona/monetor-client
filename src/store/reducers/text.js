import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utils'

const initialState = {
    header: null,
    text: null,
    errorText: null,
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_TEXT: return updatedObject(state, {...action.text })
        default: return state
    }
}

export default reducer

