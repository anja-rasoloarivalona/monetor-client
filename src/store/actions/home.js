import * as actionTypes from './actionTypes'
import moment from 'moment'
const OPEN_WEATHER_API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY

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
            console.log('LOOOL')
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
            const currentLocation = locations.current || null
            if(currentLocation){
                dispatch(getWeather(currentLocation, true))
            }
            Object.keys(locations).forEach(city => {
                const isCurrentLocation = city === "current" || (currentLocation && currentLocation.city.toLowerCase() === city.toLowerCase())
                if(!isCurrentLocation){
                    dispatch(getWeather(locations[city]))
                }
            })
        }
    }
}

const getWeather = (location, isCurrent, dateTime) => {
    return async function(dispatch, getState){
        const { settings: { locale, unitType } } = getState()
        const { city, lat, lng } = location
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely,current&units=${unitType}&appid=${OPEN_WEATHER_API_KEY}&lang=${locale}`).then(res => res.json())            
            
            if(res){
                const hours = []
                res.hourly.forEach(h => {
                    hours.push({
                        ...h,
                        dateTime: {
                            string: moment(new Date(h.dt * 1000)).format("YYYY-MM-DD HH:mm"),
                            date: new Date(h.dt * 1000)
                        }
                    })
                })
                dispatch(setWeather({
                    city,
                    data: {
                        daily: res.daily,
                        hourly: hours
                    },
                    isCurrent,
                    location,
                    dateTime
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