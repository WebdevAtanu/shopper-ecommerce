import express from 'express';
import {insertProduct,allProduct} from '../controllers/product.controller.js';

const productRouter=express.Router();
productRouter.post('/insert',insertProduct);
productRouter.get('/products',allProduct);

export default productRouter;
