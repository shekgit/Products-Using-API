import React, {useContext, useEffect, useState} from 'react';
import {ProductContextData} from "../context/ProductContext.jsx";
import {useNavigate, useParams} from "react-router-dom";

const ProductDetails = () => {

    const [stockCount, setStockCount] = useState(0)
    const [cartCount, setCartCount] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [product, setProduct] = useState(null)

    const {id} = useParams();
    const allProducts = useContext(ProductContextData);
    const navigate = useNavigate();

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            const cartData = JSON.parse(savedCart);
            // Agar is product ki entry hai toh uska count set karo
            if (cartData[id]) {
                setCartCount(cartData[id].quantity || 0);
            }
        }
    }, [id]);

    useEffect(() => {
        if (allProducts && allProducts.length > 0) {
            setIsLoading(false)
            const foundProduct = allProducts.find(product => product.id.toString() === id)
            if (foundProduct) {
                setProduct(foundProduct);
                setStockCount(foundProduct.rating.count);
                const savedCart = localStorage.getItem('cart');
                if (savedCart) {
                    const cartData = JSON.parse(savedCart);
                    if (cartData[id]) {
                        const cartQuantity = cartData[id].quantity || 0;
                        setStockCount(foundProduct.rating.count - cartQuantity);
                    }
                }
            }
        }
    }, [allProducts, id]);
    useEffect(() => {
        console.log("Stock updated:", stockCount);
        console.log("Cart updated:", cartCount);
    }, [stockCount, cartCount]);
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading product...</p>
                </div>
            </div>
        );
    }
    if (!product) {
        return (
            <div className="container mx-auto px-4 py-8 text-center ">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Product not found!</h2>
                <p className="text-gray-600">Product ID: {id}</p>
                <button
                    onClick={() => navigate('/products')}
                    className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg"
                >
                    Back to Products
                </button>
            </div>
        );
    }
    const saveCartToLocalStorage = (productId, quantity, productData) => {
        const savedCart = localStorage.getItem('cart');
        let cart = savedCart ? JSON.parse(savedCart) : {};

        if (quantity === 0) {
            delete cart[productId];
        } else {
            cart[productId] = {
                ...productData,
                quantity: quantity,
                addedAt: new Date().toISOString()
            };
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    };
    const handleAddToCart = () => {
        const newCartCount = cartCount + 1;
        const newStockCount = stockCount > 0 ? stockCount - 1 : 0;

        setCartCount(newCartCount);
        setStockCount(newStockCount);
        saveCartToLocalStorage(id, newCartCount, {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            category: product.category,
            originalStock: product.rating.count
        });

        console.log(`Added ${product.title} to cart`);
    }
    const handleRemoveFromCart = () => {
        if (cartCount > 0) {
            const newCartCount = cartCount - 1;
            const newStockCount = stockCount + 1;

            setCartCount(newCartCount);
            setStockCount(newStockCount);

            saveCartToLocalStorage(id, newCartCount, {
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                category: product.category,
                originalStock: product.rating.count
            });
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 h-full overflow-hidden">
            {/*Back Button */}
            <button
                onClick={() => navigate('/products')}
                className="mb-8 flex items-center text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
            >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to All Products
            </button>
            <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                {product.title}
            </h1>
            <p className="text-gray-400 text-center mb-8">Complete Specifications & Details</p>
            <div className="space-y-6">
                <div
                    key={product.id}
                    className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                    {/* Product Image */}
                    <div className="md:w-2/5 lg:w-1/3 p-6 flex items-center justify-center bg-gray-50">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="h-64 md:h-80 object-contain transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                    {/* Product Details */}
                    <div className="md:w-3/5 lg:w-2/3 p-6 md:p-8 flex flex-col justify-between">
                        <div>
                            {/* Category & Badge */}
                            <div className="mb-4">
                                    <span
                                        className="inline-block px-3 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full uppercase">
                                        {product.category}
                                    </span>
                            </div>
                            {/* Title */}
                            <h2 className="text-2xl font-bold text-gray-800 mb-3 line-clamp-2">
                                {product.title}
                            </h2>
                            {/* Description */}
                            <p className="text-gray-600 mb-6 line-clamp-3">
                                {product.description}
                            </p>
                            {/* Rating */}
                            <div className="flex items-center mb-4">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-5 h-5 ${
                                                i < Math.floor(product.rating.rate)
                                                    ? 'text-yellow-400'
                                                    : 'text-gray-300'
                                            }`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                    ))}
                                    <span className="ml-2 text-gray-700 font-semibold">
                                            {product.rating.rate}
                                        </span>
                                    <span className="ml-1 text-gray-500 text-sm">
                                            ({product.rating.count} reviews)
                                        </span>
                                </div>
                            </div>
                        </div>
                        <div
                            className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-6 border-t border-gray-100">
                            <div className="mb-4 sm:mb-0">
        <span className="text-3xl font-bold text-green-600">
            ${product.price}
        </span>
                                <div className="text-sm text-gray-500 mt-1">
            <span className="inline-flex items-center">
                <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"/>
                </svg>
                In stock: {stockCount}
            </span>
                                    <span className="ml-4 inline-flex items-center">
                <svg className="w-4 h-4 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z"/>
                </svg>
                In cart: {cartCount}
            </span>
                                </div>
                            </div>
                            <div className="flex space-x-3">
                                {/* Add to Cart Button */}
                                <button
                                    onClick={handleAddToCart}
                                    disabled={stockCount === 0}
                                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                                    {stockCount === 0 ? 'Out of Stock' : 'Add +'}
                                </button>
                                {/* Remove from Cart Button */}
                                {cartCount > 0 && (
                                    <button
                                        onClick={handleRemoveFromCart}
                                        className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer">
                                        Remove -
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductDetails;