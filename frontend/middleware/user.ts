import axios from "axios";

export default defineNuxtRouteMiddleware(async () => {

    try {
        if (useCookie('auth-token').value) {
            await axios.get('member-data')
        }
    } catch (error: any) {
        useCookie('auth-token', {sameSite:'strict'}).value = null
        throw error
    }
})