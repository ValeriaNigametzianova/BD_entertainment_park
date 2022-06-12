import { $authHost, $host } from './index'
import jwt_decode from 'jwt-decode'

export const customerRegistration = async (phone_number, email) => {
  const { data } = await $host.post('api/customer/registration', {
    phone_number,
    email,
  })
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

export const customerLogin = async (email) => {
  const { data } = await $host.post('api/customer/login', { email })
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

export const customerCheck = async () => {
  const { data } = await $authHost.get('api/customer/auth')
  console.log('token3', localStorage.getItem('token'))
  localStorage.setItem('token', data.token)
  console.log('token4', localStorage.getItem('token'))
  return jwt_decode(data.token)
}

export const customerFetchTickets = async () => {
  const { data } = await $authHost.get('api/customer/ticket')
  return data
}
