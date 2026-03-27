
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';


export const register = async(req, res) => {
     try {
        const {  fullName, email, password } = req.body;
        

        // Validate input
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            fullName,
            email,
            passWord: hashedPassword
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
     } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Server error' });
     }
}

export const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.passWord);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: 'JWT secret is not configured' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

       res.setCookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite:"none",
        maxAge: 3600000
       });

       return res.json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}