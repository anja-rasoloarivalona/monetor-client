import Input from './Input'
import Select from './Select'
import Category from '../Custom/Category'
import Date from './Date'
import Password from './Password'

export const renderInput = props => {
    const inputType = props.input.input_type;
    switch(inputType){
        case "input":
            return <Input {...props} />
        // case "textarea":
        //     return <TextArea {...props} />
        case "select":
            return <Select {...props}/>
        case "date":
            return <Date {...props}/>
        case "category":
            return <Category {...props} />
        case "password":
            return <Password {...props} />
        default: return
    }
}