const reviewModel=require("./reviews.model")
let catchAsyncErr=require("../../utlits/catchAsyncError")
const AppError = require("../../utlits/catchError")
const factory=require("../Handlers/handel.factory")





//1-create review

exports.addReview= catchAsyncErr(async (req,res,next)=>{
const{productId}=req.body
let isReview=await reviewModel.findOne({user:req.user._id,productId})
console.log(isReview)

if(isReview)
return next(new AppError("You added review before",404))
req.body.user=req.user._id
     let review=new reviewModel(req.body);
        await review.save();
        res.status(200).json(review)

    })

//2-get all reviews
exports.getReviews=factory.getAll(reviewModel)
//3-get spacific review

exports.getReview= factory.getOne(reviewModel)


    //4-update review

exports.updateReview= catchAsyncErr(async (req,res,next)=>{

    const{id}=req.params
    let isReview=await reviewModel.findById(id);
    console.log(req.user._id ,"==",isReview.user._id)
    if(isReview.user._id == req.user._id.toString() ){
        let review=await reviewModel.findByIdAndUpdate(id,req.body,{new:true});
        !review && next(new AppError("review not found",404))
        review &&  res.status(200).json({result:review})
    }else{
        
        next(new AppError("You can't access to this route",404))
    }   
        
})
 //5-delete review

exports.deletereview=catchAsyncErr(async (req,res,next)=>{

    const{id}=req.params
    let isuser=await reviewModel.findById(id);
    console.log(req.user)
    if( req.user.role =='admin' || isuser.user == req.user._id.toString() ){
        let user=await reviewModel.findByIdAndDelete(id);
        !user && next(new AppError("user not found",404))
        user &&  res.status(200).json({result:user})
    }else{
        
        next(new AppError("You can't access to this route",404))
    }   
   
       
    // if(req.user.role=='admin'){
    //     let user=await reviewModel.findByIdAndDelete(id);
    //     !user && next(new AppError("user not found",404))
    //     user &&  res.status(200).json({result:user})
    // }else if(isuser.user != req.user._id.toString()){
    //     next(new AppError("You can't access to this route",404))
        
    // }else{
    //     let user=await reviewModel.findByIdAndDelete(id);
    //     !user && next(new AppError("user not found",404))
    //     user &&  res.status(200).json({result:user})
    // }
   
    
    
    
   
    
})  