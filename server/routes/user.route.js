import express from 'express';
import {userRegister,userVerify,userLogin,userDetails,userLogout} from '../controllers/user.controller.js';
import {userAuth} from '../middleware/auth.js'

const user_route = express.Router();
user_route.post('/register', userRegister);
user_route.post('/register/verify', userVerify);
user_route.post('/login', userLogin);
user_route.get('/details', userAuth, userDetails);
user_route.get('/logout', userLogout);

export default user_route;