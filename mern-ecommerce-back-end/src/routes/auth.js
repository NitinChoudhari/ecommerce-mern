const express = require('express');
const { signup, signin } = require('../controller/auth');
const { validateSignupRequest, isvalidateRequest, validateSigninRequest } = require('../validator/validator');
const router = express.Router();


router.post('/signup', validateSignupRequest, isvalidateRequest, signup); 
router.post('/signin', validateSigninRequest, isvalidateRequest, signin);

//router.post('/profile', requiresigin, (req, res) =>{
//    res.status(200).json({ user: 'profile'});
//});

module.exports = router;