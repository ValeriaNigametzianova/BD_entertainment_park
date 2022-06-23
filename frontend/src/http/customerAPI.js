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

export const customerFetchPDF = async () => {
  const { data } = await $authHost.get('api/customer/ticket')
  let array = []
  data.map(async (file) => {
    const pdfBlob = new Blob([file], { type: 'application/pdf' })
    console.log('pdfBlob', pdfBlob)
    array.push(pdfBlob)
    // saveAs(pdfBlob, 'newPdf.pdf')
  })
  console.log('array', array)
  return array
}
export const customerFetchTickets = async () => {
  const { data } = await $authHost.get('api/customer/tickets')
  // console.log('res', data)
  // const array = []
  // data.map(async (file) => {
  //   const pdfBlob = new Blob([file], { type: 'application/pdf' })
  //   array.push(pdfBlob)
  //   saveAs(pdfBlob, 'newPdf.pdf')
  // })
  // return array
  return data
}
