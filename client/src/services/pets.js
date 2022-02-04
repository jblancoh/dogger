import request from './request'

function setpet(data) {
  // user['is_walker'] = false
  // user['password_confirmation'] = user.passwordConfirm
  // user['phone_number'] = user.phone
  // user['last_name'] = user.lastName
  // user['first_name'] = user.name
  // user['is_owner'] = user.isOwner
  // if (!user.isOwner) {
  //   user['is_walker'] = true
  // }
  return request({
    url: 'api/v1/pets/',
    method: 'POST',
    data
  });
}
function getpet(data) {

  return request({
    url: `api/v1/pets/${data}`,
    method: 'GET',
    // data
  });
}


const PetsService = {
  setpet,
  getpet,
}

export default PetsService;