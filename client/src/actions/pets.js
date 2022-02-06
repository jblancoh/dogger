import PetsService from '../services/pets'
import { toast } from 'react-toastify';
import _ from 'lodash'


export const SetPet = (params) => {
  return async (dispatch) => {
    await PetsService.setpet(params)
      .then(async (response) => {
        // dispatch({ 'type': 'LOG_IN', payload: true })
        // dispatch({ 'type': 'GET_USER', payload: response })
        // params.history.push("/dashboard");
      })
      .catch(err => {
        // dispatch({ 'type': 'LOG_IN', payload: false })
        // if (err.data) {
        //   Object.keys(err.data).forEach(item => {
        //     toast.error(`${err.data[item]}`)
        //   })
        // } else {
        //   toast.error(err.message)
        // }
      })
  }
}
