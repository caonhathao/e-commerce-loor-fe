export interface Product {
    id: string;
    name: string;
    average_price: number;
    category_id: string;
    subcategory_id: string;
    origin: string,
    status: string,
    createdAt: string,
    updatedAt: string,
    other_variant: string;
    stock: string;
}

export interface productType {
    id: string,
    brand_id: string,
    category_id: string,
    subcategory_id: string,
    name: string,
    ImageProducts: {
        image_link: string,
    }[],
    average_price: string,
    status: string,
    origin: string,
    stock: number,
}

export interface productListDataType {
    current_page: number,
    total_pages: number,
    current_items: number,
    total_items: number,
    data: productType[]
}

export interface productVariantType {
    id: string,
    name: string,
    price: string,
    ProductAttributes: {
        name_att: string,
        value_att: string,
    }[],
    image_link: string,
    sku: string,
}

export interface productDetailDataType {
    id: string,
    brand_id: string,
    category_id: string,
    subcategory_id: string,
    name: string,
    ImageProducts: {
        image_link: string,
    }[],
    FeaturedProduct: {
        product_wishlist: 0
    }
    average_price: string,
    status: string,
    origin: string,
    promotion: number,
    stock: number,
    description: string,
    ProductVariants: productVariantType[]
    Brands: {
        name: string,
        image_link: string,
    }
}

export interface reviewDataType {
    current_page: number,
    total_pages: number,
    current_items: number,
    total_items: number,
    data: {
        content: string,
    },
    review_has_image: number,
    start: {
        1: number,
        2: number,
        3: number,
        4: number,
        5: number,
    }
}

export interface cartType {
    brand_id: string;
    brand_image: string;
    brand_name: string;
    items: {
        id: string,
        amount: number,
        pinned: boolean,
        variant_id: string,
        ProductVariants: {
            name: string,
            price: number,
            stock: number,
            image_link: string,
            Products: {
                status: boolean,
            }
        }
    }[]
}

export interface variantType {
    id: string,
    name: string,
    price: number,
    sku: string,
    status: string,
    stock: number,
    has_attribute: boolean;
}

export interface listVariantsType {
    list: {
        brand_id: string,
        brand_name: string,
        list: {
            cart_id: string;
            variant_id: string,
            variant_name: string
            image_link: string,
            amount: number,
            cost: number,
        }[],
        cost: number,
        fee: number,
    }[],
}

export interface addressType {
    id: '',
    address: '',
    ward: '',
    city: '',
    is_default: false,
}

export interface userType {
    account_name: '',
    full_name: '',
    birthday: '',
    gender: '',
    email: '',
    numberphone: '',
    ShippingAddress: addressType[],
    notify_count: 0,
    image_link: '',
}

export interface listProvinceType {
    id: string;
    name: string;
}

export interface listDistrictType {
    id: string;
    name: string;
}

export interface jwtPayloadData {
    id: string,
    role: string,
    locked: boolean,
    iat: number,
    exp: number,
}

export interface orderType {
    id: string,
    cost: number,
    fee: number,
    status: string,
    createdAt: string,
    address: string,
}

export interface orderDataType {
    current_page: number,
    total_items: number,
    current_items: number,
    total_pages: number,
    data: orderType[]
}

export const orderStatus = {
    PENDING: 'Đang chờ',
    CONFIRMED: 'Đã xác nhận',
    PREPARING: 'Đang chuẩn bị',
    DELIVERING: 'Đang vận chuyển',
    CANCELED: 'Bị hủy',
    ABORTED: ' Bị tư chối',
    POSTPONED: 'Chờ thanh toán',
    REFUNDED: 'Hoàn trả',
    COMPLETE: 'Hoàn thành'
}

export interface orderDetailType {
    cost: number,
    createdAt: string,
    fee: number,
    status: string,
    user_id: string,
    address: string,
    shipping_type: string,
    brand_id: string,
    OrderDetail: {
        amount: number,
        cost: number,
        variant_id: string,
        ProductVariants: {
            name: string,
            sku: string,
            price: number
        }
    }[]
}

export interface orderStatusType {
    id: string,
    status_code: string,
    status_name: string,
    status_mean: string,
    status_color: string,
}

export interface receiptData {
    id: string,
    order_id: string,
    payment: string,
    payment_status: string,
    reason: string | null,
    createdAt: string,
}

export interface notificationDetailData {
    id: string,
    title: string,
    content: string,
    createdAt: string,
    status: string,
    type: string,
    redirect_url: string,
}

export interface notificationType {
    current_items: number;
    current_page: number;
    total_items: number;
    total_pages: number;
    data: notificationDetailData[]
}

export interface orderLogType    {
    status: string,
    type: string,
    createdAt: string,
    statusInfo:{
        status_code: string,
        status_name: string,
        status_mean: string,
        status_color: string,
    }
}