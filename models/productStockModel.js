const mongoose = require('mongoose');

const productStockSchema = mongoose.Schema({
    productID: Number,
    minimum_quantity: Number,
    current_quantity: Number
}, { collection: 'ProductStock' });

const ProductStock = mongoose.model('ProductStock', productStockSchema);

module.exports = ProductStock;
