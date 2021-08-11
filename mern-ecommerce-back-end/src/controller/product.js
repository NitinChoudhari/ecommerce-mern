const shortid = require('shortid');
const slugify = require('slugify');
const Product = require('../model/product');
const Category = require('../model/category/category-model');

exports.createProduct = ((req, res) => {
    // res.status(200).json({ file: req.files, body: req.body});

    const { name, slug, price, description, quantity, category, createdBy
    } = req.body

    let productImage = [];
    if (req.files.length > 0) {
        productImage = req.files.map(file => {
            return { img: file.filename }
        })
    }

    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        description,
        quantity,
        category,
        productImage,
        createdBy: req.user._id
    });

    product.save((error, product) => {
        if (error) return res.status(400).json({ error });
        if (product) {
            return res.status(200).json({ product });
        }
    });
});

exports.getProductBySlug = (req, res) => {
    const { slug } = req.params;
    Category.findOne({ slug: slug })
        .select('_id type')
        .exec((error, category) => {
            if (error) {
                res.status(400).json({ error });
            }
            // res.status(200).json({ category})
            if (category) {
                Product.find({ category: category._id })
                    .exec((error, products) => {
                        if (error) return res.status(400).json({ error });
                     if(category.type){
                        if (products.length > 0) {
                            res.status(200).json({
                                products,
                                productsByPrice: {
                                    under5K: products.filter(product => product.price <= 5000),
                                    under10K: products.filter(product => product.price > 5000 && product.price <= 10000),
                                    under15K: products.filter(product => product.price > 10000 && product.price <= 15000),
                                    under20K: products.filter(product => product.price > 15000 && product.price <= 20000),
                                    under25K: products.filter(product => product.price > 20000 && product.price <= 25000),
                                    under30K: products.filter(product => product.price > 25000 && product.price <= 30000)
                                }
                            });
                        }
                     }
                     else {
                        res.status(200).json({ products });
                      }
                    })
            }
        })
}

exports.getProductDetailsById = (req, res) => {
    const { productId } = req.params;
    if (productId) {
        Product.findOne({ _id: productId })
            .exec((error, product) => {
                if(error)  res.status(400).json({ error });
                if(product){
                    res.status(200).json({ product });
                }
            });
    } else {
        return res.status(400).json({ error: "Params required" });
    }
};