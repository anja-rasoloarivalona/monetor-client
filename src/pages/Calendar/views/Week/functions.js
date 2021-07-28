import moment from "moment"

const addDays = function(d, days) {
    const date = new Date(d);
    date.setDate(date.getDate() + days);
    return date;
}
const getPeriod = props => {
    const date = new Date(props)
    const day = date.getDay() === 0 ? 6 : date.getDay() - 1
    return {
        range: {
            start: new Date(moment(date).set('hour', 0).set('minute', 0)),
            end: new Date(moment(date).set('hour', 23).set('minute', 59)),
        },
        formatted: moment(date).format("DD-MM-YYYY"),
        day,
        date
    }
}

const isInRange = (item, range) => {
    if(!item.dueDate) return false
    const date = new Date(item.dueDate)
    if(date <= new Date(range.end) && date >= new Date(range.start)){
        return true
    }
    return false
}

const getInRangeTodoLists = (todoLists, range) => {
    const data = []
    Object.keys(todoLists).forEach(listId => {
        const list = todoLists[listId]
        list.todos.forEach(todo => {
            if(isInRange(todo, range)){
                data.push(todo)
            }
            if(todo.checkList){
                todo.checkList.forEach(listItem => {
                    if(isInRange(listItem, range)){
                        data.push(listItem)
                    }
                })
            }
        })
    })
    return data
}

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
    addDays,
    getPeriod,
    getInRangeTodoLists,
    getHoursDate
}