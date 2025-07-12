/// <reference types="vite/client" />

//attention:
//Acronym and their meaning:
//A: All
//AC: Accept
//B: Base
//C: Create
//D: Delete
//F: Folder
//G: Get
//H: Hidden (disabled)
//I: Information
//L: Login
//LO: Logout
//R: Register
//S: Search
//O: One
//T: Type
//U: Update
//UH: Unhidden {enabled)
//V: Verify
//VER: Version

interface ImportMetaEnv {
    readonly VITE_SERVER_PORT: string;
    readonly VITE_API_HOST: string;

    // Token
    readonly VITE_API_TOKEN_REFRESH: string;

    //Administration
    readonly VITE_API_G_A_PROVINCES:string;
    readonly VITE_API_G_A_DISTRICTS:string;

    // Address
    readonly VITE_API_C_ADDRESS: string;
    readonly VITE_API_U_ADDRESS: string;
    readonly VITE_API_G_A_ADDRESS: string;
    readonly VITE_API_D_ADDRESS: string;

    // Brand
    readonly VITE_API_L_BRAND: string;
    readonly VITE_API_R_BRAND: string;
    readonly VITE_API_I_BRAND: string;
    readonly VITE_API_U_BRAND: string;
    readonly VITE_API_V_BRAND: string;
    readonly VITE_API_G_A_BRAND: string;
    readonly VITE_API_LO_BRAND: string;

    // Cart
    readonly VITE_API_C_CART: string;
    readonly VITE_API_G_CART: string;
    readonly VITE_API_U_CART: string;
    readonly VITE_API_D_CART: string;

    // Category
    readonly VITE_API_G_A_CATEGORY: string;
    readonly VITE_API_C_CATEGORY: string;
    readonly VITE_API_U_CATEGORY: string;
    readonly VITE_API_D_CATEGORY: string;

    // Notification
    readonly VITE_API_G_A_CUSTOMER: string;
    readonly VITE_API_G_A_VENDOR: string;

    // Order
    readonly VITE_API_G_A_ORDERS_CUSTOMER: string;
    readonly VITE_API_G_A_ORDERS_VENDOR: string;
    readonly VITE_API_C_ORDER: string;
    readonly VITE_API_AC_ORDER: string;
    readonly VITE_API_D_ORDER: string;
    readonly VITE_API_I_ORDER: string;
    readonly VITE_API_U_ORDER: string;
    readonly VITE_API_G_ORDERS_STATUS: string;

    // Product
    readonly VITE_API_G_S_PRODUCT: string;
    readonly VITE_API_G_S_PRODUCT_PRICE: string;
    readonly VITE_API_I_PRODUCT_USER: string;
    readonly VITE_API_I_PRODUCT_VENDOR: string;
    readonly VITE_API_G_A_PRODUCT: string;
    readonly VITE_API_G_A_PRODUCT_FROM_BRAND: string;
    readonly VITE_API_C_PRODUCT: string;
    readonly VITE_API_U_PRODUCT: string;
    readonly VITE_API_H_PRODUCT: string;
    readonly VITE_API_D_PRODUCT: string;

    // Variant
    readonly VITE_API_I_VARIANT: string;
    readonly VITE_API_G_A_VARIANT: string;
    readonly VITE_API_C_VARIANT: string;
    readonly VITE_API_U_VARIANT: string;
    readonly VITE_API_D_VARIANT: string;

    // Variant Attribute
    readonly VITE_API_G_ATTRIBUTE: string;
    readonly VITE_API_U_ATTRIBUTE: string;

    // Sub Category
    readonly VITE_API_G_A_SUBCATEGORY: string;
    readonly VITE_API_I_SUBCATEGORY: string;
    readonly VITE_API_C_SUBCATEGORY: string;
    readonly VITE_API_U_SUBCATEGORY: string;
    readonly VITE_API_D_SUBCATEGORY: string;

    // User
    readonly VITE_API_L_USER: string;
    readonly VITE_API_R_USER: string;
    readonly VITE_API_G_A_USER: string;
    readonly VITE_API_H_USER: string;
    readonly VITE_API_UH_USER: string;
    readonly VITE_API_LO_USER: string;
    readonly VITE_API_I_USER: string;
    readonly VITE_API_U_USER: string;
    readonly VITE_API_U_USER_CHANGE_PASS: string;

    // Cloudinary
    readonly VITE_CLOUD_B_URL: string;
    readonly VITE_CLOUD_NAME: string;
    readonly VITE_CLOUD_T_I: string;
    readonly VITE_CLOUD_VER: string;
    readonly VITE_CLOUD_F_P: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
