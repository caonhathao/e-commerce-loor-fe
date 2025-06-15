let accessToken: string = '';
export const getAccessToken = () => localStorage.getItem('access_token') || accessToken;
export const setAccessToken = (token: string) => localStorage.setItem('access_token', token);
export const removeAccessToken = () => localStorage.removeItem('access_token');