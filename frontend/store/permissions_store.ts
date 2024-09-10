export const usePermissionsStore = () => {
    const permissions = useState<string[]>('permissions', () => [])

    const fetchPermissions = async () => {
        const {$api} = useNuxtApp()
        try {
            const response = await $api.get<string[]>('/user/permissions')
            if (response) {
                permissions.value = response.data
            }
        } catch (error) {
            console.error('Failed to fetch permissions:', error)
        }
    }

    const clearPermissions = () => {
        permissions.value = []
    }

    return {
        permissions,
        fetchPermissions,
        clearPermissions
    }
}