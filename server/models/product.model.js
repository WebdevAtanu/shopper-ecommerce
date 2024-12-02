import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 10
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    discount: {
        type: Number,
        default: 0,
        max: 100
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    tag: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: 'https://github.com/WebdevAtanu/shopper-ecommerce/blob/main/server/public/noimg.png?raw=true'
    },
}, {
    timestamps: true
})

export const product = mongoose.model('product', productSchema);