import {$authHost, $host} from "./index";

export const createAttraction = async (attraction) => {
    const {data} = await $authHost.post('api/stuff/attraction', attraction)
    return data
}

export const stuffFetchAttraction = async () => {
    const {data} = await $host.get('api/stuff/getAttraction')
    return data
}
export const customerFetchAttraction = async () => {
    const {data} = await $host.get('api/park/:id/attraction')
    return data
}