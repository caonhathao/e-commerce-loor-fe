import {buildUrlWithParams} from "../utils/utils.js.tsx";

const endpoints = {
    system: {
        socketConnection:import.meta.env.VITE_API_HOST + import.meta.env.VITE_SERVER_PORT,
    },
    auth: {
        userLogin: import.meta.env.VITE_API_L_USER,
        userRegister: import.meta.env.VITE_API_R_USER,
        brandLogin: import.meta.env.VITE_API_L_BRAND,
        brandRegister: import.meta.env.VITE_API_R_BRAND,
        refresh: import.meta.env.VITE_API_TOKEN_REFRESH,
        authBrand: import.meta.env.VITE_API_V_BRAND
    },
    admin: {
        createCategory: import.meta.env.VITE_API_C_CATEGORY,
        updateCategory: import.meta.env.VITE_API_U_CATEGORY,
        createSubCategory: (id: string) => buildUrlWithParams(import.meta.env.VITE_API_C_SUBCATEGORY, {id}),
        updateSubCategory: (id: string) => buildUrlWithParams(import.meta.env.VITE_API_U_SUBCATEGORY, {id}),

        getAllBrands: import.meta.env.VITE_API_G_A_BRAND,
        getAllUsers: import.meta.env.VITE_API_G_A_USER,
    },
    brand: {
        updateBrandInfo: (id: string) => buildUrlWithParams(import.meta.env.VITE_API_U_BRAND, {id}),

        createProduct: import.meta.env.VITE_API_C_PRODUCT,
        updateProduct: (id: string | number) => buildUrlWithParams(import.meta.env.VITE_API_U_PRODUCT, {id}),
        disableProduct: (status: number, id: string) => buildUrlWithParams(import.meta.env.VITE_API_H_PRODUCT, {
            status,
            id
        }),
        deleteProduct: (id: string) => buildUrlWithParams(import.meta.env.VITE_API_D_PRODUCT, {id}),

        createVariant: (id: string | undefined) => buildUrlWithParams(import.meta.env.VITE_API_C_VARIANT, {id}),
        updateVariant: (id: string | number) => buildUrlWithParams(import.meta.env.VITE_API_U_VARIANT, {id}),
    },
    user: {

    },
    public: {
        getAllProducts: (id: string) => buildUrlWithParams(import.meta.env.VITE_API_G_A_PRODUCT, {id}),
        getProductDetail: (id: string) => buildUrlWithParams(import.meta.env.VITE_API_I_PRODUCT, {id}),
        getProductByKeyword: (keyword: string) => buildUrlWithParams(import.meta.env.VITE_API_S_PRODUCT, {keyword}),

        getVariantDetail: (id: string | number) => buildUrlWithParams(import.meta.env.VITE_API_I_VARIANT, {id}),
        getAllVariant: (id: string | undefined) => buildUrlWithParams(import.meta.env.VITE_API_G_A_VARIANT, {id}),

        getBrandDetail: (id: string) => buildUrlWithParams(import.meta.env.VITE_API_I_BRAND, {id}),

        getCategory: import.meta.env.VITE_API_G_A_CATEGORY,
        getSubCategory: (id: string) => buildUrlWithParams(import.meta.env.VITE_API_G_A_SUBCATEGORY, {id}),
    }
}

export default endpoints;