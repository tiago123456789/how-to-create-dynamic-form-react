import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Container, Form, Button } from 'reactstrap';
import * as uuid from "uuid"
import validator from 'validator';
import PreviewForm from '../components/PreviewForm';
import Validation from "../constants/validation"

function RenderForm(props) {
    const [form, setForm] = useState(null);
    const [inputs, setInputs] = useState([])
    const [formData, setFormData] = useState({})
    const [errorValidation, setErrorValidation] = useState({})

    const setFormDataInitialState = (form) => {
        const formDataInitialState = {};
        form.inputs.forEach(input => {
            formDataInitialState[input.id] = null
        })
        setFormData(formDataInitialState)
    }

    const getFormById = async (id) => {
        const response = await axios.get(`http://localhost:5000/forms/${id}`)
        setForm(response.data)
        setInputs(response.data.inputs);
        setFormDataInitialState(response.data)
    }

    const getKeyField = (label) => {
        return label.replace(/[?]/g, "").replace(/\s/g, "_").toLowerCase()
    }

    const handlerFormData = (key, value) => {
        setFormData({
            ...formData,
            [key]: value
        })
    }

    useEffect(() => {
        const id = props.match.params.id
        if (id) {
            getFormById(id)
        }
    }, [])

    const validateForm = (formData) => {
        const messages = {};
        const validatorByType = {
            REQUIRED: (value, options) => {
                if (!options) return validator.isLength(value)
                return validator.isLength(value, options)
            },
            EMAIL: (value, options) => {
                if (!options) return validator.isEmail(value)
                return validator.isEmail(value, options)
            },
            DATE: (value, options) => {
                if (!options) return validator.isDate(value)
                return validator.isDate(value, options)
            },
            PASSWORD_WEAK: (value, options) => {
                const regex = options.regex;
                return new RegExp(regex).test(value)
            },
            PASSWORD_STRONGER: (value, options) => {
                const validations = options.regex;
                for(let index = 0; index < validations.length; index++) {
                    const regex = validations[index];
                    const isValid = new RegExp(regex).test(value)
                    if(!isValid) {
                        return false
                    }
                }
                return true;
            }
        }
        const mapInputValidation = {}
        for(let index = 0; index < form.inputs.length; index++) {
            const input = form.inputs[index];
            mapInputValidation[input.id] = input.validate;
        }

        const ids = Object.keys(formData)
        for(let index = 0; index < ids.length; index++) {
            const id = ids[index];
            const validation = (mapInputValidation[id])
            if (!validatorByType[validation.type](formData[id] || "", validation.options)) {
                messages[id] = (Validation.errorMessageByValidation[validation.type])
            }
        }

        return messages;
    }

    const save = async () => {
        const id = props.match.params.id;
        const data = { id: uuid.v4(), form_id: id, formData, form: form }
        const errorValidation = validateForm(formData);
        // {} => []
        const isInvalid = Object.keys(errorValidation).length > 0
        if (isInvalid) {
            setErrorValidation(errorValidation)
            return;
        }
        setErrorValidation({})
        await axios.post(`http://localhost:5000/forms-data`, data)
        setFormData({})
    }

    return (
        <Container>
            <Form>
                <h1>Reply this form</h1>
                <PreviewForm
                    inputs={inputs} formData={formData}
                    getKeyField={getKeyField}
                    handlerFormData={handlerFormData}
                    errorValidation={errorValidation}
                />
                <Button onClick={() => save()}>Save</Button>
            </Form>
        </Container>
    );

}

export default RenderForm