import request from './request'

function setpet(params) {
  return request({
    url: 'api/v1/dogs/',
    method: 'POST',
    headers: {
      'Authorization': `Token ${params.access_token}`
    },
    data: params
  });
}

function getpet(params) {
  return request({
    url: `api/v1/dogs/${params.data.id}/`,
    method: 'GET',
    headers: {
      'Authorization': `Token ${params.access_token}`
    }
  });
}


const PetsService = {
  setpet,
  getpet,
}

export default PetsService;