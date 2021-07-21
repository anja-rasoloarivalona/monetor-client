import * as actionTypes from './actionTypes'

const setForm = data => {
    return {
        type: actionTypes.SET_FORM,
        data
    }
}

export {
    setForm
}