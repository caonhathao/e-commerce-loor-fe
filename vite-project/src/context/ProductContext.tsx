import {createContext, ReactNode, useContext, useState} from "react";
import {productListDetailType} from "../utils/vendor.data-types.tsx";

interface ProductContextType {
    product: productListDetailType | null | undefined;
    setProduct: (value: productListDetailType | null | undefined) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({children}: { children: ReactNode }) => {
    const [product, setProduct] = useState<productListDetailType | null>();

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