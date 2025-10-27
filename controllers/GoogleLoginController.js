const Controller = require('./Controller');
const Service = require('../services/GoogleLoginService');
const client = require('../config/googleClient');


class GoogleLoginController extends Controller {
    constructor() {
        super(Service)
    }

    async googleLoginSupplier(token) {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        return await this.service.googleLoginSupplier(ticket)
    }
}

let googleLoginController = new GoogleLoginController();
module.exports = googleLoginController;
