import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utils'

const initialState = {
    opened: null,
    edited: null
}

const setForm = (state, action) => {
    const { data } = action
    if(!data.opened){
        return initialState
    }
    return updatedObject(state, {
        opened: data.opened,
        edited: data.edited || null
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_FORM: return setForm(state, action)
        default: return state
    }
}

export default reducer