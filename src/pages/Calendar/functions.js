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

export {
    getHoursDate
}