const couponModel=require("./coupon.model")
let catchAsyncErr=require("../../utlits/catchAsyncError")
const AppError = require("../../utlits/catchError")
const factory=require("../Handlers/handel.factory")





//1-create coupon

exports.addcoupon= catchAsyncErr(async (req,res,next)=>{

     let coupon=new couponModel(req.body);
        await coupon.save();
        res.status(200).json(coupon)

    })

//2-get all coupons
exports.getcoupons=factory.getAll(couponModel)
//3-get spacific coupon

exports.getcoupon= factory.getOne(couponModel)


    //4-update coupon

exports.updatecoupon= factory.updateDocument(couponModel)
        
 //5-delete coupon

exports.deletecoupon=catchAsyncErr(async (req,res,next)=>{

    const{id}=req.params

        let coupon=await couponModel.findByIdAndDelete(id);
        !coupon && next(new AppError("coupon not found",404))
        coupon &&  res.status(200).json({result:coupon})
})  