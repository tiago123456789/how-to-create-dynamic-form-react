import React from "react"
import { FormGroup, Input, Label } from 'reactstrap';

const PreviewForm = ({
    errorValidation, 
    formData, inputs, handlerFormData, getKeyField 
}) => {
    const renderManyOptions = (item) => {
        return (
            <FormGroup>
                <Label for="">
                    {item.labelText}
                </Label>
                <div>
                    {
                        item.options.map(option => {
                            return (
                                <>
                                &nbsp;
                                { (option.value == formData[item.id]) 
                                    ?  <Input 
                                    style={{ padding: "10px" }}
                                    type="checkbox" 
                                    checked
                                    onClick={(event) => handlerFormData(item.id, option.value)} 
                                />
                                    :  <Input 
                                    style={{ padding: "10px" }}
                                    checked={false}
                                    type="checkbox" 
                                    onClick={(event) => handlerFormData(item.id, option.value)} 
                                />
                                }   
                                &nbsp;
                                <Label>
                                    {option.label}
                                </Label>
                                <br/>
                                &nbsp;
                                </>
                            )
                        })
                    }

                </div>
                { renderErrorValidation(item)}
            </FormGroup>
        )
    }

    const isExistErrorValidation = (inputId) => {
        if (!errorValidation[inputId]) {
            return false;
        }
        return true;
    }

    const renderErrorValidation = (item) => {
        if (!isExistErrorValidation(item.id)) return false;
        return (<span className="text-danger">{errorValidation[item.id]}</span>);
    }

    return inputs.map(item => {
        if (item.type === "option") {
            return renderManyOptions(item);
        }
        return (
            <FormGroup>
                <Label for="">
                    {item.labelText}
                </Label>
                <Input
                    id="type"
                    name={getKeyField(item.labelText)}
                    type={item.type}
                    value={formData[item.id]}
                    onChange={(event) => handlerFormData(item.id, event.target.value)}
                >
                    <option>Select one value</option>
                    {
                        item.options.map(option => {
                            return <option value={option.value}>{option.label}</option>
                        })
                    }
                </Input>
                { renderErrorValidation(item)}
                
            </FormGroup>
        )
    })
}

export default PreviewForm;