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
    method: string,
}

export interface addressType {
    id: string,
    address: string,
    ward: string,
    city: string,
    default: boolean,
}

export interface userType {
    account_name: string,
    full_name: string,
    birthday: string,
    gender: string,
    email: string,
    numberphone: string,
    shipping_address: addressType[],
    image_link: string,
}

export interface listProvinceType {
    id: string;
    name: string;
}

export interface listDistrictType {
    id:string;
    name: string;
}