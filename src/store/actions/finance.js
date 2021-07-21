import * as actionTypes from './actionTypes'
import moment from 'moment'

const setFinancialFilters = () => {
    return async function(dispatch, getState){
        const {
            text: { text }
        } = getState()

        const  filters = {
            all: {
                label: text.all
            },
            this_week:  {
                start: moment().startOf('week').toDate(),
                end: moment().endOf('week').toDate(),
                label: text.this_week
            },
            this_month: {
                start: moment().startOf('month').toDate(),
                end: moment().endOf('month').toDate(),
                label: text.this_month
            },
            this_year: {
                start: moment().startOf('year').toDate(),
                end: moment().endOf('year').toDate(),
                label: text.this_year
            },
            "7_days": {
                start: moment().subtract(7, 'd').toDate(),
                end: moment().toDate(),
                label: `7 ${text.days}`,
            },
            "30_days": {
                start: moment().subtract(30, 'd').toDate(),
                end: moment().toDate(),
                label: `30 ${text.days}`,
            },
            "3_months": {
                start: moment().subtract(3, 'months').toDate(),
                end: moment().toDate(),
                label: `3 ${text.months}`,

            },
            "6_months": {
                start: moment().subtract(6, 'months').toDate(),
                end: moment().toDate(),
                label: `6 ${text.months}`,
            },
            "1_year": {
                start: moment().subtract(6, 'year').toDate(),
                end: moment().toDate(),
                label: `1 ${text.year}`,
            }
        }

        dispatch({
            type: actionTypes.SET_FINANCIAL_FILTERS,
            filters
        })
    }
}

export {
    setFinancialFilters
}