const Controller = require('./Controller');
const Service = require('../services/SupplierService')

class SupplierController extends Controller {
    constructor() {
        super(Service)
    }
}

let supplierController = new SupplierController();
module.exports = supplierController;