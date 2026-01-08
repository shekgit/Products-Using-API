import React from 'react';
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/Products');
    }
    return (
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-center">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                    Discover Amazing Products
                </h1>
                <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                    Explore our curated collection of premium products.
                    From electronics to fashion, find exactly what you're looking for.
                </p>
                <button
                    onClick={handleClick}
                    className="group relative px-8 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/30 cursor-pointer"
                >
                    <span className="relative z-10">Shop Now</span>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"></div>
                </button>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 bg-gray-900/50 rounded-xl backdrop-blur-sm border border-gray-800">
                        <div className="w-12 h-12 bg-emerald-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Quality Guaranteed</h3>
                        <p className="text-gray-400">All products verified for quality and authenticity</p>
                    </div>
                    <div className="p-6 bg-gray-900/50 rounded-xl backdrop-blur-sm border border-gray-800">
                        <div className="w-12 h-12 bg-emerald-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Best Prices</h3>
                        <p className="text-gray-400">Competitive pricing with regular discounts</p>
                    </div>
                    <div className="p-6 bg-gray-900/50 rounded-xl backdrop-blur-sm border border-gray-800">
                        <div className="w-12 h-12 bg-emerald-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Fast Delivery</h3>
                        <p className="text-gray-400">Quick shipping across the country</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Home;