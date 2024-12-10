import {cart} from '../models/cart.model.js';
import {product} from '../models/product.model.js';

// ====================================add to cart================================================
export const cartAdd = async(req, res) => {
    const {
        data
    } = req.body;
    await cart.create({
        product: data,
        user: req.user_details
    });
    res.status(201).json({
        message: 'Cart added'
    })
}

// ====================================cart details================================================
export const cartGet = async(req, res) => {
    try {
        const {
            _id
        } = req.user_details;
        const find_cart = await cart.find({
            user: _id
        });
        if (!find_cart || find_cart.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'no cart found',
            });
        }
        
//         const find_cart_product=await Promise.all(
//             find_cart.map(async(item) => {
//                 const exist_cart = await item.find({product:item.product});
//                 return exist_cart;
//             })
//         );
// 
//         if (find_cart_product) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'cart already exists',
//             });
//         }
        
        const products = await Promise.all(
            find_cart.map(async(item) => {
                const productData = await product.findById(item.product);
                return productData;
            })
        );
        return res.status(200).json({
            success: true,
            cart: products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

// ====================================cart remove================================================
export const cartRemove = async(req, res) => {

}
