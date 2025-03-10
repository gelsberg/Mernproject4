import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/getAllproducts")
            .then((res) => setProducts(res.data))
            .catch((err) => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/api/deleteproduct/${id}`)
            .then(() => setProducts(products.filter(product => product._id !== id)))
            .catch(err => console.log(err));
    };

    return (
        <div className=" w-7xl min-h-screen bg-gradient-to-r from-blue-500 to-black p-8">
            <h1 className="text-4xl font-bold text-center text-white mb-6">Product Inventory</h1>
            <Link to="/add-product" className="bg-white text-blue-500 px-4 py-2 rounded shadow-md hover:bg-blue-100 transition duration-200">
                Add Product
            </Link>
            <div className="overflow-x-auto mt-4 bg-white rounded-lg shadow-md">
                <table className="w-full mt-4">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-4 text-left text-gray-800">Name</th>
                            <th className="p-4 text-left text-gray-800">Price</th>
                            <th className="p-4 text-left text-gray-800">Quantity</th>
                            <th className="p-4 text-left text-gray-800">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id} className="border-b hover:bg-gray-100">
                                <td className="p-4 text-gray-800">{product.name}</td>
                                <td className="p-4 text-gray-800">${product.price}</td>
                                <td className="p-4 text-gray-800">{product.quantity}</td>
                                <td className="p-4">
                                    <Link to={`/edit-product/${product._id}`} className="text-blue-500 hover:underline">Edit</Link>
                                    <button onClick={() => handleDelete(product._id)} className="text-red-500 ml-4 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;