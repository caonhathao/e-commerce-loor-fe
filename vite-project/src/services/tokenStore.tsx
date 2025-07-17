import Cookies from 'js-cookie'

let accessToken: string = '';
export const getAccessToken = () => localStorage.getItem('access_token') || accessToken;
export const setAccessToken = (token: string) => localStorage.setItem('access_token', token);
export const removeAccessToken = () => {
    localStorage.removeItem('access_token')
    Cookies.remove('refresh')
};

// tokenStore.tsx hoặc AuthContext.tsx
export let isLoggingOut = false;

export const markLoggingOut = () => { isLoggingOut = true; }
export const clearLoggingOut = () => { isLoggingOut = false; }
