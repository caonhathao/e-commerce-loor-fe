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

export interface orderType {
    list: listVariantsType | undefined,
    method: string,
    shipping_type: string,
    address: string,
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

export interface orderType{
    id:string,
    cost:number,
    fee:number,
    method:string,
    shipping_type:string,
    status:string,
    createdAt:string,
    updatedAt:string,
    address:string,
    brand_id:string,
}

export interface receiptData{

}