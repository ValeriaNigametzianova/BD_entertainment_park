import { $authHost, $host } from './index'
import jwt_decode from 'jwt-decode'

export const createPark = async (park) => {
  const { data } = await $authHost.post('api/stuff/park', park)
  return data
}
export const stuffFetchPark = async () => {
  const { data } = await $host.get('api/stuff/getPark', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
  console.log('iaiaiaiai', data)
  return data
}
export const customerFetchPark = async (name, town, page, limit = 5) => {
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
export const editInfo = async (park) => {
  const { data } = await $authHost.put('api/stuff/park', park)
  return data
}

export const createGreenZone = async (greenZone) => {
  const { data } = await $authHost.post('api/stuff/greenZone', greenZone)
  return data
}
export const customerFetchGreenZone = async (id) => {
  const { data } = await $host.get('api/park/' + id)
  return data
}
export const stuffFetchGreenZone = async () => {
  const { data } = await $host.get('api/stuff/getPark', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
  return data
}
export const editGreenZone = async (greenZone) => {
  const { data } = await $authHost.put('api/stuff/park', greenZone)
  return data
}

export const createAttraction = async (
  name,
  hight,
  weight_limitation,
  hight_limitation,
  description,
  age_limitation,
  max_quantity_people,
  ParkId
) => {
  const { data } = await $authHost.post('api/stuff/attraction', {
    name,
    hight,
    weight_limitation,
    hight_limitation,
    description,
    age_limitation,
    max_quantity_people,
    ParkId,
  })
  return data
}
export const customerFetchAttraction = async (id) => {
  const { data } = await $host.get('api/park/' + id + '/attraction')
  return data
}
export const stuffFetchAttraction = async () => {
  const { data } = await $authHost.get('api/stuff/getAttraction', {
    // headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
  return data
}
export const editAttraction = async (attraction) => {
  const { data } = await $authHost.put('api/stuff/park', attraction)
  return data
}

export const createTarif = async (tarif) => {
  const { data } = await $authHost.post('api/stuff/tarif', tarif)
  return data
}
export const customerFetchTarif = async (id) => {
  const { data } = await $host.get('api/park/' + id + '/tarif')
  return data
}
export const stuffFetchTarif = async () => {
  const { data } = await $authHost.get('api/stuff/getTarif', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
  return data
}
