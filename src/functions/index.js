import axios from 'axios'
import { uuid } from 'uuidv4'
import moment from 'moment'
import { isFirefox } from 'react-device-detect'
import imageCompression from 'browser-image-compression';

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
                if(language === "en"){
                    const hour = parsedDate.getHours()
                    const displayedHour = hour > 12 ? hour % 12 : hour
                    format = format.replace('hh', displayedHour)
                } else {
                    format = format.replace('hh', `${parsedDate.getHours()}`);
                }
                break;
            case 'min':
                let minutes = parsedDate.getMinutes();
                minutes = minutes < 10 ? ('0' + minutes) : minutes;
                if(language === "en"){
                    const hour = parsedDate.getHours()
                    const hourType = hour > 12 ? "PM" : "AM"
                    format = format.replace('min', `${minutes} ${hourType}`);
                } else {
                    format = format.replace('min', `${minutes}`);
                }
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

const getTimeStamp = (_timestamp, locale, custom) => {

    const weekDays = [
        {fr: "dim", en: "Sun"},
        {fr: "lun", en: "Mon"},
        {fr: "mar", en: "Tue"},
        {fr: "mer", en: "Wed"},
        {fr: "jeu", en: "Thu"},
        {fr: "ven", en: "Wed"},
        {fr: "sam", en: "Sat"},
    ]

    const timestamp = new Date(_timestamp)
    const today = moment(new Date()) 
    const time = moment(timestamp, 'ddd DD-MMM-YYYY, hh:mm A').format('hh:mm A') 
    const date = moment(timestamp)


    const diffDays = moment.duration(today.diff(date)).asDays();
    const diffMinutes = moment.duration(today.diff(date)).asMinutes()
    const diffHours = moment.duration(today.diff(date)).asHours()

    const trailingLabel = custom && custom.label ? `${custom.label} ` : ""

    if(diffMinutes <= 2){
        if(locale === "fr"){
            return `${trailingLabel}maintenant`
        } else {
            return `${trailingLabel}now`
        }
    }

    if(diffMinutes < 60){
        if(locale === "fr"){
            return `${trailingLabel}il y a ${parseInt(diffMinutes)}min`
        } else {
            return `${trailingLabel}${parseInt(diffMinutes)} min ago`
        }
    }

    if(diffHours < 24){
        if(locale === "fr"){
            return `${trailingLabel}il y a ${parseInt(diffHours)}h`
        } else {
            return `${trailingLabel}${parseInt(diffHours)}h ago`
        }
    }

    if(diffDays < 5){
        const day =  weekDays[date.day()][locale]
        return trailingLabel + day + " " + time
    }
    const fulldate = formatDate(timestamp, "dd/mm/yy", locale)
    return trailingLabel + fulldate + " - " + time
}


const sortMessages = (messages, locale) => {
    const group = []
    messages.forEach(currentMessage => {
        group.push({
            ...currentMessage,
            timestamp: getTimeStamp(currentMessage.createdAt, locale)
        })
    })
    const sortedGroup = group.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt ))
    const formattedGroup = []
    sortedGroup.forEach(msg => {
        if(formattedGroup.length === 0){
            formattedGroup.push([msg])
        } else {
            const lastIndex = formattedGroup.length - 1
            if(formattedGroup[lastIndex][0].fromId === msg.fromId){
                formattedGroup[lastIndex].push(msg)
            } else {
                formattedGroup.push([msg])
            }
        }
    })
    return formattedGroup
}


const disableScroll = () => {
    document.body.style.overflowY = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.height = '100%'
}

const enableScroll = () => {
    document.body.style.overflowY = isFirefox ? 'auto' : 'overlay'
    document.body.style.position = 'initial'
    document.body.style.height = 'initial'
}

const urlIsValid = str => {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}

const compressImageFile = async file => {
    const options = {
        maxSizeMb: 2
    }
    try {
        console.log('compressedFile instanceof Blob', file instanceof Blob); // true
        const compressedFile = await imageCompression(file, options);
        console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
        return compressedFile
      } catch (error) {
        console.log(error);
        return error
      }
}

export {
    enableScroll,
    disableScroll,
    arrayToObject,
    getIpData,
    generateId,
    insertInToArray,
    formatDate,
    isArray,
    renderAmount,
    getTimeStamp,
    sortMessages,
    urlIsValid,
    compressImageFile
}