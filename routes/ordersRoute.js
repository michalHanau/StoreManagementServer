const express = require('express');
const router = express.Router();
const controller = require('../controllers/OrdersController')

router.get('/', async (req, res, next) => {
    try {
        const result = await controller.getAll(req.query)
        res.json(result)
    }
    catch (error) {
        if (error.message.startsWith('Not found'))
            res.status(404).send(`Not found`)
        next(error)
    }
})

router.get('/id/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await controller.getOrdersBySupplierId(id)
        res.json(result);
    }
    catch (error) {
        if (error.message.startsWith('Not found'))
            res.json.send(`Not found`)
        next(error)
    }
})

router.post('/status', async (req, res, next) => {
    const { orderId } = req.body
    try {
        const result = await controller.updateOrderStatus(orderId);
        res.json(result)
    } catch (error) {
        return res.status(409).send('Error occurred while updating status')
    }
})

router.post('/add', async (req, res, next) => {
    const newOrder = req.body
    try {
        const result = await controller.addNewOrder(newOrder);
        res.json(result)
    } catch (error) {
        return res.status(409).send('Error occurred while updating status')
    }
})

module.exports = router;