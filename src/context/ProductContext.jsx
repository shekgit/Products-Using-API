import React, {createContext, useEffect, useState} from 'react';
import {getProducts} from './../api/productApi.js'

export const ProductContextData = createContext()
const ProductContext = ({children}) => {
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        const loadProducts = async () => {
            const data = await getProducts();
            setProducts(data);
        }
        loadProducts();
    },[])

    return (
        <ProductContextData.Provider value={products}>
            <div>
                {
                   children
                }
            </div>
        </ProductContextData.Provider>
    );
};

export default ProductContext;