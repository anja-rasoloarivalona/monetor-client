import * as actionTypes from '../actions/actionTypes'
import axios from 'axios'
import { sortMessages } from '../../functions'

const setMessages = data => {
    return {
        type: actionTypes.SET_MESSAGES,
        data
    }
}

const addMessage = message => {
    return {
        type: actionTypes.ADD_MESSAGE,
        message
    }
}

export {
    addMessage,
    setMessages
}