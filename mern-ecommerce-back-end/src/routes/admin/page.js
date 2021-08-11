const express = require('express');
const { upload, requiresigin, adminMiddleware } = require('../../common-middleware/common-middleware');
const { createPage, getPage } = require('../../controller/admin/page');
const router = express.Router();


router.post('/page/create', requiresigin, adminMiddleware ,upload.fields([
    { name: 'banners' },
    { name: 'products' }
]) ,createPage);

router.get('/page/:category/:type', getPage);

module.exports = router;