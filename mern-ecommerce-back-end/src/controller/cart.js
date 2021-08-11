const Cart = require("../model/cart");

exports.addToCart = (req, res) => {

    const runUpdate = (condition, updatedata) => {
        return new Promise((resolve, reject) => {

            // update cart

            Cart.findOneAndUpdate(condition, updatedata, { new: true })
                .then(result => resolve())
                .catch(err => reject(err))
        });
    }

    Cart.findOne({ user: req.user._id })
        .exec((error, cart) => {
            if (error) return res.status(400).json({ error });
            if (cart) {

                let promiseArray = [];

                req.body.cartItems.forEach((cartItem) => {
                    const product = req.body.cartItems.product;
                    const item = cart.cartItems.find(c => c.product == product);
                    let condition, update;

                    if (item) {
                        //res.status(200).json({ message: "in if item...."}) 
                        // If product to buy is already exist in cart then just update its quantity.....
                        condition = { "user": req.user._id, "cartItems.product": product };
                        update = {
                            "$set": {
                                "cartItems.$": {
                                    ...req.body.cartItems,
                                    quantity: item.quantity + req.body.cartItems.quantity,
                                    // price: item.quantity * item.price  
                                }
                            }
                        };
                    }
                    else {
                        // If product to buy is not in cart then create its new entry in cart....
                        condition = { user: req.user._id };
                        update = {
                            "$push": {
                                "cartItems": req.body.cartItems
                            }
                        };
                        // Cart.findOneAndUpdate(condition, update, { new: true })
                        //     .exec((error, _cart) => {
                        //         if (error) return res.status(400).json({ error });
                        //         if (_cart) {
                        //             res.status(200).json({ cart: _cart });
                        //         }
                        //     });
                    }
                    promiseArray.push(runUpdate(condition, update));
                });
                Promise.all(promiseArray)
                    .then(response => res.status(200).json({ response }))
                    .catch(error => res.status().json({ error }))
            }
            else {
                // If cart does not exits then create new cart....
                const cart = new Cart({
                    user: req.user._id,
                    cartItems: req.body.cartItems
                });

                cart.save((error, cart) => {
                    if (error) return res.status(400).json({ error });
                    if (cart) {
                        res.status(200).json({ cart });
                    }
                });
            }
        });
}

exports.getCartItems = (req, res) => {
    Cart.findOne({ user: req.user._id })
        .populate('cartItems.product', '_id name price productImage')
        .exec((error, cart) => {
            if (error) return res.status(400).json({ error })
            if (cart) {
                let cartItems = {};
                cart.cartItems.forEach((item, index) => {
                    cartItems[item.product._id.toString()] = {
                        _id: item.product._id.toString(),
                        name: item.product.name,
                        img: item.product.productImage[0].img,
                        price: item.product.price,
                        qty: item.quantity
                    }
                })
                res.status(200).json({ cartItems });
            }
        })
}