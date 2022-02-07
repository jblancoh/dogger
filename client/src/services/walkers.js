import request from './request'

function setwalkerreserve(params) {
  return request({
    url: `api/v1/dogs/${params.dog_id}/`,
    method: 'PUT',
    headers: {
      'Authorization': `Token ${params.access_token}`
    },
    data: params
  });
}

function getwalkers(params) {
  return request({
    url: `api/v1/walkers/`,
    method: 'GET',
    headers: {
      'Authorization': `Token ${params.access_token}`
    }
  });
}

function getwalker(params) {
  return request({
    url: `api/v1/walkers/${params.id}/`,
    method: 'GET',
    headers: {
      'Authorization': `Token ${params.access_token}`
    }
  });
}

function setschedule(params) {
  return request({
    url: `api/v1/scheduled-walks/`,
    method: 'POST',
    headers: {
      'Authorization': `Token ${params.access_token}`
    },
    data: params
  });
}

const PetsService = {
  setwalkerreserve,
  getwalkers,
  getwalker,
  setschedule,
}

export default PetsService;