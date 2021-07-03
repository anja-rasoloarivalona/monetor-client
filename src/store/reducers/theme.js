import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utils'

const themes = {
    light: {
        primary: "#0b529a",
        background: "white",
        surface: "#ffffff",
        onSurface: "#313131",
        text: "black",
        textActive: "black",
        error: "red",
        boxShadow: "0px 1px 2px -1px rgb(113 113 113 / 75%)",
        appBackground: "white",
        white: "white",
        form: {
            unfocused: {
                color:  "#5f5f5f",
                border: "#5f5f5f",
                background: "white",
            },
            focused: {
                color: "#5f5f5f",
                border: "#5f5f5f",
                background: "white",
            },
        },
        gradient: function(level){
            return `rgba(0, 0, 0, ${level})`
        }
    },
    dark: {
        primary: "#0b529a",
        background: "#181818",
        surface: "#212121",
        onSurface: "#313131",
        text: "#aaaaaa",
        textActive: "white",
        error: "red",
        boxShadow: "0 0px 6px rgb(0 0 0 / 19%), 0 3px 2px rgb(0 0 0 / 23%)",
        appBackground: "linear-gradient(to bottom right,#070c10 30%,#020d19 100%)",
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
    ...themes.dark
}

const setTheme = (state, action) => {
    return updatedObject(state, {
        type: action.theme,
        ...themes[action.theme]
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_THEME: return setTheme(state, action)
        default: return state
    }
}

export default reducer