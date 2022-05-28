import {$authHost, $host} from "./index";


export const createTarif = async (tarif) => {
    const {data} = await $authHost.post('api/stuff/tarif', tarif)
    return data
}

export const fetchTarif = async () => {
    const {data} = await $host.get('api/park/:id/tarif')
    return data
}
