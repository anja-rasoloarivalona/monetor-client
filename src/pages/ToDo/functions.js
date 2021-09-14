import _ from 'lodash'

const getTextWidth = (content, type) => {
    let text = document.createElement(type);
    document.body.appendChild(text);
    text.style.font = "roboto";
    text.style.fontSize = 14 + "px";
    text.style.height = 'auto';
    text.style.width = 'auto';
    text.style.position = 'absolute';
    text.style.whiteSpace = 'no-wrap';
    text.innerHTML = content;
    let width = Math.ceil(text.clientWidth);

    document.body.removeChild(text);
    return width
}

const getDescriptionLines = (content, w) => {
    let nbLine = 0
    const arr = content.split(/(\r\n|\n|\r)/gm).filter(i => i !== "<ul>" && i!== "</ul>" && i !== "\n")
    arr.forEach(i => {
        const text = i.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, '');
        const type = i.includes('<li>') && i.includes('</li>') ? "li" : "p"
        if(type === "li" && nbLine > 1){
            return nbLine
        } else {
            const width = getTextWidth(text, type)
            width < w ? nbLine +=1 : nbLine += Math.ceil(width / w) 
        }
    })
    return nbLine
}


const getLabelWidth = (content) => {
    let label = document.createElement("div")
    document.body.appendChild(label);
    label.style.font = "roboto";
    label.style.fontSize = 12 + "px";
    label.style.height = 'auto';
    label.style.width = 'max-content';
    label.style.position = 'absolute';
    label.style.whiteSpace = 'no-wrap';
    label.style.padding =  "0 15px";
    label.innerHTML = content;
    let width = Math.ceil(label.clientWidth);
    console.log({
        label,
        content
    })
    document.body.removeChild(label);
    return width
}


const getLabelsLine = (labels, w, boardLabels) => {
    let line = 1
    let currentLineWidth = 0

    labels.forEach(label => {
        const currentLabel = boardLabels.find(i => i.id === label.id)
        if(currentLabel){
            const currentLabelWidth = getLabelWidth(currentLabel.title) + 5
            if(currentLineWidth + currentLabelWidth < w){
                currentLineWidth += currentLabelWidth
            } else {

            }

            console.log({
                label,
                currentLabel,
                width: getLabelWidth(currentLabel.title)
            })
        }
    
    })
}


const getTodoConfig = (todo, [listIndex, todoIndex, width], boardLabels) => {
    const hasCheckList = !_.isEmpty(todo.checkList)
    const hasLabel = !_.isEmpty(todo.todoLabels)
    const hasDueDate = todo.dueDate

    let dueDateH = hasDueDate ? 4 : 0
    let labelH = hasLabel ? 4 : 0
    let coverH = todo.coverImage ? 4 : 0

    let h = 6

    const metadata = {
        description: 0
    }

    if(todo.description){
        const descriptionH = Math.min((getDescriptionLines(todo.description, width) * 2), 6) + 2 // descriptionText max height: 6rem ---- description padding: 2rem
        h += descriptionH
        metadata.description = descriptionH
    }

    if(hasLabel){

        const labelsH = getLabelsLine(todo.todoLabels, width, boardLabels)

        console.log({
            todo
        })

    }

    return {
        x: listIndex,
        y: todoIndex,
        // h: h + detailH + labelH + coverH,
        h: h + labelH + dueDateH,
        w: 1,
        i: todo.id,
        isResizable: false,
        todo: {
            ...todo,
            metadata
        }
        
    }
}

export {
    getTodoConfig
}