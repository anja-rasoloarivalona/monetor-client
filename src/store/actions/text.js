import * as actionTypes from './actionTypes'
import { getText } from '../../text'

const setText = page => {
    return function(dispatch, getState){
        const {
            settings: { locale }
        } = getState()
        const text = getText(locale, page)

        console.log({
            textPage: text.page
        })

        dispatch({
            type: actionTypes.SET_TEXT,
            text
        })
    }
}

export {
    setText
}