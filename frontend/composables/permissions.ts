import {usePermissionsStore} from "~/store/permissions_store";

const permissionStore = usePermissionsStore()
export const hasPermission = (permission:String) => {
    return permissionStore.permissions.includes(permission)
}