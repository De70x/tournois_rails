export default defineNuxtRouteMiddleware(async () => {
    const {$api} = useNuxtApp()

    try {
        await $api.get('member-data')
    } catch (error: any) {
        useCookie('authToken').value = null
    }
})