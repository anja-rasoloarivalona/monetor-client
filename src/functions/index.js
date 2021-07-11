import axios from 'axios'
import { uuid } from 'uuidv4'

const IP_KEY = process.env.REACT_APP_IP_KEY


const arrayToObject = (arr, key) => {
    if(!arr){
        return {}
    }
    if(isArray(arr)){
        const newObject = {}
        arr.forEach(item => {
            newObject[item[key]] = item
        })
        return newObject
    }
    return arr
}

const insertInToArray = (arr, index, newItem) => [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // inserted item
    newItem,
    // part of the array after the specified index
    ...arr.slice(index)
]

const isArray = function(a) {
    return (!!a) && (a.constructor === Array);
};

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

const generateId = () => {
    const id = uuid();
    return id.replace(/-/g, '').toUpperCase();
}




export {
    arrayToObject,
    getIpData,
    generateId,
    insertInToArray
}