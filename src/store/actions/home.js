import * as actionTypes from './actionTypes'

const setWeather = data => {
    return {
        type: actionTypes.SET_WEATHER,
        data
    }
}

export {
    setWeather
}