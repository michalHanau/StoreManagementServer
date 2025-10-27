const express = require('express');
const router = express.Router();
const controller = require('../controllers/ProductController')

router.get('/names', async (req, res, next) => {
    try {
        const result = await controller.getAllProductName()
        res.json(result)
    }
    catch (error) {
        if (error.message.startsWith('Not found'))
            res.status(404).send(`Not found`)
        next(error);
    }
})

router.get('/products/:id', async (req, res, next) => {
    try {
        const supplierId = req.params.id;
        const result = await controller.getProductsBySupplier(supplierId)
        res.json(result);
    }
    catch (error) {
        if (error.message.startsWith('Not found'))
            res.status(404).send(`Not found`)
        next(error);
    }
})


module.exports = router;