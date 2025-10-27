const productModel = require('../models/productModel');
require('dotenv').config();

class ProductService {

    async getAllProductName() {
        let result = await productModel.find({}, { _id: 0, ID: 1, productName: 1 })
        if (result.length == 0) {
            throw new Error('Not found any product')
        }
        return result;
    }

    async getProductsBySupplier(supplierID){
        let result = await productModel.find({suppliers: { $elemMatch: { supplierID: supplierID }}})
        if (result.length == 0) {
            throw new Error('Not found any product')
        }
        return result;
    }

    async insertNewSupplierToProducts(productList, supplierID) {
        productList.forEach(async element => {
        try {
            const product = await productModel.findOne({ ID: element.ID })
            if (!product) {
                throw new Error('Product not found');
            }
            product.suppliers.push({
                supplierID: supplierID,
                price: element.suppliers[0].price,
                minQuantity: element.suppliers[0].minQuantity
            });
            await product.save()
        } catch (error) {
            console.error('Error adding supplier:', error);
        }
      });
    }
       
    //הפונקציה בודקת מיהו הספק שמספק מוצר במחיר הזול ביותר
    async FindTheCheapestSupplierForProduct(productId) {
    const result = await productModel.findOne({ ID: productId });
    if (!result) {
        throw new Error('Not found any product');
    }
    const cheapestSupplier = result.suppliers.reduce((cheapest, supplier) => {
        if (!cheapest || supplier.price < cheapest.price) {
            return supplier
        }
        return cheapest
    }, null)
    return cheapestSupplier
    }

}

let productService = new ProductService();
module.exports = productService;