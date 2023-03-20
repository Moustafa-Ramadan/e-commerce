const cartModel=require("./cart.model")
let catchAsyncErr=require("../../utlits/catchAsyncError")
const AppError = require("../../utlits/catchError")
// const factory=require("../Handlers/handel.factory")
const productModel = require("../product/product.model")
const couponModel=require('../coupon/coupon.model')
function calcTotalPrice(cart){
    let totalPrice=0

    if(cart.Discount){

        cart.cartItems.forEach((elm)=>{
            totalPrice +=elm.price*elm.quantity
        } )
        cart.totalPrice=totalPrice;
        cart.totalPriceAfterDiscount=(cart.totalPrice-(cart.totalPrice*cart.Discount)/100).toFixed(2)
    }else{
        cart.cartItems.forEach((elm)=>{
            totalPrice +=elm.price*elm.quantity
        } )
        cart.totalPrice=totalPrice;
    }
   
}



//1-create cart

exports.addcart= catchAsyncErr(async (req,res,next)=>{

    let product=await productModel.findById(req.body.product)
   
    if(!product) return next(new AppError('product not found',404))
req.body.price=product.price
console.log(product)
    let cart=await cartModel.findOne({user:req.user._id})
    console.log(cart)
    if(!cart){
        let newcart=new cartModel({cartItems:[req.body],user:req.user._id});
        calcTotalPrice(newcart)
         await newcart.save();
        res.status(200).json({message:"newcart created successfully",newcart})
    }else{
       
        let findproduct=cart.cartItems.find((elm)=>elm.product==req.body.product)
        if(findproduct){
            findproduct.quantity+=1 
        }else{
            cart.cartItems.push(req.body)
        }
        calcTotalPrice(cart)
        await cart.save();
        res.status(200).json(cart)
    }
        

    })

//2-get all carts
// exports.getcarts=factory.getAll(cartModel)
// //3-get spacific cart

// exports.getcart= factory.getOne(cartModel)


    //4-update cart

exports.updatequantity= catchAsyncErr(async (req,res,next)=>{

    let cart=await cartModel.findOne({user:req.user._id})
    if(!cart){
        return next(new AppError("cart not found",404))
    }else{
       
        let findproduct=cart.cartItems.find((elm)=>elm.product==req.body.product)
        if(findproduct){
            findproduct.quantity=req.body.quantity 
        }else{
            next(new AppError("findproduct not found",404))
        }
        calcTotalPrice(cart)
        await cart.save();
        res.status(200).json(cart)
    }
        

    })
        
 //5-delete cart

exports.deletecart=catchAsyncErr(async (req,res,next)=>{
    let cart=await cartModel.findOneAndUpdate({user:req.user._id},
        {$pull:{cartItems:{_id:req.body.itemId}}}
        ,{new:true});
        calcTotalPrice(cart)
        await cart.save();
        !cart && next(new AppError("cart not found",404))
        cart &&  res.status(200).json({result:cart})
})  



exports.applyCoupon= catchAsyncErr(async (req,res,next)=>{
    let coupon=await couponModel.findOne({code:req.body.code,expires:{$gt:Date.now()}})

    if(!coupon) return next(new AppError('coupon not found',404))
    let cart=await cartModel.findOne({user:req.user._id})
    if(!cart){
        return next(new AppError("cart not found",404))
    }else{
       
    cart.totalPriceAfterDiscount=(cart.totalPrice-(cart.totalPrice*coupon.discount)/100).toFixed(2)
    cart.Discount=coupon.discount
     await cart.save();
        res.status(200).json(cart)
    }
        

    })


    exports.getUserCart= catchAsyncErr(async (req,res,next)=>{

        let cart=await cartModel.findOne({user:req.user._id})
        if(!cart){
            return next(new AppError("cart not found",404))
        }else{
            res.status(200).json({result:cart.cartItems.length,cart})
        }
            
    
        })