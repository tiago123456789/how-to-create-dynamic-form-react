import React from "react"
import { FormGroup, Input, Label, Button } from 'reactstrap';

const PreviewForm = ({ formData, inputs, handlerFormData, getKeyField }) => {
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
            </FormGroup>
        )
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
            </FormGroup>
        )
    })
}

export default PreviewForm;