import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utils'
import moment from 'moment'

const breakpoints = {
    max: { max: 9999, min: 2001, cols: 24, asset: { size: 6, x: 8 } },
    xxl: { max: 2000, min: 1601, cols: 24, asset: { size: 6, x: 8 } },
    xl:  { max: 1600, min: 1401, cols: 24, asset: { size: 7, x: 8 } },
    lg:  { max: 1400, min: 1201, cols: 20, asset: { size: 7, x: 8 } },
    md:  { max: 1200, min: 1001, cols: 20, asset: { size: 8, x: 10 } },
    sm:  { max: 1000, min: 801, cols: 12, asset: { size: 6, x: 8 } },
    xs:  { max: 800,  min: 501, cols: 12, asset: { size: 6, x: 8 } },
    xxs: { max: 500,  min: 0, cols: 12, asset: { size: 6, x: 0 } },
}

const initialState = {
    dashboard: {
        breakpoints,
        isMananing: false,
        layout: null,
        updated: {
            size: null,
            layout: null
        }
    },
    filters: {
        all: "all",
        this_week:  {
            start: moment().startOf('week').toDate(),
            end: moment().endOf('week').toDate()
        },
        this_month: {
            start: moment().startOf('month').toDate(),
            end: moment().endOf('month').toDate()
        },
        this_year: {
            start: moment().startOf('year').toDate(),
            end: moment().endOf('year').toDate()
        },
        "7_days": {
            start: moment().subtract(7, 'd').toDate(),
            end: moment().toDate()
        },
        "30_days": {
            start: moment().subtract(30, 'd').toDate(),
            end: moment().toDate()
        },
        "3_months": {
            start: moment().subtract(3, 'months').toDate(),
            end: moment().toDate()
        },
        "6_months": {
            start: moment().subtract(6, 'months').toDate(),
            end: moment().toDate()
        },
        "1_year": {
            start: moment().subtract(6, 'year').toDate(),
            end: moment().toDate()
        }
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        default: return state
    }
}

export default reducer