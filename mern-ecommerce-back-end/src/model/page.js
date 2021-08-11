const Mongoose = require("mongoose");

const pageSchema = new Mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    banners: [
        {
            img: { type: String },
            navigateTo: { type: String }
        }
    ],
    products: [
        {
            img: { type: String },
            navigateTo: { type: String }
        }
    ],
    category: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
        unique: true
    },
    createdBy: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

}, { timestamps: true });

module.exports = Mongoose.model('Page', pageSchema);