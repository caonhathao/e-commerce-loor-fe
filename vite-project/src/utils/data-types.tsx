export interface cartType {
    brand_id: string;
    brand_image: string;
    brand_name: string;
    items: {
        id: string,
        amount: number,
        pinned: boolean,
        variant_id: string,
        image_link: string,
        product_variants: {
            name: string,
            price: number,
            products: {
                status: boolean,
            }
        }
    }[]
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
    shipping_address: addressType[],
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
    POSTPONED: 'Trì hoãn',
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
        product_variants: {
            name: string,
            sku: string,
            price: number
        }
    }[]
}

export interface receiptData {
    id: string,
    order_id: string,
    payment: string,
    payment_status: string,
    reason: string | null,
    createdAt: string,
}

export interface notificationDetailData{
    id:string,
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