import axios from 'axios';

export function isTokenExpired(token: string): boolean {
    if (!token) return true;

    // Split the token and get the payload
    const payload = token.split('.')[1];
    if (!payload) return true;

    try {
        // Decode the base64 payload
        const decoded = JSON.parse(atob(payload));
        const exp = decoded.exp;

        if (!exp) return true;

        // Check if the token has expired
        return Date.now() >= exp * 1000;
    } catch (error) {
        console.error('Error decoding token:', error);
        return true; // Assume token is expired if it can't be decoded
    }
}

export async function refreshToken(): Promise<string> {
    try {
        const refreshToken = useCookie('refresh-token').value;
        const response = await axios.post('/api/refresh_token', { refresh_token: refreshToken });
        const newToken = response.data.token;

        // Update the stored token
        const authToken = useCookie('auth-token');
        authToken.value = newToken;

        return newToken;
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
    }
}