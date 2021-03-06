import { $authHost, $host } from './index'
import jwt_decode from 'jwt-decode'

export const stuffRegistration = async (login, password) => {
  const { data } = await $host.post('api/stuff/registration', {
    login,
    password,
  })
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

export const stuffLogin = async (login, password) => {
  const { data } = await $host.post('api/stuff/login', { login, password })
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

export const stuffCheck = async () => {
  const { data } = await $authHost.get('api/stuff/auth')
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}
