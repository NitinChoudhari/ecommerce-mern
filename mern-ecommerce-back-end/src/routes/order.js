const express = require('express');
const { requiresigin, userMiddleware } = require('../common-middleware/common-middleware');
const { createOrder, getOrder } = require('../controller/order');
const router = express.Router();

router.post('/addOrder', requiresigin, userMiddleware, createOrder);
router.get('/getOrder', requiresigin, userMiddleware, getOrder);
module.exports = router;