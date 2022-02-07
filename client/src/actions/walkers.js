import WalkersService from '../services/walkers'
import { toast } from 'react-toastify';
import _ from 'lodash'


export const SetWalkerReserve = async (params) => {
  console.log('params', params)
  return await WalkersService.setwalkerreserve(params)
    .then(async (response) => {
      toast.success(`
        Se ha resevado la fecha para ${_.capitalize(response.name)}.
      `)
      return response
    })
    .catch(err => {
      console.log('err', err.data)
      if (err.status !== 404 && err.data) {
        Object.keys(err.data).forEach(item => {
          toast.error(`${err.data[item]}`)
        })
      } else {
        toast.error(err.message)
      }
    })
}
export const GetWalkers = async (params) => {
  return await WalkersService.getwalkers(params)
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
