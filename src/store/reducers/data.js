import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utils'

const initialState = {
    frequencies: {
        per_day: {
            locale: {
                en: "Per day",
                fr: "Par jour"
            },
            unit: {
                en: "day",
                fr: "jour"
            }
        },
        per_week: {
            locale: {
                en: "Per week",
                fr: "Par semaine"
            },
            unit: {
                en: "week",
                fr: "semaine"
            }
        },
        per_month: {
            locale: {
                en: "Per month",
                fr: "Par mois"
            },
            unit: {
                en: "month",
                fr: "mois"
            }
        },
        per_year: {
            locale: {
                en: "Per year",
                fr: "Par an"
            },
            unit: {
                en: "year",
                fr: "an"
            }
        }
    }
}


const reducer = (state = initialState, action) => {
    switch(action.type){
        default: return state
    }
}

export default reducer
