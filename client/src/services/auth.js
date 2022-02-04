import request from './request'

function login(user) {
  console.log('login', user)
  return request({
    url: 'api/v1/users/login/',
    method: 'POST',
    data: user
  });
}
function signup(user) {
  user['is_walker'] = false
  user['password_confirmation'] = user.passwordConfirm
  user['phone_number'] = user.phone
  user['last_name'] = user.lastName
  user['first_name'] = user.name
  user['is_owner'] = user.isOwner
  if (!user.isOwner) {
    user['is_walker'] = true
  }
  return request({
    url: 'api/v1/users/signup/',
    method: 'POST',
    data: user
  });
}


const AuthService = {
  login,
  signup,
  // sendVerificationCode,
  // confirmVerificationCode,
}

export default AuthService;