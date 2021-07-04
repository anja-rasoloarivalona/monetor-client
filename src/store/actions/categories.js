import * as actionTypes from './actionTypes'
import axios from 'axios'

const setCategories = categories => {
    return {
        type: actionTypes.SET_CATEGORIES,
        categories
    }
}

const formatLocal = data => {
    const res = { ...data, locale: {}}
    data.locale.forEach(i => res.locale[i.locale] = i )
    return res
}


const formatChildren = (children, type) => {
    const formatted = {}
    children.forEach(child => {
        formatted[child.id] = {
            ...formatLocal(child),
            type,
        }
    })
    return formatted
}



const getCategories = () => {
    return async function(dispatch, getState){
        try {
            const res = await axios.get("/categories")
            const { data } = res.data
            const categories = {
                income: {},
                expense: {}
            }
            data.forEach(category => {
                if(category.categoryType === "income"){
                    categories.income = {
                        ...formatLocal(category),
                        children: formatChildren(category.children, "income")
                    }
                } else {
                    categories.expense[category.id] = {
                        ...formatLocal(category),
                        children: formatChildren(category.children, "expense")
                    }
                }
            })
            dispatch(setCategories(categories))
        } catch(err){
            console.log(err)
        }
    }
}

export {
    getCategories
}
