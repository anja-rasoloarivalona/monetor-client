import * as actionTypes from './actionTypes'

const setTheme = theme => {
    return {
        type: actionTypes.SET_THEME,
        theme
    }
}

const setBackgroundImage = image => {
    return {
        type: actionTypes.SET_BACKGROUND_IMAGE,
        image
    }
}

export {
    setTheme,
    setBackgroundImage
}