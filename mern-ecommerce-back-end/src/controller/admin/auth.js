const User= require('../../model/user');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');
const bcrypt = require('bcrypt');
const shortid = require('shortid');

exports.signup= (req, res) =>{
    User.findOne({ email : req.body.email })
    .exec( async (error, user) => {
        if(user) return res.status(400).json({
            message: "Admin already exist.."
        });
    
        const {
            firstname,
            lastname,
            email,
            password,
            role
        } = req.body;
        const hash_password = await bcrypt.hash( password, 10) ;
        const _user = new User({
            firstname,
            lastname,
            email,
            hash_password,
            username: shortid.generate(),
            role,
        });
    
        _user.save((error, data) => {
            if(error){
                return res.status(400).json({
                    message: 'Something went wrong...'
                });
            }
    
            if(data){
                return res.status(200).json({
                    message: "Admin created successfully..."
                });
            }
        });
    });
}

exports.signin = (req, res) => {
    User.findOne({email : req.body.email})
    .exec((error, user) => {
        if(error) return res.status(400).json({ error});
        if(user){
            if(user.authenticate(req.body.password) && user.role === 'admin'){
                    const token = jwt.sign({ _id: user._id, role: user.role}, process.env.jwt_secret_key, {expiresIn: '7d'});
                    const { _id, firstname, lastname, email, fullname, role } = user ;
                    res.cookie('token', token, {expiresIn: '1h'});
                    res.status(200).json({
                        token,
                        user:{
                            _id,
                            firstname,
                            lastname,
                            fullname,
                            email,
                            role
                        }
                    });
            }
            else{
                return res.status(400).json({
                    message: 'Inavlid username or password.'
                });
            }
        }
    });
}

exports.signout = (req, res) =>{
    res.clearCookie('token');
    res.status(200).json({
        message:'Logout successfully.....'
    });
}