import {user} from '../models/user.model.js';
import bcrypt from 'bcrypt';
import {userCookie} from '../utils/cookies.js';
import mailSender from '../services/mailer.js';

// ====================================user register================================================


var otp;

export const userRegister = async(req, res) => {
    try {
        const {
            name,
            address,
            phone,
            email,
            password
        } = req.body;
        const existingUser = await user.findOne({
            email
        });
        if (existingUser) {
            return res.status(400).json({
                message: 'user already exist'
            })
        }
        else{
        otp = await mailSender(email);
        res.status(200).json({
            message: 'otp sent to email'
        })
        }
        
    } catch (error) {
        res.status(500).json({
            message: 'server error',
            error: error.message
        })
    }
}

export const userVerify=async (req,res)=>{
    try{
        const {
            name,
            address,
            phone,
            email,
            password,
            valid_otp
        } = req.body;
        if(otp!=valid_otp){
            return res.status(400).json({
            message: 'invalid otp'
        })
        }
        const hashedPassword = await bcrypt.hash(password, 5);
        let userinfo= await user.create({
            name,
            address,
            phone,
            email,
            password: hashedPassword
        });
        userCookie(process.env.JWT_SECRET, userinfo, res, `user ${userinfo.name} logged in`);
    }
    catch(error){
        res.status(500).json({
            message: 'server error',
            error: error.message
        })
    }
}

// ====================================user login================================================

export const userLogin = async(req, res) => {
    try {
        const {
            email,
            password
        } = req.body;
        const finduser = await user.findOne({
            email
        });
        if (!finduser) {
            return res.status(400).json({
                message: 'invalid credential'
            })
        }
        const userpassword = await bcrypt.compare(password, finduser.password);
        if (!userpassword) {
            return res.status(400).json({
                message: 'invalid credential'
            })
        }
        userCookie(process.env.JWT_SECRET, finduser, res, `user ${finduser.name} logged in`);
    } catch (error) {
        res.send(500).json({
            message: 'server problem'
        })
    }

}

// ====================================user details================================================

export const userDetails = (req, res) => {
    res.status(201).json({
        name: req.user_details.name,
        address: req.user_details.address,
        phone: req.user_details.phone,
        email: req.user_details.email,
    })
}

// ====================================user logout================================================

export const userLogout = (req, res) => {
    res.status(200)
        .cookie("user_token", "", {
            expires: new Date(Date.now())
        })
        .json({
            message: 'user log out'
        })
}