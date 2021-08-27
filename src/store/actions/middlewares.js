import * as actionTypes from './actionTypes'
import { setTheme, setUser, setCurrency, setWeather, setBackgroundImage, setDefaultBackgroundImage, setNotes, setLayouts } from './index'
import axios from 'axios'
import { getCategories } from './categories'
import { arrayToObject } from '../../functions'

const key = process.env.REACT_APP_WEATHER_API_KEY

const initApp = () => {
    return async function(dispatch){
        const token = localStorage.getItem("token")
        const theme = localStorage.getItem("theme")

        dispatch(getUserLocation())
        dispatch(getCategories())
        dispatch(setTheme(theme))
      
        if(token){
            try {
                const res = await axios.post("/verify-token", { token })
                if(res.status === 200){
                    if(res.data.data.settings){
                        dispatch(setCurrency(JSON.parse(res.data.data.settings.currency)))
                    } else {
                        dispatch({
                            type: actionTypes.SET_CHECKED_USER_TOKEN,
                            value: true
                        })
                    }
                    if(res.data.data.settings.defaultBackground){
                        dispatch(setDefaultBackgroundImage(res.data.data.settings.defaultBackground))
                        dispatch(setBackgroundImage(res.data.data.settings.defaultBackground))
                    }
                    delete res.data.data.settings

                    // let activeTodoBoardId = null
                    // const updatedBoards = {}
                    // res.data.data.todoBoards.forEach(board => {
                    //     if(!activeTodoBoardId){
                    //         activeTodoBoardId = board.boardId
                    //     }
                    //     updatedBoards[board.boardId] = {
                    //         ...board,
                    //         ...board.todoBoard,
                    //         todoLists: board.todoBoard.todoLists ?
                    //             arrayToObject(board.todoBoard.todoLists
                    //                 .sort((a, b) => a.index - b.index)
                    //                 .map(list => {
                    //                     return {
                    //                         ...list,
                    //                         todos: list.todos.sort((a, b) => a.index - b.index)
                    //                     }
                    //             }), "id")
                    //             : {}
                    //     }
                    //     delete updatedBoards[board.boardId].todoBoard 
                    // })
                    // dispatch(setUser({
                    //     ...res.data.data,
                    //     todoBoards: updatedBoards,
                    //     activeTodoBoardId
                    // }))

                    dispatch(setUser(res.data.data))
                    // dispatch(setNotes(res.data.data.notes))
                    if(res.data.data.layoutItems){
                        dispatch(setLayouts(res.data.data.layoutItems))
                    }
                }
            } catch(err){
                console.log({
                    err
                })
                dispatch(logoutUser())
            }
        } else {
            dispatch(logoutUser())
        }
    }
}

const getUserLocation = () => {
    return async function(dispatch, getState){
        try {

            const { 
                settings: { locale }
            } = getState()

            let currentWeatherData= null
            // let currentWeatherData = localStorage.getItem("weather")
            if(!currentWeatherData){
                const { data: location } = await axios.get('https://ipapi.co/json/')
                const res = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${location.city.toLowerCase()}&days=2&lang=${locale}`)
                currentWeatherData = res.data
                localStorage.setItem("weather", JSON.stringify(currentWeatherData))
            }
            if(typeof currentWeatherData === "string"){
                currentWeatherData = JSON.parse(currentWeatherData)
            }
            dispatch(setWeather(currentWeatherData))
        } catch(err){
            console.log({
                err
            })
        }
    }
}

const logoutUser = () => {
    return async function(dispatch){
        dispatch({
            type: actionTypes.CLEAR_USER,
        })
    }
}



export {
    initApp
}