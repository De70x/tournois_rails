import type {Api} from "~/plugins/api";

export const usePermissionsStore = (api: Api) => {
  const permissions = useState<string[]>('permissions', () => [])

  const fetchPermissions = async () => {
    const response = await api.get<string[]>('/user/permissions')
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