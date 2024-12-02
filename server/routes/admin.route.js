import express from 'express';
import {adminLogin,adminDetails,adminLogout} from '../controllers/admin.controller.js';
import {adminAuth} from '../middleware/auth.js'

const admin_route = express.Router();
admin_route.post('/login', adminLogin);
admin_route.get('/details', adminAuth, adminDetails);
admin_route.post('/logout', adminLogout);

export default admin_route