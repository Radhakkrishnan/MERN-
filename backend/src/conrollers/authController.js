const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")



const register = async(req,res) => {
    
    try{
        const{username,password,email} = req.body
        const hashedpassword = await bcrypt.hash(password,10)

        const newUser = new User({username, password:hashedpassword, role:"faculty",email})
        await newUser.save()
        res.status(200).json({message:`User created with username ${username}`, email: email})
    }catch(err){
        
        res.status(404).json({message:"something went wrong", error: err.message})
    }
    
}

const login = async(req,res) => {
    
    try{
        const {email, password} = req.body
        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(401).json({message:"Invalid credentials"})
        }
        const token = jwt.sign({id:user._id, role:user.role},process.env.SECRET_KEY,{expiresIn:"1h"})

        const studentId = user.role === "student" ? user.studentId : null;

        res.status(200).json({token , role:user.role,id: user._id , studentId}) 

    }catch(err){
        res.status(401).json({message:"Login failed!!"})
    }
}

module.exports = {register,login}