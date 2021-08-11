const  Mongoose  = require("mongoose");

const categoryschema = new Mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    slug:{
        type: String,
        required: true,
        unique: true
    },
    categoryImage:{
        type: String
    },
    parentId:{
        type: String
    },
    type:{
        type: String
    }
}, { timestamps: true});

module.exports = Mongoose.model('Category', categoryschema);