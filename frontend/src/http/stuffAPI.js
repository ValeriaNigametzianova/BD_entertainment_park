import { $authHost, $host } from './index'
import jwt_decode from 'jwt-decode'

export const stuffRegistration = async (login, password) => {
  const data = await $host.post('api/stuff/registration', {
    login,
    password,
  })
  console.log(data)
  localStorage.setItem('token', data.data.token)
  const user = jwt_decode(data.data.token)
  const res = { user, data: data.data, status: data.status }
  return res
}

export const stuffLogin = async (login, password) => {
  const data = await $host.post('api/stuff/login', { login, password })
  localStorage.setItem('token', data.data.token)
  const user = jwt_decode(data.data.token)
  const res = { user, data: data.data, status: data.status }
  console.log(res)
  return res
}

export const stuffCheck = async () => {
  const { data } = await $authHost.get('api/stuff/auth')
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}
