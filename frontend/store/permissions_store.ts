export const usePermissionsStore = () => {
    const permissions = useState<String[]>('permissions', () => [])
    const fetchPermissions = async (): Promise<void> => {
        const {$api} = useNuxtApp()
        const response = await $api.get<any>('/user/permissions');
        if (response) {
            permissions.value = response.data
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
