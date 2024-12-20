/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SERVER_PORT: string;
    readonly VITE_API_HOST: string;
    readonly VITE_API_USER_LOGIN: string;
    readonly VITE_API_USER_REGISTER: string;
    readonly VITE_API_BRAND_LOGIN: string;
    readonly VITE_API_BRAND_REGISTER: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
