import { $authHost, $host } from './index'

export const createPDF = async () => {
  const { data } = await $authHost.get('api/customer/ticket')
  return data
}
export const getPDF = async () => {
  const { data } = await $authHost.get('api/customer/ticket')
  return data
}
