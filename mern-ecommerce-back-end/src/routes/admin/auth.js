const express = require('express');
const { requiresigin } = require('../../common-middleware/common-middleware');
const { signup, signin, signout } = require('../../controller/admin/auth');
const { validateSignupRequest, isvalidateRequest, validateSigninRequest } = require('../../validator/validator');
const router = express.Router();


router.post('/admin/signup', validateSignupRequest, isvalidateRequest, signup); 
router.post('/admin/signin', validateSigninRequest, isvalidateRequest, signin);
router.post('/admin/signout', signout);

//router.post('/profile', requiresigin, (req, res) =>{
//    res.status(200).json({ user: 'profile'});
//});

module.exports = router;