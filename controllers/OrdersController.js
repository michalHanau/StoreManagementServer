const Controller = require('./Controller');
const Service = require('../services/OrdersService')

class OrdersController extends Controller {
    constructor() {
        super(Service)
    }

    async getOrdersBySupplierId(id) {
        const orders = await this.service.getOrdersBySupplierId(id)
        return orders;
    }

    async updateOrderStatus(orderId){
        return await this.service.updateOrderStatus(orderId)
    }

    async addNewOrder(newOrder){
        const { supplierID, items, status} = newOrder;
        return await this.service.addNewOrder(supplierID, items, status)
    }
}

let ordersController = new OrdersController();
module.exports = ordersController;