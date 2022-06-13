import { $authHost, $host } from './index'

export const createTarif = async (tarif) => {
  const { data } = await $authHost.post('api/stuff/tarif', tarif)
  return data
}

export const stuffFetchTarif = async () => {
  const { data } = await $authHost.get('api/stuff/getTarif')
  return data
}

export const fetchTarif = async () => {
  const { data } = await $host.get('api/park/:id/tarif')
  return data
}
export const editTarif = async (tarif) => {
  const { data } = await $authHost.put('api/stuff/tarif', tarif)
  return data
}

export const deleteTarif = async (id) => {
  const { data } = await $authHost.delete('api/stuff/tarif/' + id)
  return data
}
