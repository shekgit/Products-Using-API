import React, {useContext, useEffect, useState} from 'react';
import {ProductContextData} from "../context/ProductContext.jsx";
import {useNavigate} from "react-router-dom";

const Products = () => {
    const allProducts = useContext(ProductContextData);
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);
    const saveFavorites = (newFavorites) => {
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };
    const handleAddToFavorites = (productId) => {
        const isFavorite = favorites.includes(productId);
        let newFavorites;

        if (isFavorite) {
            newFavorites = favorites.filter(id => id !== productId);
        } else {
            newFavorites = [...favorites, productId];
        }
        saveFavorites(newFavorites);
        // toast notification
        console.log(isFavorite ? 'Removed from favorites' : 'Added to favorites');
    };
    const isFavorite = (productId) => {
        return favorites.includes(productId);
    };

    // Add loading state check
    if (!allProducts || allProducts.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading product...</p>
                </div>
            </div>
        );
    }
    const handleProductDetails = (productId) => {
        navigate(`/Products/${productId}`);
    }

    return (
        <div className="container mx-auto px-4 py-8 h-full">
            <h1 className="text-3xl font-bold mb-8 text-center">Our Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allProducts.map(product => (
                    <div key={product.id}
                         className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        {/* Image */}
                        <div className="h-64 bg-gray-50 flex items-center justify-center p-4">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="h-full object-contain"
                            />
                        </div>
                        {/* Content */}
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-3">
                        <span className="px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded">
                            {product.category}
                        </span>

                                <div className="relative group">
                                    <button
                                        onClick={() => handleAddToFavorites(product.id)}
                                        className={`p-2 rounded-full transition-all duration-300 ${
                                            isFavorite(product.id)
                                                ? 'text-red-500 bg-red-50'
                                                : 'text-gray-300 hover:text-red-500 hover:bg-red-50'
                                        }`}
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    {/* Tooltip */}
                                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
                                        {isFavorite(product.id) ? 'Remove from favorites' : 'Add to favorites'}
                                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                                {product.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                {product.description}
                            </p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="ml-2 text-sm text-gray-700">
                                {product.rating.rate}
                            </span>
                                </div>

                                <button
                                    onClick={() => handleProductDetails(product.id)}
                                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm rounded-lg hover:from-blue-700 hover:to-blue-800 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Products;