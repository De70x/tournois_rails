export const usePermissionsStore = () => {
  const permissions = useState<string[]>('permissions', () => [])

  const fetchPermissions = async () => {
    const {$api} = useNuxtApp()
    const response = await $api.get<string[]>('/user/permissions')
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