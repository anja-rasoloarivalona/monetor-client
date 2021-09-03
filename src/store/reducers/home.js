import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utils'


const initialState = {
    weather: null,
    currentCity: null
}


const setWeather = (state, action) => {
    const { city, data, isCurrent } = action.cityData
    const updatedWeather = state.weather ? {...state.weather} : {}
    updatedWeather[city] = {
        lastUpdate: new Date(),
        weather: data,
        isCurrent
    }
    localStorage.setItem("weather", JSON.stringify(updatedWeather))
    return updatedObject(state, {
        weather: updatedWeather,
        currentCity: isCurrent ? city : state.currentCity
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_WEATHER: return setWeather(state, action)
        default: return state
    }
}

export default reducer