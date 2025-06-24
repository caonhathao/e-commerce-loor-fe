import {createContext, ReactNode, useContext, useState} from "react";

interface ProductContextType {
    product: object | null | undefined;
    setProduct: (value: object | null) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({children}: { children: ReactNode }) => {
    const [product, setProduct] = useState<object | null>();

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