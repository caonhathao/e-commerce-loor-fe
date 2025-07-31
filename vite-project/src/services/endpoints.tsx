import {buildUrlWithParams} from "../utils/utils.js.tsx";

const API_HOST = "http://localhost:8761"; // từ VITE_API_HOST + VITE_SERVER_PORT

const endpoints = {
    system: {
        socketConnection: API_HOST,
    },
    auth: {
        userLogin: "/api/public/user-login",
        userRegister: "/api/public/create-user",
        userLogout: "/api/user/logout",
        brandLogin: "/api/public/brand-login",
        brandRegister: "/api/public/create-brand",
        brandLogout: "/api/vendor/logout",
        refresh: "/api/auth/refresh",
        authBrand: "/api/system/authentication/",
        logout: "/api/me/logout",
    },
    admin: {
        createCategory: "/api/manager/create-category",
        updateCategory: (id: string) => buildUrlWithParams("/api/manager/update-category/:id", {id}),
        deleteCategory: (id: string) => buildUrlWithParams("/api/manager/delete-category/:id", {id}),

        createSubCategory: "/api/manager/create-sub-category",
        updateSubCategory: (id: string) => buildUrlWithParams("/api/manager/update-sub-category/:id", {id}),
        deleteSubCategory: (id: string) => buildUrlWithParams("/api/manager/delete-sub-category/:id", {id}),

        getAllBrands: "/api/manager/get-all-brands",
        getAllUsers: "/api/manager/get-all-users",

        lockUser: "/api/manager/lock-user-by-id",
        restoreUser: "/api/manager/restore-user-by-id",
    },
    brand: {
        getBrandInfo: "/api/brand/get-profile",
        updateBrandInfo: "/api/vendor/brand-update",
        changePassword: "/api/vendor/change-password",

        getProductByIdFromBrand: (id: string | undefined) => buildUrlWithParams("/api/vendor/get-product-by-id/:id", {id}),
        getAllProducts: "/api/vendor/get-all-products",

        createProduct: "/api/vendor/create-products",
        updateProduct: (id: string | number) => buildUrlWithParams("/api/vendor/update-product/:id", {id}),
        disableProduct: "/api/vendor/disabled-products",
        deleteProduct: "/api/vendor/delete-product",

        getAllVariants: "/api/vendor/get-all-variants",
        createVariant: (id: string) => buildUrlWithParams("/api/vendor/create-new-variant/:id", {id}),
        updateVariant: (id: string) => buildUrlWithParams("/api/vendor/update-variant-with-id/:id", {id}),

        deleteVariant: (id: string) => buildUrlWithParams("/api/vendor/delete-variant-with-id", {id}),
        updateAttribute: (id: string) => buildUrlWithParams("/api/vendor/create-new-variant-attribute/:id", {id}),

        getAllNotifications: "/api/vendor/get-all-notify-me",

        getOrders: "/api/vendor/get-all-orders",
        searchOrders: "/api/vendor/search-by-id",
        acceptOrder: "/api/vendor/accept-order",
        updateOrder: "/api/vendor/update-status-order",
    },
    user: {
        getUserInfo: "/api/user/get-user-by-id",
        updateUserInfo: "/api/user/update-user-info",
        updatePassword: "/api/user/change-password",

        createAddress: "/api/user/add-shipping-address",
        updateAddress: "/api/user/update-shipping-address",
        getAllAddress: "/api/user/get-all-address",
        deleteAddress: "/api/user/remove-shipping-address",

        getAllNotifications: "/api/user/get-all-notify-me",
        getNotificationDetail: "/api/user/get-notify-detail",
        getNotificationByType: "/api/user/get-all-notify-by-type",
        markAsRead: "/api/user/mark-all-notifications-read",
        deleteNotification: "/api/user/delete-notification",
        deleteNotifications: "/api/user/delete-notifications",
        deleteAllNotifications: "/api/user/delete-all-notifications",

        getOrders: "/api/user/get-all-orders/",
        getOrdersByStatus: "/api/user/get-all-orders-by-status",
        createOrder: "/api/user/create-new-order",
        cancelOrder: (id: string) => buildUrlWithParams("/api/user/cancel-order/:id", {id}),
        getOrderDetail: (id: string) => buildUrlWithParams("/api/user/get-order-detail/:id", {id}),
        searchOrder: '/api/user/search-by-id',

        getReceiptByOrderId: (id: string) => buildUrlWithParams("/api/user/get-receipt-from-order/:id", {id}),

        addToCart: "/api/user/add-to-cart",
        getCart: "/api/user/get-cart",
        searchCart: "/api/user/search-cart",
        updateCart: "/api/user/update-cart",
        deleteCart: "/api/user/delete-cart",
    },
    public: {
        getAllProvinces: "/api/public/get-all-provinces",
        getAllDistricts: (province_id: string) => buildUrlWithParams("/api/public/get-all-districts/:province_id", {province_id}),

        getAllProducts: "/api/public/get-all-products",
        getProductByIdFromUser: (id: string) => buildUrlWithParams("/api/public/get-product-by-id/:id", {id}),
        getProductByKeyword:"/api/public/search-product",
        getProductByPrice: "/api/public/get-product-by-price",
        getAllProductsFromBrand: (id: string | undefined) => buildUrlWithParams("/api/public/get-all-products/:id", {id}),

        getVariantDetail: (id: string) => buildUrlWithParams("/api/public/get-variant-by-id/:id", {id}),
        getAllVariants: (id: string) => buildUrlWithParams("/api/public/get-all-variants/:id", {id}),

        getAllAttributes: "/api/public/get-all-variant-attributes",

        getBrandDetail: (id: string) => buildUrlWithParams("/api/public/get-brand-by-id/:id", {id}),

        getAllCategories: "/api/public/get-all-category",
        getAllSubCategories: (id: string) => buildUrlWithParams("/api/public/get-all-sub-from-category/:id", {id}),
        getSubCategory: (id: string) => buildUrlWithParams("/api/public/get-sub-category/:id", {id}),
    }
};

export default endpoints;
