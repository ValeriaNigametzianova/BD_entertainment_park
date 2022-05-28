import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const customerRegistration = async (email, password) => {
    const {data} = await $host.post('api/customer/registration', {email, password, role: 'ADMIN'})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const customerLogin = async (email, password) => {
    const {data} = await $host.post('api/customer/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const customerCheck = async () => {
    const {data} = await $authHost.get('api/customer/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}