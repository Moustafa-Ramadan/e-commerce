let catchAsyncErr=require("../../utlits/catchAsyncError")
const AppError = require("../../utlits/catchError");
const userModel = require("../user/user.model");







    //1=> add To addresses

exports.addToaddresses= catchAsyncErr(async (req,res,next)=>{
      let {addresses}=await userModel.findByIdAndUpdate(req.user._id,
        {$addToSet:{addresses:req.body}}
        ,{new:true}); 
        !addresses && next(new AppError("addresses not found",404))
        addresses &&  res.status(200).json({result:addresses})
    
})

  //1=> get all addressess

  exports.getAlladdressess= catchAsyncErr(async (req,res,next)=>{
    let {addresses}=await userModel.findById(req.user._id); 
      !addresses && next(new AppError("addresses not found",404))
      addresses &&  res.status(200).json({result:addresses})
  
}) 


 //3=> remove From addresses

exports.removeToaddresses=catchAsyncErr(async (req,res,next)=>{

    let {addresses}=await userModel.findByIdAndUpdate(req.user._id,
        {$pull:{addresses:{_id:req.body.address}}}
        ,{new:true});
        console.log(addresses) 
        !addresses && next(new AppError("addresses not found",404))
        addresses &&  res.status(200).json({result:addresses})
   })  