import React from 'react'
import { Formik } from 'formik'
import { Input, Button } from '../'
import { SelectContainer, Container } from './styled'

var hours = [
  { id: 0, name: 8 },
  { id: 1, name: 9 },
  { id: 2, name: 10 },
  { id: 3, name: 11 },
  { id: 4, name: 12 },
  { id: 5, name: 13 },
  { id: 6, name: 14 },
  { id: 7, name: 15 },
  { id: 8, name: 16 },
  { id: 9, name: 17 },
  { id: 10, name: 18 },
  { id: 11, name: 19 },
  { id: 12, name: 20 },
  { id: 13, name: 21 },
  { id: 14, name: 22 },
]

var days = [
  { id: 0, name: 'monday', label: 'Lunes' },
  { id: 1, name: 'tuesday', label: 'Martes' },
  { id: 2, name: 'wednesday', label: 'Miercoles' },
  { id: 3, name: 'thursday', label: 'Jueves' },
  { id: 4, name: 'friday', label: 'Viernes' },
  { id: 5, name: 'saturday', label: 'Sabado' },
  { id: 6, name: 'sunday', label: 'Domingo' },
]


const initialValues = {
  'day_of_week': '',
  'hour': '',
  'size': null,
}

const FormSchedules = ({ submitForm, setShowForm }) => {
  return (
    <Formik
      initialValues={initialValues}
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
          <SelectContainer>
            <label>
              {`Día`}
            </label>
            <select
              name="day_of_week"
              value={values.day_of_week}
              onChange={handleChange}
            >
              <option value="">-------</option>
              {days.map((item) => {
                return (
                  <option value={item.name}>{item.label}</option>
                )
              })}
            </select>
          </SelectContainer>
          <SelectContainer>
            <label>
              {`Hora`}
            </label>
            <select
              name="hour"
              value={values.hour}
              onChange={handleChange}
            >
              <option value="">-------</option>
              {hours.map((item) => {
                return (
                  <option value={item.name}>{item.name}</option>
                )
              })}
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
              <option value="">-------</option>
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

export default FormSchedules