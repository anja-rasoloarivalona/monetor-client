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
                    dispatch(setCurrency(JSON.parse(res.data.data.settings.currency)))
                    dispatch(setUser(res.data.data))
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                }
            } catch(err){
                console.log({
                    err
                })
            }
        }
    }
}

export {
    initApp
}