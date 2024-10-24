import {user} from '../models/user.model.js';
import bcrypt from 'bcrypt';
import {cookieSetter} from '../utils/cookies.js';

// ====================================user register================================================

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

        const hashedPassword = await bcrypt.hash(password, 5);
        await user.create({
            name,
            address,
            phone,
            email,
            password: hashedPassword
        });
        res.status(200).json({
            message: 'user registered'
        })
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
        cookieSetter(process.env.JWT_SECRET, finduser, res, `user ${finduser.name} logged in`);
    } catch (error) {
        res.send(500).json({
            message: 'server problem'
        })
    }

}

// ====================================user details================================================

export const userDetails = (req, res) => {
    res.status(201).json({
        name: req.userdetail.name,
        address: req.userdetail.address,
        phone: req.userdetail.phone,
        email: req.userdetail.email,
    })
}

// ====================================user logout================================================

export const userLogout = (req, res) => {
    res.status(200)
        .cookie("token", "", {
            expires: new Date(Date.now())
        })
        .json({
            message: 'User log out'
        })
}