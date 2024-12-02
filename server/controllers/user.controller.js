import {user} from '../models/user.model.js';
import bcrypt from 'bcrypt';
import {userCookie} from '../utils/cookies.js';
import mailSender from '../services/mail.service.js';

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
        const existing_user = await user.findOne({
            email
        });
        if (existing_user) {
            return res.status(400).json({
                message: 'user already exist'
            })
        } else {
            otp = await mailSender(email);
            res.status(200).json({
                message: 'otp sent to email'
            })
        }

    } catch (error) {
        res.status(500).json({
            message: 'server error'
        })
    }
}

// ====================================user verify================================================
export const userVerify = async(req, res) => {
    try {
        const {
            name,
            address,
            phone,
            email,
            password,
            valid_otp
        } = req.body;
        if (otp != valid_otp) {
            return res.status(400).json({
                message: 'invalid otp'
            })
        }
        const password_hash = await bcrypt.hash(password, 5);
        let userinfo = await user.create({
            name,
            address,
            phone,
            email,
            password: password_hash
        });
        userCookie(process.env.JWT_SECRET, userinfo, res, `user ${userinfo.name} logged in`);
    } catch (error) {
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
        const find_user = await user.findOne({
            email
        });
        if (!find_user) {
            return res.status(400).json({
                message: 'invalid credential'
            })
        }
        const user_password = await bcrypt.compare(password, find_user.password);
        if (!user_password) {
            return res.status(400).json({
                message: 'invalid credential'
            })
        }
        userCookie(process.env.JWT_SECRET, find_user, res, `user ${find_user.name} logged in`);
    } catch (error) {
        res.send(500).json({
            message: 'server error'
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