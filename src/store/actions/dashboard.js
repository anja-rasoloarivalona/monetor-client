import * as actionTypes from './actionTypes'

const setLayouts = layouts => {
    return {
        type: actionTypes.SET_DASHBOARD_LAYOUTS,
        layouts
    }
}

export {
    setLayouts
}