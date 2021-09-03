import * as actionTypes from './actionTypes'
import axios from 'axios'
const key = process.env.REACT_APP_WEATHER_API_KEY

const setWeather = cityData => {
    return {
        type: actionTypes.SET_WEATHER,
        cityData
    }
}

const initWeatherData = () => {
    return async function(dispatch, getState){
        const { user: {locations} } = getState()
        const storageData = localStorage.getItem("weather")
        if(storageData){
            const weatherData = JSON.parse(storageData)
            Object.keys(weatherData).forEach(city => {
                const h = Math.abs(new Date() - new Date(weatherData[city].lastUpdate)) / 36e5;
                if(h > 5){
                    dispatch(getWeather(city, weatherData[city].isCurrent))
                } else {
                    dispatch(setWeather({
                        city,
                        data: weatherData[city].weather,
                        isCurrent: weatherData[city].isCurrent
                    }))
                }
            })
        } else {
            let currentCity = locations.current ? locations.current.city : null
            if(currentCity){
                dispatch(getWeather(currentCity, true))
            }
            Object.keys(locations).forEach(city => {
                if(city !== currentCity && city !== "current"){
                    dispatch(getWeather(city))
                }
            })
        }
    }
}

const getWeather = (city, isCurrent) => {
    return async function(dispatch, getState){
        const {
            settings: { locale}
        } = getState()
        try {
            const res = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city.toLowerCase()}&days=2&lang=${locale}`)
            if(res.status === 200){
                dispatch(setWeather({
                    city,
                    data: res.data,
                    isCurrent
                }))
            }
        } catch(err){
            console.log({ err })
        }
    }
}

export {
    initWeatherData,
    setWeather,
    getWeather
}