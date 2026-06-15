const express = require('express')
const connection = require('./config/db')
const products = require('./models/productModel')
const users = require('./models/userModel')
const cors = require('cors')
const bcrypt = require('bcrypt')
const mail = require('./utils/gmail')
const jwt = require('jsonwebtoken')
let limiter = require('./middlewares/ratelimit')
let secretKey = 'dummysecret'

const app = express();
const port = 8080;



//middleware
app.use(cors());
app.use(limiter)
app.use(express.json())


app.get('/',(req,res)=>{
    res.json('Mummyyyyy')
})

app.get('/products',async(request,response)=>{
    try {
        let allProducts = await products.find();
        response.status(200).json(allProducts);
    } catch (error) {
        response.json(error.message);
    }
})

app.post('/products',async(request,response)=>{
    try {
        await products.create(request.body);
        response.status(201).json({msg:"Products saved"});
    } catch (error) {
        response.json(error.message);
    }
})

app.post('/bulkproducts',async(request,response)=>{
    try {
        await products.insertMany(request.body)
        response.status(201).json({msg:"All Products saved"});

    } catch (error) {
        response.json(error.message);
    }
})

app.put('/products/:id',async(request,response)=>{
    try {
        let prodcutId = request.params.id;
        await products.findByIdAndUpdate(prodcutId,request.body);
        response.json({msg:"products are updated"})
    } catch (error) {
        response.json(error.message);
    }
})

app.delete('/products/:id',async(request,response)=>{
    try {
        let productId = request.params.id;
        await products.findByIdAndDelete(productId);
        response.json({msg:"product is deleted"})
    } catch (error) {
        response.json(error.message);
    }
})


//registration 
app.post('/registration',async(req,res)=>{
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
        let token = await jwt.sign(payLoad,secretKey,{expiresIn:'1hr'})



        res.json({msg:"Registration successful",token:token});
        await mail(email,username,role);
    } catch (error) {
        console.log(error.message);   
    }
})

//login workflow
app.post('/login',async(req,res,next)=>{
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
        let checkToken = await jwt.verify(token,secretKey);
        if(!checkToken) return res.json({msg:"invalid token"})
        res.json({msg:"login successful"})
    } catch (error) {
        next(error);
    }
})

app.listen(port,()=>{
    console.log(`Listening to port:${port}`);
    connection();
})