import User from "../model/user.model.js";
import jwt from "jsonwebtoken";


export const checkAuth = async(req, res, next) => {

    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: 'JWT secret is not configured' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error('Error in authentication middleware:', error);
        return res.status(401).json({ message: 'Authentication failed' });
    }
}