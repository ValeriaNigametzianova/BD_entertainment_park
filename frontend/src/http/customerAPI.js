import { $authHost, $host } from './index'
import jwt_decode from 'jwt-decode'
import { saveAs } from 'file-saver'

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
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

export const customerFetchTickets = async () => {
  const { data } = await $authHost
    .get('api/customer/ticket', { responseType: 'blob' })
    .then((res) => {
      const array = []
      res.data.map(async (file) => {
        const pdfBlob = new Blob([file], { type: 'application/pdf' })
        array.push(pdfBlob)
        saveAs(pdfBlob, 'newPdf.pdf')
      })
      return array
    })
}
