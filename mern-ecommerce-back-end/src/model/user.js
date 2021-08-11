const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userschema = mongoose.Schema({
    firstname:{
        type: String,
        required: true,
        min: 3,
        max: 20,
        trim: true
    },
    lastname:{
        type: String,
        required: true,
        min: 3,
        max: 20,
        trim: true
    },
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        min: 3,
        max: 15
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    hash_password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ['user','admin'],
        default: 'user'
    },
    contactnumber:{
        type: String
    },
    profilepicture: { type: String }
}, { timestamps: true});

// userschema.virtual('password')
//     .set(function(password){
//         this.hash_password = bcrypt.hashSync(password, 10);
// });

userschema.virtual('fullname')
.get(function(){
    return `${this.firstname} ${this.lastname}`;
});

userschema.methods = {
    authenticate: async function(password){
        return await bcrypt.compare(password, this.hash_password);
    }
}

module.exports = mongoose.model('User', userschema);