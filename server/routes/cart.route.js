import express from 'express';
import {cartAdd,cartGet,cartRemove} from '../controllers/cart.controller.js';
import {userAuth} from '../middleware/auth.js'

const cart_route=express.Router();

cart_route.post('/add',userAuth,cartAdd);
cart_route.get('/mycart',userAuth,cartGet);
cart_route.post('/remove',cartRemove);

export default cart_route;