import * as actionTypes from '../actions/actionTypes'

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

export {
    setUser,
    clearUser,
    setCheckedUserToken
}