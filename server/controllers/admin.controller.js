import {admin} from '../models/admin.model.js';
import {adminCookie} from '../utils/cookies.js'


// ====================================admin login================================================
export const adminLogin= async (req,res)=>{
	try{
		const {email,password}=req.body;
		const find_admin= await admin.findOne({email});
		if(!find_admin){
			return res.status(400).json({
				message:'invalid credential'
			})
		}
		adminCookie(process.env.JWT_SECRET,find_admin,res,`admin ${find_admin.name} logged in`);
	}
	catch(error){
		res.send(500).json({
			message:'server error'
		})
	}
}

// ====================================admin details================================================
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
            message: 'admin logged out'
        })
}