import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
    const { id } = useParams(); // Get product ID from URL
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: "",
        price: "",
        quantity: ""
    });

    // Fetch product details when component loads
    useEffect(() => {
        axios.get(`http://localhost:8000/api/getAllproducts`)
            .then((res) => {
                const foundProduct = res.data.find((p) => p._id === id);
                if (foundProduct) {
                    setProduct(foundProduct);
                } else {
                    alert("Product not found");
                    navigate("/");
                }
            })
            .catch((err) => console.log(err));
    }, [id, navigate]);

    // Handle input change
    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    // Handle form submission (Update the product)
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/editproduct/${id}`, product)
            .then(() => {
                alert("Product updated successfully!");
                navigate("/");
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className=" w-7xl min-h-screen bg-gradient-to-r from-blue-500 to to-black p-8 flex items-center justify-center">
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Edit Product</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="name"
                        value={product.name}
                        placeholder="Name"
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                    />
                    <input
                        name="price"
                        type="number"
                        value={product.price}
                        placeholder="Price"
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                    />
                    <input
                        name="quantity"
                        type="number"
                        value={product.quantity}
                        placeholder="Quantity"
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                    />
                    <button
                        type="submit"
                        className="w-full bg-black text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition duration-200 transform hover:scale-105"
                    >
                        Update Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;