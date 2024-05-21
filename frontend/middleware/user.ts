import axios from "axios";

export default defineNuxtRouteMiddleware(async () => {

    try {
        if (useCookie('authToken').value) {
            await axios.get('member-data')
        }
    } catch (error: any) {
        useCookie('authToken').value = null
    }
})