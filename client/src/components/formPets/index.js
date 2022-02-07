import React from 'react'
import { Formik } from 'formik'
import { Input, Button } from '../'
import { SelectContainer, Container } from './styled'

const initialValues = {
  'name': '',
  'age': 0,
  'breed': 'Pastor Alemán',
  'size': "small",
}

const FormPets = ({ submitForm, setShowForm }) => {
  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={logInValidation}
      onSubmit={(props) => {
        submitForm(props)
      }}
    >
      {({
        values,
        errors,
        handleChange,
        handleSubmit,
        handleBlur,
        isSubmitting,
        isValid
      }) => (
        <Container>
          <Input
            error={errors.name}
            label='Nombre'
            name='name'
            onBlur={handleBlur}
            onChange={handleChange}
            type='text'
            value={values.name}
          />
          <Input
            error={errors.age}
            label='Edad'
            name='age'
            onBlur={handleBlur}
            onChange={handleChange}
            type='text'
            value={values.age}
          />
          <SelectContainer>
            <label>
              {`Raza`}
            </label>
            <select
              name="breed"
              value={values.breed}
              onChange={handleChange}
            >
              <option value="Pastor Alemán">Pastor Alemán</option>
              <option value="Chihuahua">Chihuahua</option>
              <option value="Poddle">Poddle</option>
              <option value="Labrador Retrieve">Labrador Retrieve</option>
            </select>
          </SelectContainer>
          <SelectContainer>
            <label>
              {`Tamaño`}
            </label>
            <select
              name="size"
              value={values.size}
              onChange={handleChange}
            >
              <option value="small">Pequeño</option>
              <option value="medium">Mediano</option>
              <option value="big">Grande</option>
            </select>
          </SelectContainer>
          <SelectContainer>
            <Button
              // disabled={!isValid || isSubmitting}
              onPress={handleSubmit}
            >
              Registrar
            </Button>
            <Button
              onPress={() => setShowForm(false)}
              secondary
            >
              Cancelar
            </Button>
          </SelectContainer>
        </Container>
      )}
    </Formik>
  )
}

export default FormPets