import express from 'express';
import {insertProduct,allProduct,updateProduct,deleteProduct} from '../controllers/product.controller.js';

const product_route = express.Router();
product_route.post('/insert', insertProduct);
product_route.get('/products', allProduct);
product_route.post('/update', updateProduct);
product_route.post('/delete', deleteProduct);

export default product_route;
