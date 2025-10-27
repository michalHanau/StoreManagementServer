const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    ID: Number,
    productName: String,
    suppliers: [
        {
            supplierID: Number,
            price: Number,
            minQuantity: Number
        }
    ]
}, { collection: 'Products' });

const Product = mongoose.model('Products', productSchema);

module.exports = Product;
