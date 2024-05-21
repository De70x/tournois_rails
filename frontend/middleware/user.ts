import axios from "axios";

export default defineNuxtRouteMiddleware(async () => {

    try {
        if (useCookie('auth-token', {sameSite: 'strict'}).value) {
            await axios.get('member-data')
        }
    } catch (error: any) {
        useCookie('auth-token', {sameSite:'strict'}).value = null
    }
})