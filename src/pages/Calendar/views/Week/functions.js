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
                data.push({
                    ...todo,
                    boardId: list.boardId
                })
            }
            if(todo.checkList){
                todo.checkList.forEach(listItem => {
                    if(isInRange(listItem, range)){
                        data.push({
                            ...listItem,
                            boardId: list.boardId
                        })
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
    if(type === "metric"){
        for(let i = 1; i < 25; i++){
            res.push(`${i}h`)
        }
    }
    return res
}

const addPeriods = (periods, number) => {

    const periodsCopy = periods.map(period => ({ ...period }))

    const factor = number < 0 ? -1 : 1
    const start = number < 0 ? periods[0].date : periods[periods.length - 1].date

    const initialIndex = periods[0].index.index

    const dates = []
    for(let i = 1; i < Math.abs(number) + 1; i++){
        dates.push({
            ...getPeriod(addDays(start, i * factor))
        })
    }

    const sortedDates = dates.sort((a, b) => a.date - b.date)
    const all = number < 0 ? [...sortedDates, ...periodsCopy] : [...periodsCopy, ...sortedDates]

    all.forEach((period, pIndex) => {
        if(!period.index){
            all[pIndex].index = {
                index: initialIndex - ( Math.abs(number) - pIndex ),
                pos: pIndex
            }
        } else {
            all[pIndex].index.pos = pIndex
        }
    })

    return all
}

export {
    addDays,
    addPeriods,
    getPeriod,
    getInRangeTodoLists,
    getHoursDate
}