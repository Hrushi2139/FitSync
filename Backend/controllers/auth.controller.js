import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt.js';
const passwordRegx = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const signUp = async (req, res) => {
    const { name, email, password,age, gender, weight, height } = req.body;

    try {
        if (!name || !email || !password || !age || !gender || !weight || !height) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }
        if (!passwordRegx.test(password)) {
            return res.status(400).json({
                message: 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character'
            });
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser = new User({ name:name.trim(), email:email.trim(), password:hashedPassword, age, gender, weight, height });
        await newUser.save();
        const token=generateToken(newUser._id,res);
        res.status(201).json({
            _id:newUser._id,
            name:newUser.name,
            email:newUser.email,
            age:newUser.age,
            gender:newUser.gender,
            weight:newUser.weight,
            height:newUser.height,
            token,
        });

        // res.status(201).json({ message: 'User registered successfully', user: newUser });
    } 
    catch (error) {
        console.log("SignUpError:",error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const login = async (req, res) => {
    const {email,password}=req.body;
    try {
        if(!email||!password){
            return res.status(400).json({message:'All fields are required'});
        }
        const existingUser = await User.findOne({ email:email.toLowerCase() });
        if (!existingUser) {
            return res.status(401).json({ message: 'Invalid credentials' });
        } 
        const isPasswordValid=await bcrypt.compare(password,existingUser.password);
        if(!isPasswordValid){
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // console.log("Login Successfull");
        const token =generateToken(existingUser._id,res);
        res.status(200).json({
            _id:existingUser._id,
            name:existingUser.name,
            email:existingUser.email,
            age:existingUser.age,
            gender:existingUser.gender,
            weight:existingUser.weight,
            height:existingUser.height,
            token,
        });

    } catch (error) {
        console.log("LoginError:",error);
        res.status(500).json({ message: 'Server error' });
    }
}
