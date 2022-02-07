import AuthService from '../services/auth'
import { toast } from 'react-toastify';
import _ from 'lodash'


export const LoginUser = (params) => {
  return async (dispatch) => {
    await AuthService.login(params)
      .then(async (response) => {
        dispatch({ 'type': 'LOG_IN', payload: true })
        dispatch({ 'type': 'GET_USER', payload: response })
        params.history.push("/dashboard");
      })
      .catch(err => {
        dispatch({ 'type': 'LOG_IN', payload: false })
        if (err.data) {
          Object.keys(err.data).forEach(item => {
            toast.error(`${err.data[item]}`)
          })
        } else {
          toast.error(err.message)
        }
      })
  }
}

export const SignUpUser = async (params) => {
  await AuthService.signup(params)
    .then(async (response) => {
      toast.success(`
        ${_.capitalize(response.user.first_name)} ${_.capitalize(response.user.last_name)}
        - ${response.message}
      `)
      params.history.push("/log-in");
    })
    .catch(err => {
      if (err.data) {
        Object.keys(err.data).forEach(item => {
          toast.error(`${_.capitalize(item)} - ${err.data[item]}`)
        })
      } else {
        toast.error(err.message)
      }
    })
}

export const LogoutUser = () => {
  return dispatch => {
    dispatch({ 'type': 'LOG_OUT' })
  }
} 
