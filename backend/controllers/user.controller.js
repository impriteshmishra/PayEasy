import { User } from "../models/User.Model.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';


// registering user
export const register = async (req, res) => {
    try {
        const { username, email, password, firstName, lastName, dateOfBirth, gender } = req.body;
        if (!username || !email || !password || !firstName || !lastName || !dateOfBirth || !gender) {
            return res.status(401).json({
                message: "Something is missing!",
                success: false,
            });
        }
        // handling case of unique username
        const checkUsername = await User.findOne({username});
        if(checkUsername){
            return res.status(401).json({
                message:"Username is already exist.",
                success:false,
            })
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "User exist.",
                success: false,
            });
        };
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is saltRounds
        const dbUser = await User.create({
            username,
            email,
            password: hashedPassword,
            firstName,
            lastName,
            dateOfBirth,
            gender
        });

        const token = jwt.sign({
            userId: dbUser._id
        }, process.env.SECRET_KEY, {expiresIn: '1d'});

        return res.status(201).json({
            message: "Account created successfully.",
            token: token,
            success: true,
        })
    } catch (error) {
        console.log(error);
    }
}

//login user

export const login = async (req,res)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(401).json({
                message: "Something is missing!",
                success: false,
            })
        }
        let user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                message:"Incorrect email or password.",
                success:false
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(401).json({
                message:"Incorrect email or password.",
                success:false
            })
        }
        const token = jwt.sign({
            userId: user._id
        }, process.env.SECRET_KEY, {expiresIn: '1d'});

        user = {
            _id:user._id,
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
            dateOfBirth:user.dateOfBirth,
            gender:user.gender
        }

        return res.cookie('token', token, {httpOnly: true, sameSite: 'strict', maxAge: 1*24*60*60*1000}).json({
            message:`Welcome back ${user.firstName} ${user.lastName}`,
            success:true,
            user
        })


    } catch (error) {
        res.status(500).json(error.message)
    }
}

//logout user

export const logout = async (_, res)=>{
    try {
        return res.cookie("token", "", {maxAge:0}).json({
            message:"Logged out successfully.",
            success:true
        })
    } catch (error) {
        res.status(500).json(error.message);
    }
}


//