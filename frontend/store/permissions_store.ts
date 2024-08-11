export const usePermissionsStore = defineStore('permissions', {
    state: () => ({
        permissions: [] as String[] | undefined,
    }),
    actions: {
        async fetchPermissions(): Promise<void> {
            const {$api} = useNuxtApp()
            const response = await $api.get<any>('/user/permissions');
            if (response) {
                this.permissions = response.data
            }
        },
        clearPermissions() {
            this.permissions = []
        }
    }
});
