const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const ProductModel = require('./product');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Company')
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err));

// Create a Product (POST /api/addproduct)
app.post('/api/addproduct', async (req, res) => {
    try {
        const product = await ProductModel.create(req.body);
        res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all products (GET /api/getAllproducts)
app.get('/api/getAllproducts', async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a Product (PUT /api/editproduct/:id)
app.put('/api/editproduct/:id', async (req, res) => {
    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: 'Product updated successfully', updatedProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a Product (DELETE /api/deleteproduct/:id)
app.delete('/api/deleteproduct/:id', async (req, res) => {
    try {
        await ProductModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the Server
const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
