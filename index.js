const express=require('express');
const cors=require("cors");
require('./db/config'); 
// const mongoose=require('mongoose');
// mongoose.connect("mongodb://127.0.0.1:27017/ECOMMERCE")
const jwt=require('jsonwebtoken');
const jwtKey='e-comm';
const User=require("./db/User");
const Product=require("./db/Product");
const app=express();
app.use(express.json());
app.use(cors());


// Signup Api
app.post("/register",async(req,resp)=>{
     let user=new User(req.body)
     let result=await user.save();
     result=result.toObject();
     delete result.password;
     jwt.sign({result},jwtKey,{expiresIn:'2h'},(err,token)=>{
          if(err){
               resp.send({result:"Something went wrong,Please check this"})
          }
          console.log(token);
          resp.send({result,auth:token})
     })
})


// login Api
app.post("/login",async (req,resp)=>{
     if(req.body.password && req.body.email){
          let user=await User.findOne(req.body).select('-password');
          if(user)
          {
               jwt.sign({user},jwtKey,{expiresIn:'2h'},(err,token)=>{
                    if(err){
                         resp.send({result:"Something went wrong,Please check this"})
                    }
                    resp.send({user,auth:token})
               })
          }
          else{
               resp.send({result:"No user Found" })
          }
     }
     else{
          resp.send({result:'No user found'})
     }
     
})
app.listen(5000);

// Add-product api
app.post("/add-product",verifyToken,async(req,resp)=>{
     let product=new Product(req.body);
     let result=await product.save();
     resp.send(result);
})

// get Product api
app.get("/products",verifyToken,async(req,resp)=>{
     let products=await Product.find();
     if(products.length>0){
          resp.send(products);
     }else{
          resp.send({result:"No Products found"})
     }

})


// delete product api
app.delete("/products/:id",verifyToken,async (req,resp)=>{
     const result=await Product.deleteOne({_id:req.params.id});
     resp.send(result);
})



// For getting the data of Particular product id and prefill the form
app.get("/product/:id",verifyToken,async(req,resp)=>{
     let result=await Product.findOne({_id:req.params.id});
     if(result){
          resp.send(result);
     }
     else{
           resp.send({result:"No Record Found."})
     }
});



// for updating the data
app.put("/product/:id",verifyToken,async(req,resp)=>{
     let result=await Product.updateOne(
          {_id:req.params.id},
          {
               $set:req.body
          }
     )
     resp.send(result);
})

app.get("/search/:key",verifyToken,async(req,resp)=>{
     let result=await Product.find({
          "$or":[
               {name:{$regex:req.params.key}},
               {company:{$regex:req.params.key}},
               {category:{$regex:req.params.key}}
          ]
     })
     resp.send(result);
})

function verifyToken(req,resp,next){
     let token=req.headers['authorization'];
     console.log('Middleware called',token)
     if(token){
          token=token.split(" ");
          console.log(token);
          jwt.verify(token[1],jwtKey,(err,valid)=>{
               if(err){
                    resp.status(401).send({result:'Please add valid token with header'})
               }
               else{
                      next();
               }
          })
     }
     else{
         resp.status(403).send({result:"Please add token with header"})
     }
}







// app.get("/",(req,resp)=>{
//      resp.send('app is working')
// })