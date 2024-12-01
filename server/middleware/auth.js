import {user} from '../models/user.model.js';
import {admin} from '../models/admin.model.js';
import jwt from 'jsonwebtoken';
export const userAuth=async (req,res,next)=>{
	try{
		const {user_token}=req.cookies;
		if(!user_token){
			res.status(401).json({
				message:'user not logged in'
			})
		}
		else{
			const decode=jwt.verify(user_token,process.env.JWT_SECRET);
			req.user_details= await user.findById(decode.id);
			next();
		}
	}
	catch(error){
		res.status(500).json({
			message:'server error'
		})
	}
}

export const adminAuth=async (req,res,next)=>{
	try{
		const {admin_token}=req.cookies;
		if(!admin_token){
			res.status(401).json({
				message:'admin not logged in'
			})
		}
		else{
			const decode=jwt.verify(admin_token,process.env.JWT_SECRET);
			req.admin_details= await admin.findById(decode.id);
			next();
		}
	}
	catch(error){
		res.status(500).json({
			message:'server error'
		})
	}
}