const express = require('express')
const connection = require('./config/db')
const products = require('./models/productModel')
const users = require('./models/userModel')
const cors = require('cors')
const bcrypt = require('bcrypt')
const mail = require('./utils/gmail')

const app = express();
const port = 2000;

//middlewares
app.use(cors());
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
        res.json({msg:"Registration successful"});
        await mail(email,username,role);
    } catch (error) {
        console.log(error.message);   
    }
})

//mail 


app.listen(port,()=>{
    console.log(`Listening to port:${port}`);
    connection();
})