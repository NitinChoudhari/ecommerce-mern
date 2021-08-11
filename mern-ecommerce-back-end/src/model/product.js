const  Mongoose  = require("mongoose");

const productSchema = new Mongoose.Schema({
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
    price:{
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    offer:{
        type: Number
    },
    productImage:[
        {
            img:{type: String}
        }
    ],
    reviews:[
        {
            userId: { type: Mongoose.Schema.Types.ObjectId, ref:'User' },
            type: String
        }
    ],
    category:{ type: Mongoose.Schema.Types.ObjectId, ref:'Category', required: true},
    createdBy:{ type: Mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    updatedAt:{ type: Date}

}, { timestamps: true});

module.exports = Mongoose.model('Product', productSchema);