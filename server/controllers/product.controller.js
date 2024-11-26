import {product} from '../models/product.model.js';

// ====================================product insertion================================================

export const insertProduct=async(req,res)=>{
	try {
		const {id,title,description,category,price,discount,stock,tag,brand,image}=req.body;
		const existingProduct=await product.findOne({id});
		if(existingProduct){
			return res.status(400).json({
				message:'product already exists'
			})
		}
		await product.create({
			id,title,description,category,price,discount,stock,tag,brand,image
		})
		res.status(200).json({
			message:'product inserted'
		})
	} catch(error) {
		res.status(500).json({
			message:'server error',
			error:error.message
		})
	}
}

// ====================================all product================================================

export const allProduct=async(req,res)=>{
	const productData=await product.find();
	res.status(200).json({
		message:true,
		data:productData
	});
}