const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

class GoogleLoginService {
    constructor() {
    }

    async googleLoginSupplier(ticket) {
        const payload = ticket.getPayload();
        if (!payload) return { error: "Invalid payload" };

        const { sub: googleId, email, name, picture } = payload;

        let user = await usersModel.findOne({ email });

        if (!user) {
            return { isNewUser: true, payload };
        }
        return { isNewUser: false, user };
    }
}

let googleLoginService = new GoogleLoginService();
module.exports = googleLoginService;
