import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utils'

const breakpoints = {
    max: { max: 9999, min: 2001, cols: 24, wallet: { size: 6, x: 8 } },
    xxl: { max: 2000, min: 1601, cols: 24, wallet: { size: 6, x: 8 } },
    xl:  { max: 1600, min: 1401, cols: 24, wallet: { size: 7, x: 8 } },
    lg:  { max: 1400, min: 1201, cols: 20, wallet: { size: 7, x: 8 } },
    md:  { max: 1200, min: 1001, cols: 20, wallet: { size: 8, x: 10 } },
    sm:  { max: 1000, min: 801, cols: 12, wallet: { size: 6, x: 8 } },
    xs:  { max: 800,  min: 501, cols: 12, wallet: { size: 6, x: 8 } },
    xxs: { max: 500,  min: 0, cols: 12, wallet: { size: 6, x: 0 } },
}


const initialState = {
    breakpoints,
    transactions: {
        layout: null
    },
    main: {
        layout: null
    }
}


const setLayouts = (state, action) => {
    const { layouts } = action
    const updatedState = {
        transactions: {
            layout: {}
        },
        main: {
            layout: {}
        }
    }
     layouts.forEach(item => {
        if(updatedState[item.layout].layout[item.breakpoint]){
            updatedState[item.layout].layout[item.breakpoint].push({...item, display: true})
        } else {
            updatedState[item.layout].layout[item.breakpoint] = [{...item, display: true}]
        }
    })
    return updatedObject(state, {...updatedState})
}


const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_DASHBOARD_LAYOUTS: return setLayouts(state, action)
        default: return state
    }
}

export default reducer
