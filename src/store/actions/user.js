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
    return {
        type: actionTypes.TOGGLE_DRAGGABLE_MESSAGE,
        data
    }
}

const setUserBalance = balance => {
    return {
        type: actionTypes.SET_USER_BALANCE,
        balance
    }
}


const getUserCurrentLocation = () => {
    return async function(dispatch){
        const locations = {}
        try {
            const ressponse = await axios.get('https://ipapi.co/json/')
            const { data } = ressponse
            locations.current = {
                id: data.ip,
                city: data.city,
                region: data.region,
                country: data.country,
                lat: data.latitude,
                lng: data.longitude,
                regionCode: data.region_code,
                countryCode: data.country_code
            }
        } catch(err){
            console.log({ err })
            locations.current = null
        }
        dispatch({
            type: actionTypes.SET_USER_LOCATIONS,
            locations
        })
    }
}

const getUserLocations = () => {
    return async function(dispatch){
        const locations = {}
        try {
            const res = await axios.get("/location")
            if(res.status === 200){
                res.data.data.forEach(location => {
                    locations[location.city.toLowerCase()] = location
                })
            }
        } catch(err){
            console.log({ err })
        }
        dispatch({
            type: actionTypes.SET_USER_LOCATIONS,
            locations
        })
    }
}

const setUploadActivity = value => {
    return {
        type: actionTypes.SET_UPLOAD_ACTIVITY,
        value
    }
}


export {
    addBudget,
    addWallet,
    setUser,
    clearUser,
    setCheckedUserToken,
    addTransaction,
    setOnlineContacts,
    toggleDraggableMessage,
    setUserBalance,
    getUserLocations,
    getUserCurrentLocation,
    setUploadActivity
}