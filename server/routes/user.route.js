import express from 'express';
import {userRegister,userLogin,userDetails,userLogout} from '../controllers/user.controller.js';
import {userAuth} from '../middleware/userAuth.js'


const userRouter=express.Router();
userRouter.post('/register',userRegister);
userRouter.post('/login',userLogin);
userRouter.get('/details',userAuth,userDetails);
userRouter.get('/logout',userLogout);

export default userRouter;