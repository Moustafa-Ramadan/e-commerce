let catchAsyncErr=require("../../utlits/catchAsyncError")
const AppError = require("../../utlits/catchError");
const userModel = require("../user/user.model");







    //1=> add To Wishlist

exports.addToWishlist= catchAsyncErr(async (req,res,next)=>{
      let {wishlist}=await userModel.findByIdAndUpdate(req.user._id,
        {$addToSet:{wishlist:req.body.product}}
        ,{new:true}); 
        !wishlist && next(new AppError("wishlist not found",404))
        wishlist &&  res.status(200).json({result:wishlist})
    
})

  //1=> get all Wishlists

  exports.getAllWishlists= catchAsyncErr(async (req,res,next)=>{
    let wishlist=await userModel.findById(req.user._id); 
      !wishlist && next(new AppError("wishlist not found",404))
      wishlist &&  res.status(200).json({result:wishlist})
  
}) 


 //3=> remove From Wishlist

exports.removeToWishlist=catchAsyncErr(async (req,res,next)=>{

    let {wishlist}=await userModel.findByIdAndUpdate(req.user._id,
        {$pull:{wishlist:req.body.product}}
        ,{new:true});
        console.log(wishlist) 
        !wishlist && next(new AppError("wishlist not found",404))
        wishlist &&  res.status(200).json({result:wishlist})
   })  