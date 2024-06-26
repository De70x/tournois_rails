import {usePermissionsStore} from "~/store/permissions_store";

export const hasPermission =  (permission: String) => {
    const permissions = usePermissionsStore().permissions
    const permissionItems = permission.split('_')
    const rootPermission = permissionItems[0]
    const parentPermission = `${permissionItems[0]}_${permissionItems[1]}`

    return permissions.includes(rootPermission) || permissions.includes(parentPermission) || permissions.includes(permission)

}