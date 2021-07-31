import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utils'
import axios from 'axios'
import { arrayToObject } from '../../functions'

const initialState = {
    id: null,
    token: null,
    budgets: null,
    wallets: null,
    transactions: null,
    checkedToken: false,
    location: null,
    defaultBackground: null
}

const clearUser = (state) => {
    localStorage.removeItem("token")
    axios.defaults.headers.common['Authorization'] = 'Bearer ';
    return {
        ...initialState,
        checkedToken: true,
        location: state.location
    }
}


const setUser = (state, action) => {
    const token = action.user.token
    localStorage.setItem("token", token)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return updatedObject(state, {
        ...action.user,
        checkedToken: true,
    })
}

const checkedToken = (state, action) => {
    return updatedObject(state, {
        checkedToken: action.value
    })
}

const addWallet = (state, action) => {
    return updatedObject(state, {
        wallets: state.wallets ? [...state.wallets, action.wallet] : [action.wallet]
    })
}

const addBudget = (state, action) => {
    return updatedObject(state, {
        budgets: state.budgets ? [...state.budgets, action.budget] : [action.budget]
    })
}

const addTransaction = (state, action) => {
    const { data } = action
    return updatedObject(state, {
        wallets: data.wallets,
        transactions: data.transactions
    })
}

const setOnlineContacts = (state, action) => {
    const { onlineContacts } = action
    return updatedObject(state, {
        contacts: onlineContacts
    })
}

const toggleDraggableMessage = (state, action) => {

    const { open, id  } = action.data
    const updatedContacts = []
    state.contacts.forEach(contact => {
        updatedContacts.push({
            ...contact,
            isDragOpened: id === contact.id ? open : contact.isDragOpened
        })
    })

    return updatedObject(state, {
        contacts: updatedContacts
    })
}


const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_USER: return setUser(state, action)
        case actionTypes.CLEAR_USER: return clearUser(state)
        case actionTypes.SET_CHECKED_USER_TOKEN: return checkedToken(state, action)
        case actionTypes.ADD_WALLET: return addWallet(state, action)
        case actionTypes.ADD_BUDGET: return addBudget(state, action)
        case actionTypes.SET_TODO_LISTS: return updatedObject(state, {todoLists: action.todoLists})
        case actionTypes.ADD_TRANSACTION: return addTransaction(state, action)
        case actionTypes.SET_ONLINE_CONTACTS: return setOnlineContacts(state, action)
        case actionTypes.TOGGLE_DRAGGABLE_MESSAGE: return toggleDraggableMessage(state, action)
        case actionTypes.SET_USER_BALANCE: return updatedObject(state, {balance: action.balance})
        default: return state
    }
}

export default reducer