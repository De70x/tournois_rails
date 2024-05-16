interface AuthState {
    authToken: string | null | undefined;
}

export const useAuthStore = defineStore("auth-store", {
    state: (): AuthState => {
        return {
            authToken: useCookie('auth-token').value,
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