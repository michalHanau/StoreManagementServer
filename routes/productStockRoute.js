const express = require('express');
const router = express.Router();
const Controller = require('../controllers/ProductStockController')

router.post('/', async (req, res) => {
  try {
    const purchaseData = req.body;
    let response = { success: true, message: 'הקניה בוצעה בהצלחה' }

    for (let productId in purchaseData) {
      const quantity = purchaseData[productId];
      const result = await Controller.updateStock(productId, quantity)
      if (result.message.includes('נוספה הזמנה לספק')) {
        response = result 
      }
    }
    res.json(response)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'There was an error processing the purchase.' })
  }
});

module.exports = router;