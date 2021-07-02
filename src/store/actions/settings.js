import * as actionTypes from './actionTypes'

const setLocale = locale => {
    return {
        type: actionTypes.SET_LOCALE,
        locale
    }
}

export {
    setLocale
}