import * as actionTypes from './actionTypes'
import { setTheme, setUser, setCurrency } from './index'
import axios from 'axios'
import { getCategories } from './categories'


const initApp = () => {
    return async function(dispatch){
        const token = localStorage.getItem("token")
        const theme = localStorage.getItem("theme")

        dispatch(getCategories())
        dispatch(setTheme(theme))
      
        if(token){
            try {
                const res = await axios.post("/verify-token", { token })
                if(res.status === 200){
                    if(res.data.data.settings){
                        dispatch(setCurrency(JSON.parse(res.data.data.settings.currency)))
                    } else {
                        dispatch({
                            type: actionTypes.SET_CHECKED_USER_TOKEN,
                            value: true
                        })
                    }
                    delete res.data.data.settings
                    const updatedTodos = []
                    if(res.data.data.todoLists){
                        res.data.data.todoLists.forEach(list => {
                            updatedTodos.push({
                                ...list,
                                todos: list.todos ? list.todos.sort((a, b) => a.index - b.index) : []
                            })
                        })
                    }
                    dispatch(setUser({
                        ...res.data.data,
                        todoLists: updatedTodos
                    }))
                }
            } catch(err){
                console.log({
                    err
                })
            }
        } else {
            dispatch({
                type: actionTypes.SET_CHECKED_USER_TOKEN,
                value: true
            })
        }
    }
}

export {
    initApp
}