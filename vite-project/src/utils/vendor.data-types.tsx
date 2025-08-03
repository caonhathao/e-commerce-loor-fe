import {orderStatusOptions} from "./attributes.tsx";

export interface vendorType {
    address: string,
    createdAt: string,
    description: string,
    email: string,
    image_link: string,
    is_locked: boolean,
    name: string,
    numberphone: string,
}

export interface productListDetailType {
    id: number,
    name: string,
    status: string,
}

export interface productListType {
    current_items: number,
    current_page: number,
    total_items: number,
    total_pages: number,
    data: productListDetailType[]
}

export interface imageType {
    file: File,
    url: string,
}

export interface imgStored {
    id: string,
    image_id: string,
    image_link: string,
}

export interface productDataType{
    id: string,
    category_id: string,
    subcategory_id: string,
    name: string,
    origin: string,
    status: number,
    average_price: number,
    description: string,
    promotion: number,
    tags: string,
    stock: number,
    ImageProducts: imgStored[],
}

export interface productVariantType {
    id: string,
    product_id: string,
    name: string,
    sku: string,
    price: number,
    stock: number,
    status: string,
    image_link: string,
}

export interface attributesType {
    name_att: string;
    value_att: string;
}

export interface variantListType {
    id: string,
    sku: string,
    name: string,
    status: string,
    has_attribute: boolean,
}

export interface orderListDetailType {
    address: string;
    cost: number;
    createdAt: string;
    id: string;
    status: typeof orderStatusOptions;
    user_id: string;
    shipping_type: string;
}

export interface orderListType {
    cost: number;
    current_items: number;
    current_page: number;
    data: orderListDetailType[];
    total_items: number;
    total_pages: number;
}