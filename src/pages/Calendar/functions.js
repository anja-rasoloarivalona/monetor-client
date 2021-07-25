import moment from 'moment'

const getHoursDate = type => {
    const res = []
    if(type === "imperial"){
        const times = ["AM", "PM"]
        times.forEach(t => {
            for(let i = 1; i < 13; i++){
                res.push(`${i} ${t}`)
            }
        })
    }
    return res
}

const getHourData = (date, type) => {
    let [ h, m ] = moment(date).format("HH-MM").split('-')
    let hour = parseInt(h)
    let min = parseInt(m)
    if(type === "imperial"){
        return {
            hourText: `${hour % 12} ${hour > 12 ? "PM" : "AM"}`,
            min,
            hour
        }
    }
}

export {
    getHoursDate,
    getHourData
}