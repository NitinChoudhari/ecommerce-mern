const { Router } = require('express');
const express = require('express');
const { adminMiddleware, requiresigin } = require('../common-middleware/common-middleware');
const { createCategory, getCategories, updateCategories, deleteCategories } = require('../controller/category');
const multer  = require('multer');
const shortid = require('shortid');
const path = require('path');


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

router.post('/category/create', requiresigin, adminMiddleware , upload.single('categoryImage') , createCategory);
router.get('/category/getcategory', getCategories);
router.post('/category/update', upload.array('categoryImage') , updateCategories);
router.post('/category/delete', deleteCategories);


module.exports = router;