import PetsService from '../services/pets'
import { toast } from 'react-toastify';

export const SetPet = async (params) => {
  return await PetsService.setpet(params)
    .then(async (response) => {
      return response
    })
    .catch(err => {
      if (err.status !== 404 && err.data) {
        Object.keys(err.data).forEach(item => {
          toast.error(`${err.data[item]}`)
        })
      } else {
        toast.error(err.message)
      }
    })
}
export const GetPet = async (params) => {
  return await PetsService.getpet(params)
    .then((response) => {
      return response
    })
    .catch(err => {
      if (err.status !== 404 && err.data) {
        Object.keys(err.data).forEach(item => {
          toast.error(`${err.data[item]}`)
        })
      } else {
        toast.error(err.message)
      }
    })
}
