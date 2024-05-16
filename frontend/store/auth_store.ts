interface AuthState {
    authToken: string | null;
}

export const useAuthStore = defineStore("auth-store",{
    state: (): AuthState => {
        return {
            authToken: null,
        }
    },
    actions: {
        setAuthToken(token: string) {
            this.authToken = token;
        },
        clearAuthToken() {
            this.authToken = null;
        },
    }
})