import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import * as uuid from "uuid"
import {
  Container, Form, FormGroup,
  Input, Label, Button, Card, CardBody, CardTitle, InputGroup
} from 'reactstrap';
import axios from 'axios';
import PreviewForm from '../components/PreviewForm';

function Create() {
  const inputTypes = {
    "MULTIPLE_OPTION": "option",
    "TEXT": "text",
    "SELECT": "select",
    "TEXTAREA": "textarea",
    "TEXT_EMAIL": "email",
    "TEXT_PASSWORD": "password",
    "DATE": "date",
    "TIME": "time",
  };

  const [inputs, setInputs] = useState([
    {
      id: uuid.v4(),
      type: "",
      labelText: "",
      length: 100,
      options: []
    }
  ]);

  const [formData, setFormData] = useState([])

  const addField = () => {
    setInputs([...inputs, {
      id: uuid.v4(),
      type: "",
      labelText: "",
      options: []
    }
    ])
  }

  const showData = async () => {
    await axios.post("http://localhost:5000/forms", { id: uuid.v4(), inputs })
  }

  const handlerDataEachField = (index, key, value) => {
    const fields = inputs
    fields[index][key] = value;
    setInputs([...inputs])
  }

  const handlerDataEachOption = (indexParent, indexOption, value) => {
    const fields = inputs
    fields[indexParent].options[indexOption] = { id: uuid.v4(), value, label: value }
    setInputs([...inputs])
  }

  const deleteField = (index) => {
    const fields = inputs
    fields.splice(index, 1)
    setInputs([...inputs])
  }

  const deleteFieldOption = (indexParent, indexOption) => {
    const fields = inputs
    fields[indexParent].options.splice(indexOption, 1)
    setInputs([...inputs])
  }

  const addOptionToSpecificField = (index) => {
    const fields = inputs
    fields[index].options.push({ value: "", label: "" });
    setInputs([...inputs])
  }

  const isExistInputs = () => {
    return inputs.length > 0;
  }

  const renderOptions = (item, index) => {
    if (item.type !== inputTypes.SELECT && item.type !== inputTypes.MULTIPLE_OPTION) {
      return false;
    }

    return (
      <FormGroup>
        <Label for="exampleEmail">
          Opções?
    </Label>
        <br />
        <Button className="mb-2" onClick={() => addOptionToSpecificField(index)}>
          Adicionar novo opção
    </Button>

        {
          item.options.map((option, indexOption) => {
            return (
              <>
                <br />
                <InputGroup>
                  <Input
                    value={option.value}
                    onChange={(event) => handlerDataEachOption(index, indexOption, event.target.value)}
                  />
                  <Button color="danger" onClick={() => deleteFieldOption(index, indexOption)}>Remover</Button>
                </InputGroup>
              </>
            )
          })
        }

      </FormGroup>
    )
  }

  const renderTypeOptions = () => {
    return Object.keys(inputTypes).map(key => {
      return (
        <option value={inputTypes[key]}>
          {inputTypes[key]}
        </option>
      )
    })
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

  return (
    <Container>
      <Form>
        <br />
        <Button onClick={() => addField()}>Adicionar novo campo</Button>&nbsp;
        <Button onClick={() => showData()}>Save</Button>
        <br />
        <br />
        {isExistInputs() &&
          inputs.map((item, index) => {
            return (
              <Card className="mb-2" key={index}>
                <CardTitle tag="h5" style={{ margin: "5px" }}>
                  <Button onClick={() => deleteField(index)}>
                    Remover
                  </Button>
                </CardTitle>
                <CardBody>
                  <FormGroup>
                    <Label for="exampleEmail">
                      Qual tipo de campo?
                    </Label>
                    <Input
                      id="type"
                      name="select"
                      type="select"
                      value={item.type}
                      onChange={(event) => handlerDataEachField(index, "type", event.target.value)}
                    >
                      {renderTypeOptions()}
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail">
                      Qual texto da label?
                </Label>
                    <Input
                      id="label"
                      name="text"
                      type="text"
                      value={item.labelText}
                      onChange={(event) => handlerDataEachField(index, "labelText", event.target.value)}
                    />
                  </FormGroup>
                  {renderOptions(item, index)}
                </CardBody>
              </Card>
            )
          })
        }
      </Form>

      <br/>
      <br/>
      <Form>
        <h1>Preview form</h1>
        <PreviewForm
           inputs={inputs} formData={{}}
           getKeyField={getKeyField} 
           handlerFormData={handlerFormData}
        />
      </Form>
    </Container>
  );
}

export default Create;
