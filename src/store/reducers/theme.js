import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utils'

const themes = {
    light: {
        primary: "#2E3E4E",
        background: "white",
        surface: "#ffffff",
        onSurface: "#313131",
        text: "black",
        textActive: "grey",
        error: "red",
        boxShadow: "0px 1px 2px -1px rgb(113 113 113 / 75%)",
        appBackground: "white",
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
        primary: "#2E3E4E",
        background: "#202020",
        surface: "#13161b",
        onSurface: "#313131",
        text: "white",
        textActive: "#e8e8e8",
        error: "red",
        boxShadow: "0px 1px 2px -1px rgb(113 113 113 / 75%)",
        appBackground: "linear-gradient(to bottom right,#070c10 30%,#020d19 100%)",
        form: {
            unfocused: {
                color:  "#5f5f5f",
                border: "#3c3c3c",
                background: "#13161b",
            },
            focused: {
                color: "white",
                border: "white",
                background: "#13161b",
            },
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