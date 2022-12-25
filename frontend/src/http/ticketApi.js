import { $authHost, $host } from './index'

export const createTicket = async (ticket) => {
  const data = await $host.post('api/park/:id/tarif', ticket)
  const res = { data: data.data, status: data.status }
  return data
}
