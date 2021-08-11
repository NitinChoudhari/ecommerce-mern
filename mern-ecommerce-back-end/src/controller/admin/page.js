const Page = require("../../model/page");

exports.createPage = (req, res) => {
    const { products, banners } = req.files;
    if (banners.length > 0) {
        req.body.banners = banners.map((banner, index) => ({
            img: `${process.env.API_URL}/public/${banner.filename}`,
            navigateTo: `/bannerClicked?categoryId=${req.body.category}/type=${req.body.type}`
        }))
    }
    if (products.length > 0) {
        req.body.products = products.map((product, index) => ({
            img: `${process.env.API_URL}/public/${product.filename}`,
            navigateTo: `/productClicked?categoryId=${req.body.category}/type=${req.body.type}`
        }))
    }

    req.body.createdBy = req.user._id;

    Page.findOne({ category: req.body.category })
        .exec((error, page) => {
            if (error) return res.status(400).json({ error });
            if (page) {
                Page.findOneAndUpdate({ category: req.body.category }, req.body)
                    .exec((error, updatedpage) => {
                        if (error) return res.status(400).json({ error });
                        if (updatedpage) {
                            return res.status(200).json({ updatedPage: updatedpage });
                        }
                    })
            }
            else {
                const page = new Page(req.body);

                page.save((error, save) => {
                    if (error) return res.status(400).json({ error });
                    if (page) {
                        return res.status(200).json({ page });
                    }
                });
            }
        });
}

exports.getPage = (req, res) => {
    const { category, type } = req.params;
    if (type == 'page') {
        Page.findOne({ category: category })
            .exec((error, page) => {
                if (error) return res.status(400).json({ error });
                if (page) {
                    return res.status(200).json({ page });
                }
            });
    }
}