import express from 'express';
import cookieParser from 'cookie-parser';
import {config} from 'dotenv';
import cors from 'cors';
import user_route from './routes/user.route.js';
import product_route from './routes/product.route.js';
import admin_route from './routes/admin.route.js';

config({
	path:'./config.env'
})

const app=express();
app.use(cors({
	origin:[process.env.FRONTEND_URL,process.env.LOCAL_HOST],
	methods:['GET','POST','PUT','DELETE'],
	credentials:true
}))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/user',user_route);
app.use('/api/product',product_route);
app.use('/api/admin',admin_route)
export default app;