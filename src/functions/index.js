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

const formatDate = (date, format, language, monthText) => {

    const months = {
        fr: [
            {short: "Jan",  long: "Janvier"},
            {short: "Fev", long: "Février"},
            {short: "Mars", long: "Mars"},
            {short: "Avr", long: "Avril"},
            {short: "Mai", long: "Mai"},
            {short: "Juin", long: "Juin"},
            {short: "Jui", long: "Juillet"},
            {short: "Août", long: "Août"},
            {short: "Sept", long: "Septembre"},
            {short: "Oct", long: "Octobre"},
            {short: "Nov", long: "Novembre"},
            {short: "Dec", long: "Décembre"},
        ],
        en: [
            {short: "Jan",  long: "January"},
            {short: "Feb", long: "February"},
            {short: "Mar", long: "March"},
            {short: "Apr", long: "April"},
            {short: "May", long: "May"},
            {short: "June", long: "June"},
            {short: "Jul", long: "July"},
            {short: "Aug", long: "August"},
            {short: "Sept", long: "September"},
            {short: "Oct", long: "October"},
            {short: "Nov", long: "November"},
            {short: "Dec", long: "December"},
        ]
    }

    const parsedDate = new Date(date)
    const formatArray = format.replace(/[^a-z]/gi, ' ').split(' ');

    for (let i = 0; i < formatArray.length; i++) {
        switch (formatArray[i]) {
            case 'hh':
                format = format.replace('hh', `${parsedDate.getHours()}`);
                break;
            case 'min':
                let minutes = parsedDate.getMinutes();
                minutes = minutes < 10 ? ('0' + minutes) : minutes;
                format = format.replace('min', `${minutes}`);
                break;
            case 'sec':
                let seconds = parsedDate.getSeconds();
                seconds = seconds < 10 ? ('0' + seconds) : seconds;
                format = format.replace('sec', `${seconds}`);
                break;
            case 'dd':
                let days = parsedDate.getDate();
                days = days < 10 ? ('0' + days) : days;
                format = format.replace('dd', `${days}`);
                break;
            case 'mm':
                if(monthText){
                    format = format.replace('mm', `${months[language][parsedDate.getMonth()][monthText]}`);
                } else {
                    format = format.replace('mm', `${parsedDate.getMonth() + 1}`);
                }
                break;
            case 'yy':
                format = format.replace('yy', `${parsedDate.getFullYear()}`);
                break;
            case 'yyyy':
                format = format.replace('yyyy', `${parsedDate.getFullYear()}`);
                break;
            default:
                break;
        }
    }
    return format;
}

const renderAmount = (amount, locale, currency) => {
    if(locale === "fr"){
        return `${parseInt(amount.toFixed(2))}${currency}`
    } else {
        return `${currency}${parseInt(amount.toFixed(2))}`
    }
}


export {
    arrayToObject,
    getIpData,
    generateId,
    insertInToArray,
    formatDate,
    isArray,
    renderAmount
}