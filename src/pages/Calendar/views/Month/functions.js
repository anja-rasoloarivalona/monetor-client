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

const isInRange = (item, current ) => {
    if(!item.dueDate) return false
    const date = new Date(item.dueDate)
    if(date <= new Date(current.end) && date >= new Date(current.start)){
        return true
    }
    return false
}

const getInRangeTodoLists = (todoLists, current, unitType ) => {

    const data = []
    const layout = []
    Object.keys(todoLists).forEach(listId => {
        const list = todoLists[listId]
        list.todos.forEach(todo => {
            if(isInRange(todo, current )){
                data.push(todo)
            }
            if(todo.checkList){
                todo.checkList.forEach(listItem => {
                    if(isInRange(listItem, current)){
                        data.push(listItem)
                    }
                })
            }
        })
    })
    data.forEach(item => {
        const date = new Date(item.dueDate)
        const configData = {
            day: date.getDay() ,
            ...getHourData(date, unitType)
        }
        const pos = {
            x: configData.day * 2,
            y: configData.hour * 2,
            w: 2,
            h: 1,
            i: item.id
        }
        layout.push({
            ...pos,
            item,
            configData
        })
    })
    return layout
}


export {
    getHoursDate,
    getHourData,
    getInRangeTodoLists
}