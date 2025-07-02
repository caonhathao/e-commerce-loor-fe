import {createContext, ReactNode, useContext, useState} from "react";

interface Product {
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

interface ProductContextType {
    product: Product | null | undefined;
    setProduct: (value: Product | null) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({children}: { children: ReactNode }) => {
    const [product, setProduct] = useState<Product | null>();

    return (
        <ProductContext.Provider value={{product, setProduct}}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProduct must be used within a ProductProvider");
    }
    return context;
};