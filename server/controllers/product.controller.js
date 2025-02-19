import {product} from '../models/product.model.js';

// ====================================product insertion================================================
export const insertProduct = async(req, res) => {
    try {
        const {
            id,
            title,
            description,
            category,
            price,
            discount,
            stock,
            tag,
            brand,
            image
        } = req.body;
        const existing_product = await product.findOne({
            id
        });
        if (existing_product) {
            return res.status(400).json({
                message: 'product already exist'
            })
        }
        await product.create({
            id,
            title,
            description,
            category,
            price,
            discount,
            stock,
            tag,
            brand,
            image
        })
        res.status(200).json({
            message: 'product inserted'
        })
    } catch (error) {
        res.status(500).json({
            message: 'server error'
        })
    }
}

// ====================================all product details================================================
export const allProduct = async(req, res) => {
    const product_data = await product.find();
    res.status(200).json({
        message: true,
        data: product_data
    });
}

// ====================================product update================================================
export const updateProduct = async(req, res) => {
    try {
        const {
            id,
            title,
            description,
            category,
            price,
            discount,
            stock,
            tag,
            brand
        } = req.body;

        await product.updateOne({id:id},
            {
            title:title,
            description:description,
            category:category,
            price:price,
            discount:discount,
            stock:stock,
            tag:tag,
            brand:brand
        })
        res.status(200).json({
            message: 'product updated'
        })
    } catch (error) {
        res.status(500).json({
            message: 'server error'
        })
    }
}


// ====================================delete product================================================
export const deleteProduct = async(req, res) => {
    const {_id}=req.body;
    await product.deleteOne({_id});
    res.status(200).json({
        message: 'product deleted'
    });
}