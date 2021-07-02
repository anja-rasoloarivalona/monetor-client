import * as actionTypes from './actionTypes'

const setTheme = theme => {
    return {
        type: actionTypes.SET_THEME,
        theme
    }
}

export {
    setTheme
}