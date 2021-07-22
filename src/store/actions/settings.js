import * as actionTypes from './actionTypes'

const setLocale = locale => {
    return {
        type: actionTypes.SET_LOCALE,
        locale
    }
}

const setCurrency = currency => {
    return {
        type: actionTypes.SET_CURRENCY,
        currency
    }
}

const setSocket = socket => {
    return {
        type: actionTypes.SET_SOCKET,
        socket
    }
}

export {
    setCurrency,
    setLocale,
    setSocket
}