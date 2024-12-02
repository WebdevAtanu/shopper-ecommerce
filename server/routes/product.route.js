import express from 'express';
import {insertProduct,allProduct} from '../controllers/product.controller.js';

const product_route = express.Router();
product_route.post('/insert', insertProduct);
product_route.get('/products', allProduct);

export default product_route;
