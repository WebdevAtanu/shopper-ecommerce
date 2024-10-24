import {user} from '../models/user.model.js';
import jwt from 'jsonwebtoken';
export const userAuth=async (req,res,next)=>{
	try{
		const {token}=req.cookies;
		if(!token){
			res.status(401).json({
				message:'user not logged in'
			})
		}
		else{
			const decode=jwt.verify(token,process.env.JWT_SECRET);
			req.userdetail= await user.findById(decode.id);
			next();
		}
	}
	catch(error){
		res.status(500).json({
			message:'server error'
		})
	}
}