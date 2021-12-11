import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Container, Form, Button } from 'reactstrap';
import * as uuid from "uuid"
import PreviewForm from '../components/PreviewForm';

function RenderForm(props) {
    const [inputs, setInputs] = useState([])
    const [formData, setFormData] = useState({})

    const getFormById = async (id) => {
        const response = await axios.get(`http://localhost:5000/forms/${id}`)
        setInputs(response.data.inputs);
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

    const save = async () => {
        const id = props.match.params.id;
        const data = { id: uuid.v4(), form_id: id, formData }
        await axios.post(`http://localhost:5000/forms-data`, data)
        console.log(data);
    }

    return (
        <Container>
             <Form>
        <h1>Reply this form</h1>
        <PreviewForm
             inputs={inputs} formData={formData}
             getKeyField={getKeyField}
             handlerFormData={handlerFormData}
        />
        <Button onClick={() => save()}>Save</Button>
      </Form>
        </Container>
    );

}

export default RenderForm