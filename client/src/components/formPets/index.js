import React from 'react'
import { Formik } from 'formik'
import { Input, Button } from '../'
import { SelectContainer, Container } from './styled'
import { SetPet } from '../../actions/pets'
import { useDispatch } from 'react-redux'

const initialValues = {
  'dogBreed': '',
  'age': 0,
  'size': "small",
}

const FormPets = ({ setShowForm }) => {
  const dispatch = useDispatch()
  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={logInValidation}
      onSubmit={(props) => {
        console.log('Create pet', props)
        dispatch(SetPet(props))
        setShowForm(false)
        // props['history'] = history
        // dispatch(LoginUser(props))
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
            error={errors.dogBreed}
            label='Raza'
            name='dogBreed'
            onBlur={handleBlur}
            onChange={handleChange}
            type='text'
            value={values.dogBreed}
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
          </SelectContainer>
        </Container>
      )}
    </Formik>
  )
}

export default FormPets