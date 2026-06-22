import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from "../models/userModel.js";

const SignUpUser = async (req,res) => {
    try {
        const {name, username, email, password} = req.body;
        if(!name || !username || !email || !password){
            return res.status(400).json({message : "Please enter all details"})
        }

        const existingEmail = await UserModel.findOne({email})
        if(existingEmail){
            return res.status(409).json({message : "User with this email already exist"})
        }

        const existingUsername = await UserModel.findOne({username})
        if(existingUsername){
            return res.status(409).json({message : "Username already exist! Choose another one"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const User = new UserModel({
            name,
            username,
            email,
            password : hashedPassword
        })

        await User.save();
        
        const token = jwt.sign({userId : User._id,
            username : User.username,
            email : User.email
        }, process.env.JWT_SECRET, {expiresIn : "7d"})

        return res.status(201).json({message : "Account Created Successfully", token})

    } catch (error) {
        return res.status(500).json({message : "Server Error", error : error.message})
    }
}

const loginUser = async (req,res) =>{
    try {
        const {email, username, password} = req.body;
        if( !email || !username || !password ){
            return res.status(404).json({message:"Please enter all details"});
        }

        const user = await UserModel.findOne({username})
        if(!user){
            return res.status(404).json({message:"No such user exist"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch){
            return res.status(401).json({message : "Password is incorrect"});
        }

        const token = jwt.sign({
            userId : user._id,
            username : user.username,
            email : user.email
        },process.env.JWT_SECRET,{expiresIn : "7d"});

        // if(user.password !== password){
        //     return res.status(401).json({message : "Password is incorrect"});
        // }
        return res.status(200).json({message:"Login Successful",token});

    } catch (error) {
        return res.status(500).json({message : "Server Error", error : error.message})
    }
}

const getProfile = async (req,res)=>{
    try {
        const user = await UserModel.findById(req.user.userId).select("-password");
        if(!user){
            return res.status(404).json({message: "User not found"})
        }
        return res.status(200).json({success:true, message:"User found",user});
    } catch (error) {
        return res.status(500).json({message : "Server Error", error : error.message})
    }
}

export { SignUpUser, loginUser, getProfile }