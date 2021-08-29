import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utils'




const dynamicThemes = {
    light: {
        withBG: {
            line: "#e8e6e6",
            text: "#141414",
            dynamicText: "#ffffff",
            textLight: "#7d7d7d",
            dynamicTextLight: "#cccccc",
            tSurface: function(level){
                return `rgba(55, 55, 55, ${level})`
            }
        },
        withoutBG: {
            line: "#afafaf",
            text: "#141414",
            dynamicText: "#141414",
            textLight: "#969696",
            dynamicTextLight: "#969696",
            tSurface: function(level){
                return `rgba(255, 255, 255, ${level})`
            }
        }
    },
    dark: {
        withBG: {
            line: "#FFFFFF",
            tSurface: function(level){
                return `rgba(55, 55, 55, ${level})`
            }
        },
        withoutBG: {
            line: "#CCCCCC",
            tSurface: function(level){
                return `rgba(255, 255, 255, ${level})`
            }
        }
    }
}

const themes = {
    light: {
        primary: "#2d2d2d",
        primaryLight: "#e7eef5",
        primaryGradient: "linear-gradient(202deg, rgba(9,66,123,1) 36%, rgba(11,82,154,1) 100%)",
        secondary: "#478ab1",
        background: "#F9F9F9",
        surface: "#FFFFFF",
        onSurface: "#EAEAEA",

        white: "#ffffff",
        offWhite: "#e8e6e6",
        transparentSurface: "rgba(55, 55, 55, .5)",
        secondarySurface: "#c3c3c3",
        error: "red",
        green: "green",
        boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
        boxShadowLight: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
        boxShadowExtraLight: "0 1px 0 rgb(9 30 66 / 25%)",
        homeBackground: "#ffffff",
        form: {
            unfocused: {
                color:  "#5f5f5f",
                border: "#cccccc",
                background: "#ffffff",
                withBackgroundImage: {
                    border: "#616161"
                }
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
        primaryGradient: "linear-gradient(202deg, rgba(9,66,123,1) 36%, rgba(11,82,154,1) 100%)",
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
    const theme = ["light", "dark"].includes(action.theme) ? action.theme : "light"
    localStorage.setItem("theme", theme)
    const dynamicType = state.backgroundImage ? "withBG" : "withoutBG"
    return updatedObject(state, {
        type: theme,
        ...themes[theme],
        ...dynamicThemes[theme][dynamicType]
    })
}

const setBackgroundImage = (state, action) => {
    if(action.image){
        return updatedObject(state, {
            backgroundImage: action.image,
            ...dynamicThemes[state.type].withBG
        })
    } else {
        return updatedObject(state, {
            backgroundImage: null,
            ...dynamicThemes[state.type].withoutBG
        })
    }
}


const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_THEME: return setTheme(state, action);
        case actionTypes.SET_BACKGROUND_IMAGE: return setBackgroundImage(state, action)
        default: return state
    }
}

export default reducer