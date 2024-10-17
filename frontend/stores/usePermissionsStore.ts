import type {Api} from "~/plugins/api";

export const usePermissionsStore = (api: Api) => {
  const permissions = useState<string[]>('permissions', () => [])

  const fetchPermissions = async () => {
    const response = await api.get<string[]>('/user/permissions')
    if (response) {
      if (response.data.length > 0) {
        permissions.value = response.data
      } else {
        permissions.value = ['no_permissions']
      }
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