const Mongoose = require("mongoose");

const cartSchema = new Mongoose.Schema({

    user: { type: Mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cartItems: [
        {
            product: { type: Mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, default: 1 },
            // price: { type: Number }
        }
    ]
}, { timestamps: true });

module.exports = Mongoose.model('Cart', cartSchema);