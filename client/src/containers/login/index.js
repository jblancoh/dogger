import React from 'react'
import { useDispatch } from 'react-redux'
import { Formik } from 'formik'
import {
  Button,
  Input
} from '../../components'
import { logInValidation } from '../../validationSchemas'
import { LoginUser } from '../../actions/account'
import {
  Container,
  FormContainer,
  Logo,
  Title
} from './styled'
import { useHistory } from "react-router-dom";

const initialValues = {
  email: 'repartidor1@yopmail.com',
  password: 'Password123$'
}

const LogIn = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  return (
    <Container>
      <Logo src={require('../../assets/img/png/logo/dogger_logo.png')} alt='Dogger' />
      <FormContainer>
        <Title>Iniciar Sesión</Title>
        <Formik
          initialValues={initialValues}
          validationSchema={logInValidation}
          onSubmit={(props) => {
            props['history'] = history
            dispatch(LoginUser(props))
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
            <>
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
                error={errors.password}
                label='Contraseña'
                name='password'
                onBlur={handleBlur}
                onChange={handleChange}
                type='password'
                value={values.password}
              />
              <Button
                disabled={!isValid || isSubmitting}
                onPress={handleSubmit}
                wide
              >
                Entrar
              </Button>
            </>
          )}
        </Formik>
      </FormContainer>
    </Container>
  )
}

export default LogIn