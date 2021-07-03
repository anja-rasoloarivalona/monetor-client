import * as actionTypes from './actionTypes'
import { setTheme, setUser } from './index'
import axios from 'axios'

const initApp = () => {
    return async function(dispatch){
        const token = localStorage.getItem("token")
        const theme = localStorage.getItem("theme")

        if(token){
            try {
                const res = await axios.post("/verify-token", { token })
                if(res.status === 200){
                    dispatch(setUser(res.data.data))
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