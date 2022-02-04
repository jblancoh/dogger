import React from 'react'
import { useDispatch } from 'react-redux'
import { Formik } from 'formik'
import {
  Button,
  Input
} from '../../components'
import { signUpValidation } from '../../validationSchemas'
import { SignUpUser } from '../../actions/account'

import {
  Container,
  Title,
  CheckboxContainer,
} from './styled'

const initialValues = {
  email: '',
  password: '',
  name: '',
  lastName: '',
  phone: '',
  address: '',
  passwordConfirm: '',
  isOwner: false,
}

const SignUp = () => {
  const dispatch = useDispatch()
  return (
    <Container>
      <Title>Registro</Title>
      <Formik
        initialValues={initialValues}
        validationSchema={signUpValidation}
        onSubmit={(props, actions) => {
          dispatch(SignUpUser(props))
        }}
      // validateOnChange={false}
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
          <>
            <Input
              error={errors.name}
              label='Nombre(s)'
              name='name'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
            />
            <Input
              error={errors.lastName}
              label='Apellidos'
              name='lastName'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastName}
            />
            <Input
              error={errors.email}
              label='Correo'
              name='email'
              onBlur={handleBlur}
              onChange={handleChange}
              type='email'
              value={values.email}
            />
            <Input
              error={errors.phone}
              label='Teléfono'
              name='phone'
              onBlur={handleBlur}
              onChange={handleChange}
              type='tel'
              value={values.phone}
            />
            <Input
              error={errors.address}
              label='Dirección'
              name='address'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.address}
            />
            <Input
              error={errors.password}
              label='Contraseña'
              name='password'
              onBlur={handleBlur}
              onChange={handleChange}
              type='password'
              value={values.password}
            />
            <Input
              error={errors.passwordConfirm}
              label='Confirmar contraseña'
              name='passwordConfirm'
              onBlur={handleBlur}
              onChange={handleChange}
              type='password'
              value={values.passwordConfirm}
            />
            <CheckboxContainer>
              <label>
                {`Eres dueño? `}
                <input
                  name="isOwner"
                  type="checkbox"
                  checked={values.isOwner}
                  onChange={handleChange}
                />
              </label>
            </CheckboxContainer>
            <Button
              disabled={!isValid || isSubmitting}
              onPress={handleSubmit}
              wide
            >
              Registrarse
            </Button>
          </>
        )}
      </Formik>
    </Container>
  )
}

export default SignUp