const mongoose = require('mongoose');
const status = require('../enum/statusEnum');

const orderSchema = mongoose.Schema({
    ID: Number,
    supplierID: Number,
    items: [
        {
            productID: Number,
            quantity: Number
        }
    ],
    status: { type: String, enum: Object.values(status) } 
}, { collection: 'Orders' });

const Order = mongoose.model('Orders', orderSchema);

module.exports = Order;
