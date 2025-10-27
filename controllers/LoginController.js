const Controller = require('./Controller');
const Service = require('../services/LoginService');


class AuthController extends Controller {
    constructor() {
        super(Service)
    }

    async registerSupplier(supplierData) {
        const { companyName, phoneNumber, email, fullName } = supplierData
            console.log("fullName", fullName);
        return await this.service.registerSupplier(companyName, phoneNumber, email, fullName)
    }

    async loginSupplier(userData) {
        const { phoneNumber } = userData
        return await this.service.loginSupplier(phoneNumber)
    }
}

let authController = new AuthController();
module.exports = authController;
