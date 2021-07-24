import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utils'


const initialState = {
    counter: 0,
    data: null
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        default: return state
    }
}

export default reducer