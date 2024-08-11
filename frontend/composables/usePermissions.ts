import {usePermissionsStore} from "~/store/permissions_store";

export const usePermissions = () => {
    const {permissions} = usePermissionsStore()
    const hasPermission = async (permission: String): Promise<boolean> => {
        if (permissions === undefined || permissions.length === 0) {
            await usePermissionsStore().fetchPermissions()
        }
        const permissionItems = permission.split('_')
        const rootPermission = permissionItems[0]
        const parentPermission = `${permissionItems[0]}_${permissionItems[1]}`

        return permissions!.includes(rootPermission) || permissions!.includes(parentPermission) || permissions!.includes(permission)
    }

    return {hasPermission}
}