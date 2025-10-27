const productStockModel = require('../models/productStockModel');
require('dotenv').config();
const ProductService = require('./ProductService');
const OrdersService = require('./OrdersService');
const status = require('../enum/statusEnum');



class ProductStockService {

    //הפונקציה מוצאת ברשימת המלאי את המוצר המדובר
    //ומעדכנת את המלאי הקיים בחנות אחרי ההמנה הנוכחית
    //בודקת האם הכמות הנוכחית היא מתחת למינימום
    //במידה וכן שולחת לפונקציה שבודקת מיהו הספק שמספק את המוצר במחיר הזול ביותר
    //ומבצעת המנה של המוצר מספק זה
    async updateStock(productId, quantity) {
        const result = await productStockModel.findOne({ productID: productId })
        if (!result) {
            throw new Error('Not found any product')
        }
        result.current_quantity = Math.max(0, result.current_quantity - quantity)
        await result.save()
        let response = { success: true, message: 'הקניה בוצעה בהצלחה' }
        if (result.current_quantity < result.minimum_quantity) {
            const cheapest = await ProductService.FindTheCheapestSupplierForProduct(productId)
            const addOrderRes = await OrdersService.addNewOrder(cheapest.supplierID, 
                [{ productID: productId, quantity: result.minimum_quantity + 30 }], 
                status.PENDING)    
            response = {
                success: addOrderRes.success,
                message: `הקניה בוצעה בהצלחה,\n כמות אחד המוצרים ירדה מתחת למינימום, נוספה הזמנה לספק מספר ${cheapest.supplierID}. ${addOrderRes.message}`
            }
        }
        return response
    }
}

let productStockService = new ProductStockService();
module.exports = productStockService;