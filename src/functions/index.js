import axios from 'axios'

const IP_KEY = process.env.REACT_APP_IP_KEY


const getIpData = async () => {
    try {
       const data = await axios.get(`https://api.ipdata.co?api-key=${IP_KEY}`)
       const resData = data.data
       return resData
    } catch(err){
        console.log(err)
        return null
    }
}

export {
    getIpData
}