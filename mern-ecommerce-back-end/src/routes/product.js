const { Router } = require('express');
const express = require('express');
const multer  = require('multer');
const shortid = require('shortid');
const { adminMiddleware, requiresigin } = require('../common-middleware/common-middleware');
const { createProduct, getProductBySlug, getProductDetailsById } = require('../controller/product');
const path = require('path');
//const { getCategories } = require('../controller/category');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })
   
const upload = multer({ storage });

router.post('/product/create', requiresigin, adminMiddleware, upload.array('productImage') , createProduct);
router.get('/products/:slug', getProductBySlug);
//router.get('/category/getcategory', getCategories);
router.get('/product/:productId', getProductDetailsById);



module.exports = router;