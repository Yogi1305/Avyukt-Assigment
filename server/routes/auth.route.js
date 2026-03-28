import express from 'express';
import { login, logout, register } from '../controller/auth.controller.js';
import { checkAuth } from '../middleware/checkauth.middleware.js';

const router = express.Router();



router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/checkauth').get(checkAuth,(req,res)=>{
    res.status(200).json({ message: "Authenticated", success: true });
});

export default router;