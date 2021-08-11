const express = require('express');
const { requiresigin, userMiddleware } = require('../common-middleware/common-middleware');
const { addAddress, getAddress } = require('../controller/address');
const router = express.Router();

router.post('/user/address/create', requiresigin, userMiddleware, addAddress);
router.post('/user/getAddress', requiresigin, userMiddleware, getAddress);

module.exports = router;