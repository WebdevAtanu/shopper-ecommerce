import express from 'express';
import cookieParser from 'cookie-parser';
import {config} from 'dotenv';
import cors from 'cors';
import userRouter from './routes/user.route.js';

config({
	path:'./config.env'
})

const app=express();
app.use(cors({
	origin:[process.env.FRONTEND_URL],
	credentials:true
}))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/user',userRouter);
export default app;