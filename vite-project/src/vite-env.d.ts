/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SERVER_PORT: string;
    readonly VITE_API_HOST: string;

    readonly VITE_API_USER_LOGIN: string;
    readonly VITE_API_USER_REGISTER: string;

    readonly VITE_API_BRAND_LOGIN: string;
    readonly VITE_API_BRAND_REGISTER: string;
    readonly VITE_API_BRAND_VERIFY: string;

    readonly VITE_API_C_PRODUCT: string;
    readonly VITE_API_G_PRODUCT: string;
    readonly VITE_API_U_PRODUCT: string;
    readonly VITE_API_D_PRODUCT: string;

    readonly VITE_API_G_CATEGORY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
