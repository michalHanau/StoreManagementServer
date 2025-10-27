const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    ID: Number,
    companyName: String,
    phoneNumber: String,
    email: String,
    fullName: String,
    role: String,
}, { collection: 'Users' });

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;