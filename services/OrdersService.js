const orderModel = require('../models/orderModel');
const status = require('../enum/statusEnum');

class OrdersService {

    async getAll(queryParameters) {
        let result = await orderModel.find({})
        if (result.length == 0) {
            return { success: false, message: 'לא קיימות הזמנות' }
        }
        return { success: true, data: result }
    }

    async getOrdersBySupplierId(id) {
        let result = await orderModel.find({ supplierID: id })
        if (!result) {
            return { success: false, message: 'לא קיימות הזמנות' }
        }
        return { success: true, data: result }
    }

    async updateOrderStatus(orderId) {
        try {
            const order = await orderModel.findOne({ ID: orderId })
            if (!order) {
                return { message: 'ההזמנה לא נמצאה' }
            }
            let newStatus;
            if (order.status == status.PENDING) {
                newStatus = status.IN_PROCESS;
            } else if (order.status == status.IN_PROCESS) {
                newStatus = status.COMPLETED;
            } else {
                return { success: false, message: 'הזמנה זו כבר הושלמה' }
            }
            order.status = newStatus
            await order.save()
            return { success: true, message: 'סטטוס ההזמנה שונה בהצלחה', status: order.status }
        } catch (err) {
            return { success: false, message: 'שגיאה בעדכון הסטטוס' }
        }
    }

    async addNewOrder(supplierID, items, status) {
        try {
            const maxOrder = await orderModel.findOne().sort({ ID: -1 }).select('ID -_id')
            const ID = maxOrder ? maxOrder.ID + 1 : 1
            const order = new orderModel({ ID, supplierID, items, status })
            await order.save();
            return { success: true, message: 'ההזמנה נוספה בהצלחה!' }
        } catch (err) {
            return { success: false, message: 'שגיאה בהוספת הזמנה' }
        }
    }
}

let ordersService = new OrdersService();
module.exports = ordersService;