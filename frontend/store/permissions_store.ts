export const usePermissionsStore = defineStore('permissions', {
    state: () => ({
        permissions: [] as String[] | undefined,
    }),
    actions: {
        async fetchPermissions(): Promise<String[]> {
            const {$api} = useNuxtApp()
            const response = await $api.get('/user/permissions');
            if (response) {
                this.permissions = response.data
                return response.data
            }
            return []
        },
        clearPermissions() {
            this.permissions = []
        }
    }
});
