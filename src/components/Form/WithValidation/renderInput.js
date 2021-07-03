import Input from './Input'
import Select from './Select'

export const renderInput = props => {
    const inputType = props.input.input_type;
    switch(inputType){
        case "input":
            return <Input {...props} />
        // case "textarea":
        //     return <TextArea {...props} />
        case "select":
            return <Select {...props}/>
        // case "date":
        //     return <DatePicker {...props}/>
        // case "category":
        //     return <CategoryInput {...props} />
        default: return
    }
}