import React from 'react';
import {NavLink, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {
    return (
        <div className="min-h-screen bg-[#111] text-[#ded] flex flex-col">

            <nav className="bg-black/80 backdrop-blur-md py-5 px-6 border-b border-gray-800 sticky top-0 z-10">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <div className="text-2xl font-bold text-white">
                            <span className="text-emerald-500">Shop</span>Cart
                        </div>

                        {/* Navigation Links */}
                        <div className="flex items-center space-x-12">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `group text-lg font-semibold tracking-wide transition-all duration-300 relative ${
                                        isActive
                                            ? 'text-emerald-400'
                                            : 'text-gray-300 hover:text-white'
                                    }`
                                }
                            >
                                Home
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
                            </NavLink>

                            <NavLink
                                to="/products"
                                className={({ isActive }) =>
                                    `group text-lg font-semibold tracking-wide transition-all duration-300 relative ${
                                        isActive
                                            ? 'text-emerald-400'
                                            : 'text-gray-300 hover:text-white'
                                    }`
                                }
                            >
                                Products
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex-1">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/Products" element={<Products/>}/>
                    <Route path="/Products/:id" element={<ProductDetails/>}/>
                </Routes>
            </div>

            <Footer />
        </div>
    );
};
export default App;