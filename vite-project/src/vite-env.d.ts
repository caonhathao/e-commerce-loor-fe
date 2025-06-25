/// <reference types="vite/client" />

//attention:
//Acronym and their meaning:
//A: All
//B: Base
//C: Create
//D: Delete
//F: Folder
//G: Get
//H: Hidden (disabled)
//I: Information
//L: Login
//R: Register
//S: Search
//O: One
//T: Type
//U: Update
//V: Verify
//VER: Version
interface ImportMetaEnv {
    readonly VITE_SERVER_PORT: string;
    readonly VITE_API_HOST: string;

    readonly VITE_API_TOKEN_REFRESH: string;

    readonly VITE_API_L_USER: string;
    readonly VITE_API_R_USER: string;
    readonly VITE_API_G_A_USER: string;
    readonly VITE_API_I_USER:string;

    readonly VITE_API_L_BRAND: string;
    readonly VITE_API_R_BRAND: string;
    readonly VITE_API_V_BRAND: string;
    readonly VITE_API_I_BRAND: string;
    readonly VITE_API_U_BRAND: string;
    readonly VITE_API_G_A_BRAND: string;

    readonly VITE_API_C_PRODUCT: string;
    readonly VITE_API_I_PRODUCT: string;
    readonly VITE_API_G_A_PRODUCT_FROM_BRAND: string;
    readonly VITE_API_G_A_PRODUCT: string;
    readonly VITE_API_U_PRODUCT: string;
    readonly VITE_API_H_PRODUCT: string;
    readonly VITE_API_D_PRODUCT: string;
    readonly VITE_API_S_PRODUCT: string;

    readonly VITE_API_I_VARIANT: string;
    readonly VITE_API_G_A_VARIANT: string;
    readonly VITE_API_C_VARIANT: string;
    readonly VITE_API_U_VARIANT: string;

    readonly VITE_API_G_ATTRIBUTE: string;
    readonly VITE_API_U_ATTRIBUTE: string;

    readonly VITE_API_G_A_CATEGORY: string;
    readonly VITE_API_C_CATEGORY: string;
    readonly VITE_API_U_CATEGORY: string;
    readonly VITE_API_D_CATEGORY: string;

    readonly VITE_API_G_A_SUBCATEGORY: string;
    readonly VITE_API_I_SUBCATEGORY: string;
    readonly VITE_API_C_SUBCATEGORY: string;
    readonly VITE_API_U_SUBCATEGORY: string;
    readonly VITE_API_D_SUBCATEGORY: string;

    readonly VITE_CLOUD_B_URL: string;
    readonly VITE_CLOUD_NAME: string;
    readonly VITE_CLOUD_T_I: string;
    readonly VITE_CLOUD_VER: string;
    readonly VITE_CLOUD_F_P: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
