const express = require('express');
const router = express.Router();
const controller = require('../controllers/LoginController')
const productController = require('../controllers/ProductController')

router.post('/register', async (req, res, next) => {
    const { data, productList } = req.body
    console.log("data", data);
    try {
        const result = await controller.registerSupplier(data)
        await productController.insertNewSupplierToProducts(productList,result.user.ID)
        res.status(201).json(result) 
    } catch (error) {
        if (error.message === 'המשתמש קיים במערכת') {
            return res.status(409).send('User already exists')
        }
        next(error)
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const result = await controller.loginSupplier(req.body)
        res.json(result)
    } catch (error) {
        if (error.message === 'המשתמש קיים במערכת') {
            return res.status(401).send('User not exists')
        }
        next(error);
    }
});


module.exports = router;

