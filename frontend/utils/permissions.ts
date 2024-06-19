import {usePermissionsStore} from "~/store/permissions_store";

const permissions = usePermissionsStore().permissions
export const hasPermission = (permission: String) => {

    const permissionItems = permission.split('_')
    const parentPermission = `${permissionItems[0]}_${permissionItems[1]}`

    return permissions.includes(parentPermission) || permissions.includes(permission)

}