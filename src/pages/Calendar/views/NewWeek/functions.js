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
    // const _layout = []
    // data.forEach(item => {
    //     const date = new Date(item.dueDate)
    //     _layout.push({
    //         i: item.id,
    //         x: 0,
    //         y: date.getHours(),
    //         w: 1,
    //         h: 1,
    //         item
    //     })
    // })
    // setLayout(_layout)
}


export {
    addDays,
    getPeriod,
    getInRangeTodoLists
}