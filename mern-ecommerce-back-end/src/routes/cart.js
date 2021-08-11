const { Router } = require('express');
const express = require('express');
const { requiresigin, userMiddleware } = require('../common-middleware/common-middleware');
const { addToCart, getCartItems } = require('../controller/cart');

const router = express.Router();

router.post('/user/cart/addtocart', requiresigin, userMiddleware, addToCart);
// router.get('/category/getcategory', getCategories);
router.post('/user/getCartItems', requiresigin, userMiddleware, getCartItems);


module.exports = router;