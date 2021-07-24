import * as actionTypes from '../actions/actionTypes'
import axios from 'axios'

const setUser = user => {
    return {
        type: actionTypes.SET_USER,
        user
    }
}

const clearUser = () => {
    return {
        type: actionTypes.CLEAR_USER
    }
}

const setCheckedUserToken = value => {
    return {
        type: actionTypes.SET_CHECKED_USER_TOKEN,
        value
    }
}

const addWallet = wallet => {
    return {
        type: actionTypes.ADD_WALLET,
        wallet
    }
}

const addBudget = budget => {
    return {
        type: actionTypes.ADD_BUDGET,
        budget
    }
}

const setTodoLists = todoLists => {
    return {
        type: actionTypes.SET_TODO_LISTS,
        todoLists
    }
}


const updateTodoLits = data => {
    return async function(dispatch, getState){
        try {

            const {
                user: { todoLists }
            } = getState()
            const { action, item } = data
            const methods = {
                "add": "post",
                "delete": "delete",
                "update": "put"
            }
            const res = await axios({
                method: methods[action],
                url: "/todo",
                data: item
            })
        } catch(err){
            console.log({
                err
            })
        }
    }
}

const addTransaction = data => {
    return {
        type: actionTypes.ADD_TRANSACTION,
        data
    }
}

const setOnlineContacts = props => {

    return async function(dispatch, getState){
        const {
            user: { contacts }
        } = getState()

        const { action, data } = props
        const updatedContacts = []
        switch(action){
            case "joined":
                contacts.forEach(contact => {
                    let isConnected = false
                    if(data.includes(contact.user.id)){
                        isConnected = true
                    }
                    updatedContacts.push({
                        ...contact,
                        isConnected
                    })
                })
                break;
            case "contact-joined":
                contacts.forEach(contact => {
                    updatedContacts.push({
                      ...contact,
                      isConnected: contact.user.id === data ? true : contact.isConnected
                    })
                })
                break;
            case "contact-left":
                contacts.forEach(contact => {
                    updatedContacts.push({
                      ...contact,
                      isConnected: contact.user.id === data ? false : contact.isConnected
                    })
                })
                break;
            default: return
        }

        return dispatch({
            type: actionTypes.SET_ONLINE_CONTACTS,
            onlineContacts: updatedContacts
        })
    }
}

const toggleDraggableMessage = data => {
    console.log({
        data
    })
    return {
        type: actionTypes.TOGGLE_DRAGGABLE_MESSAGE,
        data
    }
}

export {
    addBudget,
    addWallet,
    setUser,
    clearUser,
    setCheckedUserToken,
    setTodoLists,
    updateTodoLits,
    addTransaction,
    setOnlineContacts,
    toggleDraggableMessage
}