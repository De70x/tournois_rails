import {usePermissionsStore} from "~/stores/usePermissionsStore";

export const usePermissions = () => {
  const {$api} = useNuxtApp()
  const {permissions, fetchPermissions} = usePermissionsStore($api)

  const hasPermission = async (permission: string): Promise<boolean> => {
    if (permissions.value.length === 0) {
      await fetchPermissions()
    }
    const permissionItems = permission.split('_')
    const rootPermission = permissionItems[0]
    const parentPermission = `${permissionItems[0]}_${permissionItems[1]}`

    console.log(permissions.value)

    return permissions.value.includes(rootPermission) ||
      permissions.value.includes(parentPermission) ||
      permissions.value.includes(permission)
  }

  return {hasPermission}
}