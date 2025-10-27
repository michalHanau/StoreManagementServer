const Controller = require('./Controller');
const Service = require('../services/ProductService');

class ProductController extends Controller {
    constructor() {
        super(Service)
    }

    async getAllProductName() {
        const data = await this.service.getAllProductName()
        const product = data.map(p => ({
            id: p.ID,
            name: p.productName
        }));
        return product;
    }
    
    async getProductsBySupplier(supplierID){
        const data = await this.service.getProductsBySupplier(supplierID)
        return data
    }

    async insertNewSupplierToProducts(productList, supplierID) {
        return await this.service.insertNewSupplierToProducts(productList, supplierID)
    }
}

let productController = new ProductController();
module.exports = productController;