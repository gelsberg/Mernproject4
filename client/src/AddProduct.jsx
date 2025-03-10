import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [product, setProduct] = useState({ name: "", price: "", quantity: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/addproduct", product)
            .then(() => navigate("/"))
            .catch(err => console.log(err));
    };

    return (
        <div className="w-7xl flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-grey">
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Add Product</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="name">Name</label>
                            <input
                                name="name"
                                placeholder="Enter product name"
                                onChange={handleChange}
                                required
                                className="mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800" // Added text-gray-800
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="price">Price</label>
                            <input
                                name="price"
                                type="number"
                                placeholder="Enter price"
                                onChange={handleChange}
                                required
                                className="mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800" // Added text-gray-800
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="quantity">Quantity</label>
                            <input
                                name="quantity"
                                type="number"
                                placeholder="Enter quantity"
                                onChange={handleChange}
                                required
                                className="mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800" // Added text-gray-800
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-black text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition duration-200 transform hover:scale-105"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;