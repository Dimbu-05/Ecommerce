const users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mail = require('../utils/gmail')
require('dotenv').config();

exports.registration = async(req,res)=>{
    try {
        let {username,email,password,role} = req.body;
        if(!username || !password || !email || !role){
            return res.json({msg:"missing fields"})
        }
        //check user already exists are not
        let checkUser = await users.findOne({username:username})
        if(checkUser){
            return res.json({msg:"username already exits"})
        }
        let hashPassword = await bcrypt.hash(password,5);
        await users.create({username,password:hashPassword,email,role});

        // generating JsonwebToken
        // 1-> Payload        2-> Secret key           3-> expiry data
        let payLoad = {username:username,emailadd:email,role:role}
        let token = await jwt.sign(payLoad,process.env.secretKey,{expiresIn:'1hr'})



        res.json({msg:"Registration successful",token:token});
        await mail(email,username,role);
    } catch (error) {
        console.log(error.message);   
    }
}

exports.login = async(req,res,next)=>{
    try {
        const {username,password} = req.body;
        if(!username || !password){
            return res.json({msg:"missing Fields"})
        }
        let checkUser = await users.findOne({username})
        if(!checkUser) return res.json({msg:"User not found"})

        let checkpass = await bcrypt.compare(password,checkUser.password)
        if(!checkpass) return res.json({msg:"username or password is wrong"})

        //verify the token
        let token = req.headers.authorization.split(' ')[1];
        if(!token) return res.json({msg:"Hii"})
        let checkToken = await jwt.verify(token,process.env.secretKey);
        if(!checkToken) return res.json({msg:"invalid token"})
        res.json({msg:"login successful"})
    } catch (error) {
        next(error);
    }
}