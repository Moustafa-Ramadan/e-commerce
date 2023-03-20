const userModel=require("./user.model")
let catchAsyncErr=require("../../utlits/catchAsyncError")
const AppError = require("../../utlits/catchError")
const factory=require("../Handlers/handel.factory")
const bcrypt=require("bcrypt")
let jwt = require('jsonwebtoken');
const { sendEmail } = require("../../utlits/EmailVerification")

const {nanoid }=require("nanoid")





//1-signup

exports.signup= catchAsyncErr(async (req,res,next)=>{

  
  let isuser=await userModel.findOne({email:req.body.email})
  if(isuser) return next(new AppError("email already exist",401))
  let user=new userModel(req.body);
        await user.save();
    let token = jwt.sign({email:req.body.email}, process.env.STRING_KRY, { expiresIn: 60 * 60  });
     sendEmail({email:req.body.email,token,message:"hallo world"})
        res.status(200).json(user)
   })


    
    //2-signin

exports.signin= catchAsyncErr(async (req,res,next)=>{

    const{email,password}=req.body
    let user=await userModel.findOne({email})
console.log(user)
    

    if(!user||!(await bcrypt.compare(password,user.password))) 
    return next(new AppError("incorrect email or password",401))
    let token = jwt.sign({ name:user.name,userId:user._id }, process.env.STRING_KRY);
    if(user.emailConfirm == true){
      res.status(200).json({message:"login",token })
    }else{
      next(new AppError("please verfiy your account",401))
    }
    
    

    })

// 3=> user change password
    exports.userChangePassword=catchAsyncErr(async (req,res,next)=>{
    
      const{id}=req.params
      if(id != req.user._id)
      return next(new AppError("You are not allow to access to this route",401))
      let match=await bcrypt.compare(req.body.password,req.user.password)
      if(match)
      return next(new AppError("sorry it is the same password",401))
      req.body.changePasswordAt=Date.now()
      let user=await userModel.findByIdAndUpdate(id,req.body,{new:true});
      console.log(req.user._id,"===",id)
      
      !user && next(new AppError("user not found",404))
       user && res.status(200).json({result:user})
  
      }) 



 // 4=>send activation code
 

 exports.sendActivationCode=catchAsyncErr(async (req,res,next)=>{
    
  let userEmail=await userModel.findOne({email:req.body.email})
  if(!userEmail)
  return next(new AppError("user not found ",404))
let acode=nanoid(6)
 let user= await userModel.findOneAndUpdate({email:req.body.email},{activationCode:acode},{new:true})
  sendEmail({email:req.body.email,message:user.activationCode})
  res.status(200).json(user)
  }) 

   // 5=>Reset password
 

 exports.ResetPassword=catchAsyncErr(async (req,res,next)=>{
    const{Acode,password,email}=req.body
  let userEmail=await userModel.findOne({email})
  if(!userEmail)
  return next(new AppError("user not found ",404))
let acode=nanoid(6)
if(userEmail.activationCode == Acode){
  let user= await userModel.findOneAndUpdate({email},{password,activationCode:acode},{new:true})
  res.status(200).json(user)
}else{
  return next(new AppError("activation code is wrong",404))
}
 
  }) 

    exports.protectedRoutes=catchAsyncErr(async(req,res,next)=>{
   let token=req.headers.token;
   if(!token) return next(new AppError("invalid token",401))
 
    let decoded=await jwt.verify(token,process.env.STRING_KRY)  
   
    let user=await userModel.findById(decoded.userId)
   if(!user) return next(new AppError("user not found",401))

   if(user.changePasswordAt){
    let changepassword=parseInt(user.changePasswordAt.getTime()/1000)
    console.log(changepassword,"====",decoded.iat)
    if(changepassword>decoded.iat)
     return next(new AppError("password changed",401))
    
   }
   
    req.user=user 
    next()
    })


    exports.allowesTo=(...roles)=>{

      return catchAsyncErr(async(req,res,next)=>{
        if(!roles.includes(req.user.role))
        return next(new AppError("You are not authorized to access to this route",401))
        next()
      })
    }

