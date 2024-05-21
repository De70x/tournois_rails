export const usePermissionsStore = defineStore('permissions', {
    state: () => ({
        permissions: [] as String[],
    }),
    actions: {
        async fetchPermissions() {
            const {$api} = useNuxtApp()
            try {
                const response = await $api.get('/user/permissions');
                console.log(response)
                if (response) {
                    this.permissions = response.data
                }
            } catch (error) {
                console.error('Failed to fetch permissions:', error);
            }
        }
    }
});
