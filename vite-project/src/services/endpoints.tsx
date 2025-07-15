import {buildUrlWithParams} from "../utils/utils.js.tsx";

const endpoints = {
    system: {
        socketConnection: import.meta.env.VITE_API_HOST + import.meta.env.VITE_SERVER_PORT,
    },
    auth: {
        userLogin: import.meta.env.VITE_API_L_USER,
        userRegister: import.meta.env.VITE_API_R_USER,
        userLogout: import.meta.env.VITE_API_LO_USER,
        brandLogin: import.meta.env.VITE_API_L_BRAND,
        brandRegister: import.meta.env.VITE_API_R_BRAND,
        brandLogout: import.meta.env.VITE_API_LO_BRAND,
        refresh: import.meta.env.VITE_API_TOKEN_REFRESH,
        authBrand: import.meta.env.VITE_API_V_BRAND,
    },
    admin: {
        createCategory: import.meta.env.VITE_API_C_CATEGORY,
        updateCategory: (id: string) => buildUrlWithParams(import.meta.env.VITE_API_U_CATEGORY, {id}),
        deleteCategory: (id: string) => buildUrlWithParams(import.meta.env.VITE_API_D_CATEGORY, {id}),

        createSubCategory: import.meta.env.VITE_API_C_SUBCATEGORY,
        updateSubCategory: (id: string) => buildUrlWithParams(import.meta.env.VITE_API_U_SUBCATEGORY, {id}),
        deleteSubCategory: (id: string) => buildUrlWithParams(import.meta.env.VITE_API_D_SUBCATEGORY, {id}),

        getAllBrands: import.meta.env.VITE_API_G_A_BRAND,
        getAllUsers: import.meta.env.VITE_API_G_A_USER,

        lockUser: import.meta.env.VITE_API_H_USER,
        restoreUser: import.meta.env.VITE_API_UH_USER,
    },
    brand: {
        updateBrandInfo: import.meta.env.VITE_API_U_BRAND,

        getProductByIdFromBrand: (id: string) => buildUrlWithParams(import.meta.env.VITE_API_I_PRODUCT_VENDOR, {id}),

        createProduct: import.meta.env.VITE_API_C_PRODUCT,
        updateProduct: (id: string | number) => buildUrlWithParams(import.meta.env.VITE_API_U_PRODUCT, {id}),
        disableProduct: import.meta.env.VITE_API_H_PRODUCT,
        deleteProduct: (id: string) => buildUrlWithParams(import.meta.env.VITE_API_D_PRODUCT, {id}),

        createVariant: (id: string) => buildUrlWithParams(import.meta.env.VITE_API_C_VARIANT, {id}),
        updateVariant: (id: string) => buildUrlWithParams(import.meta.env.VITE_API_U_VARIANT, {id}),

        deleteVariant: (id: string) => buildUrlWithParams(import.meta.env.VITE_API_D_VARIANT, {id}),
        updateAttribute: (id: string) => buildUrlWithParams(import.meta.env.VITE_API_U_ATTRIBUTE, {id}),

        getAllNotifications: import.meta.env.VITE_API_G_A_VENDOR,

        getOrders: import.meta.env.VITE_API_G_A_ORDERS_VENDOR,
        getOrdersByStatus: import.meta.env.VITE_API_G_ORDERS_STATUS,
        acceptOrder: import.meta.env.VITE_API_AC_ORDER,
        updateOrder: import.meta.env.VITE_API_U_ORDER,
    },
    user: {
        getUserInfo: import.meta.env.VITE_API_I_USER,
        updateUserInfo: import.meta.env.VITE_API_U_USER,
        updatePassword: import.meta.env.VITE_API_U_USER_CHANGE_PASS,

        createAddress: import.meta.env.VITE_API_C_ADDRESS,
        updateAddress: import.meta.env.VITE_API_U_ADDRESS,
        getAllAddress: import.meta.env.VITE_API_G_A_ADDRESS,
        deleteAddress: import.meta.env.VITE_API_D_ADDRESS,

        getAllNotifications: import.meta.env.VITE_API_G_A_CUSTOMER,

        getOrders: import.meta.env.VITE_API_G_A_ORDERS_CUSTOMER,
        createOrder: import.meta.env.VITE_API_C_ORDER,
        cancelOrder: (id: string) => buildUrlWithParams(import.meta.env.VITE_API_D_ORDER, {id}),
        getOrderDetail: (id: string) => buildUrlWithParams(import.meta.env.VITE_API_I_ORDER, {id}),

        addToCart: import.meta.env.VITE_API_C_CART,
        getCart: import.meta.env.VITE_API_G_CART,
        updateCart: import.meta.env.VITE_API_U_CART,
        deleteCart: import.meta.env.VITE_API_D_CART,
    },
    public: {
        getAllProvinces: import.meta.env.VITE_API_G_A_PROVINCES,
        getAllDistricts: (province_id: string) => buildUrlWithParams(import.meta.env.VITE_API_G_A_DISTRICTS, {province_id}),

        getAllProducts: import.meta.env.VITE_API_G_A_PRODUCT,
        getProductByIdFromUser: (id: string) => buildUrlWithParams(import.meta.env.VITE_API_I_PRODUCT_USER, {id}),
        getProductByKeyword: (key: string) => buildUrlWithParams(import.meta.env.VITE_API_G_S_PRODUCT, {key}),
        getProductByPrice: import.meta.env.VITE_API_G_S_PRODUCT_PRICE,
        getAllProductsFromBrand: (id: string) => buildUrlWithParams(import.meta.env.VITE_API_G_A_PRODUCT_FROM_BRAND, {id}),

        getVariantDetail: (id: string) => buildUrlWithParams(import.meta.env.VITE_API_I_VARIANT, {id}),
        getAllVariants: (id: string) => buildUrlWithParams(import.meta.env.VITE_API_G_A_VARIANT, {id}),

        getAllAttributes: import.meta.env.VITE_API_G_ATTRIBUTE,

        getBrandDetail: (id: string) => buildUrlWithParams(import.meta.env.VITE_API_I_BRAND, {id}),

        getAllCategories: import.meta.env.VITE_API_G_A_CATEGORY,
        getAllSubCategories: (id: string) => buildUrlWithParams(import.meta.env.VITE_API_G_A_SUBCATEGORY, {id}),
        getSubCategory: (id: string) => buildUrlWithParams(import.meta.env.VITE_API_I_SUBCATEGORY, {id}),
    }
}

export default endpoints;