const express = require('express');
const { adminMiddleware, requiresigin } = require('../common-middleware/common-middleware');
const { initialData } = require('../controller/initialData');
const router = express.Router();


router.post('/initialData', requiresigin , adminMiddleware, initialData); 


//router.post('/profile', requiresigin, (req, res) =>{
//    res.status(200).json({ user: 'profile'});
//});

module.exports = router;