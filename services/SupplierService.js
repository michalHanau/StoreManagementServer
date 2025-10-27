const UsersModel = require('../models/usersModel');

class SupplierService {

    async getAll(queryParameters) {
        let result = await UsersModel.find({ role: { $ne: 'admin' } });
        if (result.length == 0) {
            throw new Error('Not found')
        }
        return result;
    }
}

let supplierService = new SupplierService();
module.exports = supplierService;