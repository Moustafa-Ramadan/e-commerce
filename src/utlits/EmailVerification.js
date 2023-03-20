const nodemailer = require("nodemailer");
const userModel = require("../components/user/user.model");
const catchAsyncError = require("./catchAsyncError");
const AppError = require("./catchError");
let jwt = require('jsonwebtoken');


exports.sendEmail=async(option)=>{


   let transporter = nodemailer.createTransport({
    service:"gmail",
     auth: {
       user: "testcodec38@gmail.com", // generated ethereal user
       pass: process.env.EMAIL_PASS, // generated ethereal password
     },
   }); 
 
   // send mail with defined transport object
     transporter.sendMail({
     from: `"Route Acadmy 👻"<testcodec38@gmail.com>`, // sender address
     to: option.email, // list of receivers
     subject: "Hello ✔", // Subject line
     html: `<div style="background:#bbf;color:#fff;padding:20px">
     <h1>${option.message}</h1>
    
     <a href="http://localhost:3000/api/v1/users/Emailverify/${option.token}">verify</a>
      
     </div>`, // html body
   },(err,info)=>{
    if(err)
    return console.log(err)
    console.log(info)
   });
 
  }

   
     
  exports.Emailverify=catchAsyncError(async(req,res,next)=>{
    const {token}=req.params
    let decoded=await jwt.verify(token,process.env.STRING_KRY) 
    let user=await userModel.findOne({email:decoded.email})
    if(!user)
    return next(new AppError("user not found",404))
      await userModel.findOneAndUpdate({email:decoded.email},{emailConfirm:true})
      res.status(200).json({message:"verified"})
})
    
