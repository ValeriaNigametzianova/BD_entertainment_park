import { $authHost, $host } from './index'

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
export const customerFetchPark = async (town, page, limit = 5) => {
  const { data } = await $host.get('api/park', {
    params: {
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

// export const fetchTown = async (id) => {
//     const {data} = await $host.get('api/park')
//     return data
// }

export const createGreenZone = async (greenZone) => {
  const { data } = await $authHost.post('api/stuff/greenZone', greenZone)
  return data
}
// export const customerFetchGreenZone = async (id) => {
//   const { data } = await $host.get('api/park/' + id, { params: { ParkId } })
//   return data
// }
export const stuffFetchGreenZone = async () => {
  const { data } = await $host.get('api/stuff/getGreenZone', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
  return data
}

export const createAttraction = async (attraction) => {
  const { data } = await $authHost.post('api/stuff/attraction', attraction)
  return data
}
export const customerFetchAttraction = async (id) => {
  const { data } = await $host.get('api/park/' + id + '/attraction')
  return data
}
export const stuffFetchAttraction = async () => {
  const { data } = await $host.get('api/park/fetAttraction', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
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
  const { data } = await $host.get('api/park/tarif', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
  return data
}
