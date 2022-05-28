import {$authHost, $host} from "./index";

export const createPark = async (park) => {
    const {data} = await $authHost.post('api/stuff/park', park)
    return data
}

export const stuffFetchPark = async () => {
    const {data} = await $host.get('api/stuff/getPark')
    return data
}
export const customerFetchPark = async () => {
    const {data} = await $host.get('api/park')
    return data
}

export const customerFetchOnePark = async (id) => {
    const {data} = await $host.get('api/park/' + id)
    return data
}
export const customerFetchGreenZone = async (id) => {
    const {data} = await $host.get('api/park/' + id)
    return data
}
export const customerFetchAttraction = async (id) => {
    const {data} = await $host.get('api/park/' + id + "/attraction")
    return data
}
export const customerFetchTarif = async (id) => {
    const {data} = await $host.get('api/park/' + id + "/tarif")
    return data
}

