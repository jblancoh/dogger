import AuthService from '../services/auth'
import { toast } from 'react-toastify';
import _ from 'lodash'

export const LoginUser = async (params) => {
  await AuthService.login(params)
    .then(async (response) => {
      console.log('response', response)
    })
    .catch(err => console.log('login error', err))
}

export const SignUpUser = async (params) => {
  await AuthService.signup(params)
    .then(async (response) => {
      console.log('response', response)
      toast.success(`
        ${_.capitalize(response.user.first_name)} ${_.capitalize(response.user.last_name)}
        - ${response.message}

      `)

    })
    .catch(err => {
      if (err.data) {
        Object.keys(err.data).forEach(item => {
          toast.error(`${_.capitalize(item)} - ${err.data[item]}`)
        })
      } else {
        toast.error(err.message)
      }
    }
    )
} 