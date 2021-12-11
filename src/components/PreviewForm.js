import React from "react"
import { FormGroup, Input, Label } from 'reactstrap';

const PreviewForm = ({ formData, inputs, handlerFormData, getKeyField }) => {
    return inputs.map(item => {
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