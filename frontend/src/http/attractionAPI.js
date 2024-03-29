import { $authHost, $host } from './index'

export const createAttraction = async (attraction) => {
  const data = await $authHost
    .post('api/stuff/attraction', attraction)
    .then((data) => data)
    .catch((err) => err.response)
  return data
}

export const stuffFetchAttraction = async () => {
  const { data } = await $authHost.get('api/stuff/getAttraction')
  return data
}
export const customerFetchAttraction = async () => {
  const { data } = await $host.get('api/park/:id/attraction')
  return data
}

export const editAttraction = async (attraction) => {
  const data = await $authHost
    .put('api/stuff/attraction', attraction)
    .then((data) => data)
    .catch((err) => err.response)
  return data
}

export const deleteAttraction = async (id) => {
  const data = await $authHost
    .delete('api/stuff/attraction/' + id)
    .then((data) => data)
    .catch((err) => err.response)
  return data
}
