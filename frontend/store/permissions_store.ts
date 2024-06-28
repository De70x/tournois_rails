export const usePermissionsStore = defineStore('permissions', {
    state: () => ({
        permissions: [] as String[] | undefined,
    }),
    actions: {
        async fetchPermissions(): Promise<String[]> {
            const {$api} = useNuxtApp()
            try {
                const response = await $api.get('/user/permissions');
                if (response) {
                    this.permissions = response.data
                    return response.data
                }
            } catch (error) {
                console.error('Failed to fetch permissions:', error);
            }
            return []
        },
        clearPermissions() {
            this.permissions = []
        }
    }
});
