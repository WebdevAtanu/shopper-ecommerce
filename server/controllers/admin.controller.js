import {admin} from '../models/admin.model.js';
import {adminCookie} from '../utils/cookies.js'


// ====================================admin login================================================
export const adminLogin= async (req,res)=>{
	try{
		const {email,password}=req.body;
		const findAdmin= await admin.findOne({email});
		if(!findAdmin){
			return res.status(400).json({
				message:'invalid credential'
			})
		}
		adminCookie(process.env.JWT_SECRET,findAdmin,res,`admin ${findAdmin.name} logged in`);

	}
	catch(error){
		res.send(500).json({
			message:'server problem'
		})
	}
}

// ====================================admin logout================================================
export const adminDetails=(req,res)=>{
	res.status(201).json({
        name: req.admin_details.name,
        email: req.admin_details.email,
    })
}

// ====================================admin logout================================================
export const adminLogout = (req, res) => {
    res.status(200)
        .cookie("admin_token", "", {
            expires: new Date(Date.now())
        })
        .json({
            message: 'admin log out'
        })
}