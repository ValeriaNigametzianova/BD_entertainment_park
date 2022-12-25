import { useContext } from 'react'
import { Context } from '..'
import { $authHost, $host } from './index'
// import {setAlertStatus, setAlertMessage} from '../store/ParkStore'

// export const createPark = async (park, file) => {
//   const { data } = await $authHost.post('api/stuff/park', { ...park, file })
//   return data
// }
export const createPark = async (formData) => {
  const data = await $authHost
    .post('api/stuff/park', formData)
    .then((data) => data)
    .catch((err) => err.response)
  console.log(data)
  const res = { park: data.data.park, status: data.status, message: data.data.message }
  return res
}
export const stuffFetchPark = async () => {
  const { data } = await $authHost.get('api/stuff/getPark')
  return data
}
export const customerFetchPark = async (name, town, page, limit = 2) => {
  const { data } = await $host.get('api/park', {
    params: {
      name,
      town,
      page,
      limit,
    },
  })
  return data
}
export const customerFetchOnePark = async (id) => {
  const { data } = await $host.get('api/park/' + id)
  return data
}
export const editInfo = async (formData) => {
  const data = await $authHost
    .put('api/stuff/park', formData)
    .then((data) => data)
    .catch((err) => err.response)
  return data
}
export const updatePhoto = async (formData) => {
  const { data } = await $authHost.put('api/stuff/park/photo', formData)
  return data
}

export const deletePhoto = async (fileName) => {
  const { data } = await $authHost.delete('api/stuff/park/photo/' + fileName)
  return data
}
export const deletePark = async (id) => {
  const data = await $authHost
    .delete('api/stuff/park/' + id)
    .then((data) => data)
    .catch((err) => err.response)
  console.log(data)
  const res = { park: data.data.park, status: data.status, message: data.data.message }
  return res
}

export const createGreenZone = async (greenZone, id) => {
  const { data } = await $authHost.post('api/stuff/greenZone', { ...greenZone, id })
  return data
}
export const customerFetchGreenZone = async (id) => {
  const { data } = await $host.get('api/park/' + id)
  return data
}
export const stuffFetchGreenZone = async () => {
  const { data } = await $authHost.get('api/stuff/getPark', {})
  return data
}
export const editGreenZone = async (greenZone) => {
  const { data } = await $authHost.put('api/stuff/park/gz', greenZone)
  return data
  return data
}

export const customerFetchAttraction = async (id) => {
  const { data } = await $host.get('api/park/' + id + '/attraction')
  return data
}
export const stuffFetchAttraction = async () => {
  const { data } = await $authHost.get('api/stuff/getAttraction', {})
  return data
}
export const stuffFetchOneAttraction = async (id) => {
  const { data } = await $authHost.get('api/stuff/attraction/' + id, {})
  return data
}

export const customerFetchTarif = async (id) => {
  const { data } = await $host.get('api/park/' + id + '/tarif')
  console.log(data)
  return data
}
export const stuffFetchTarif = async () => {
  const { data } = await $authHost.get('api/stuff/getTarif')
  return data
}
export const stuffFetchOneTarif = async (id) => {
  const { data } = await $authHost.get('api/stuff/tarif/' + id, {})
  return data
}
