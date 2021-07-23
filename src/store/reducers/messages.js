import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utils'

const initialState = {}

const setMessages = (state, action) => {
    const { messages, id } = action.data
    return updatedObject(state, {
        [id]: {
            loaded: true,
            data: messages
        }
    })
}

const addMessage = (state, action) => {
    const { message } = action
    const current = state[message.associationId]
    return updatedObject(state, {
        [message.associationId]: {
            loaded: current ? current.loaded : false,
            data: current ? [message, ...current.data] : [message]
        }
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_MESSAGES: return setMessages(state, action)
        case actionTypes.ADD_MESSAGE: return addMessage(state, action)
        default: return state
    }
}

export default reducer