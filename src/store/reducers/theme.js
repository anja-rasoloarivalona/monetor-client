import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utils'

const themes = {
    light: {
        primary: "#0b529a",
        secondary: "#478ab1",
        background: "#f3f3f3",
        surface: "#ffffff",
        transparentSurface: "rgba(55, 55, 55, .5)",
        onSurface: "#eaeaea",
        text: "rgb(20, 20, 20)",
        textLight: "grey",
        error: "red",
        white: "#ffffff",
        green: "green",
        boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
        boxShadowLight: "0 1px 0 rgb(9 30 66 / 25%)",
        homeBackground: "#ffffff",
        form: {
            unfocused: {
                color:  "#5f5f5f",
                border: "#cccccc",
                background: "#ffffff",
            },
            focused: {
                color: "#5f5f5f",
                border: "#5f5f5f",
                background: "#ffffff",
            },
        },
        disabled: {
            background: "grey",
            color: "#ffffff"
        },
        gradient: function(level){
            return `rgba(0, 0, 0, ${level})`
        }
    },
    dark: {
        primary: "#0b529a",
        secondary: "#478ab1",
        background: "#181818",
        surface: "#212121",
        onSurface: "#313131",
        text: "#aaaaaa",
        textLight: "white",
        error: "red",
        white: "#ffffff",
        green: "green",
        boxShadow: "0 0px 6px rgb(0 0 0 / 19%), 0 3px 2px rgb(0 0 0 / 23%)",
        homeBackground: "linear-gradient(to bottom right,#070c10 30%,#020d19 100%)",
        form: {
            unfocused: {
                color:  "#5f5f5f",
                border: "#3c3c3c",
                background: "#212121",
            },
            focused: {
                color: "white",
                border: "white",
                background: "#212121",
            },
        },
        disabled: {
            background: "grey",
            color: "white"
        },
        gradient: function(level){
            return `rgba(255, 255, 255, ${level})`
        }
    }
}


const initialState = {
    type: "dark",
    backgroundImage: null,
    ...themes.dark
}

const setTheme = (state, action) => {
    localStorage.setItem("theme", action.theme)
    return updatedObject(state, {
        type: action.theme,
        ...themes[action.theme]
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_THEME: return setTheme(state, action);
        case actionTypes.SET_BACKGROUND_IMAGE: return updatedObject(state, {backgroundImage: action.image})
        default: return state
    }
}

export default reducer