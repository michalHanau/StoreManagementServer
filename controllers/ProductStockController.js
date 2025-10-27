const Controller = require('./Controller');
const Service = require('../services/ProductStockService')

class ProductStockController extends Controller {
    constructor() {
        super(Service)
    }

    async updateStock(productId, quantity) {
        return await this.service.updateStock(productId, quantity)
    }
}

let productStockController = new ProductStockController();
module.exports = productStockController;