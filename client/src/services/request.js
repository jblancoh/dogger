import axios from 'axios';

// Create axios service

const service = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  headers: { Accept: 'application/json' },
});

service.defaults.headers.common['Content-Type'] = 'application/json';
service.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Create interceptors for catch errors

const handleError = ({ message, data, status }) => {
  console.log('data', data)
  return Promise.reject({ message, data, status })
}

service.interceptors.response.use(
  response => response,
  ({ message, response }) => {
    return handleError({ message, data: response?.data, status: response?.status })
  },
)

// Request Wrapper with default success actions

const request = function (options) {
  const onSuccess = function (response) {
    return response.data;
  }
  console.log('options', options)
  return service(options)
    .then(onSuccess)
}

export default request;