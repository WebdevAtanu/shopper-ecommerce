import jwt from 'jsonwebtoken';

export const userCookie=(jwt_secret,user,res,message)=>{
	let user_token=jwt.sign({id:user._id},jwt_secret);
	res.status(201)
        .cookie('user_token',user_token,{
            httpOnly:true,
            maxAge:24*60*60*1000,
            sameSite:'none',
            secure:true
        })
        .json({
        	status: true,
            message: message,
        });
}

export const adminCookie=(jwt_secret,admin,res,message)=>{
    let admin_token=jwt.sign({id:admin._id},jwt_secret);
    res.status(201)
    .cookie('admin_token',admin_token,{
        httpOnly:true,
        maxAge:24*60*60*1000,
        sameSite:'none',
        secure:true
    })
    .json({
        status:true,
        message:message,
        admin:{
            admin:admin.name
        }
    })
}