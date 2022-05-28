import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const stuffRegistration = async (email, password) => {
    const {data} = await $host.post('api/stuff/registration', {email, password, role: 'ADMIN'})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const stuffLogin = async (email, password) => {
    const {data} = await $host.post('api/stuff/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const stuffCheck = async () => {
    const {data} = await $authHost.get('/stuff/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}