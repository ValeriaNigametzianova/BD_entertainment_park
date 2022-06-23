import { $authHost, $host } from './index'

export const createPark = async (park) => {
  const { data } = await $authHost.post('api/stuff/park', park)
  return data
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
export const editInfo = async (park) => {
  const { data } = await $authHost.put('api/stuff/park', park)
  return data
}
export const deletePark = async (id) => {
  const { data } = await $authHost.delete('api/stuff/park/' + id)
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
  const { data } = await $authHost.get('api/stuff/getPark', {})
  return data
}
export const editGreenZone = async (greenZone) => {
  const { data } = await $authHost.put('api/stuff/park/gz', greenZone)
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
  const { data } = await $authHost.get('api/stuff/getAttraction', {})
  return data
}
export const stuffFetchOneAttraction = async (id) => {
  const { data } = await $authHost.get('api/stuff/attraction/' + id, {})
  return data
}
export const editAttraction = async (attraction) => {
  const { data } = await $authHost.put('api/stuff/attraction', attraction)
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
  const { data } = await $authHost.get('api/stuff/getTarif')
  return data
}
export const stuffFetchOneTarif = async (id) => {
  const { data } = await $authHost.get('api/stuff/tarif/' + id, {})
  return data
}
export const editTarif = async (tarif) => {
  const { data } = await $authHost.put('api/stuff/tarif', tarif)
  return data
}
