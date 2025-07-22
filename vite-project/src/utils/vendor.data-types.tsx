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

export interface variantListType {
    id: string,
    sku:string,
    name: string,
    status: string,
    has_attribute: boolean,
}