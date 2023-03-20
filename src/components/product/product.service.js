const productModel=require("./product.model")
let catchAsyncErr=require("../../utlits/catchAsyncError")
const AppError = require("../../utlits/catchError")
var slugify = require('slugify')
const factory=require("../Handlers/handel.factory")




//1-create product

exports.createproduct= catchAsyncErr(async (req,res,next)=>{
    
    
    if(req.body.name){
        req.body.slug=slugify(req.body.name)
    }
let images=[]
    req.body.imageCover=req.files.imageCover[0].filename
    req.files.images.forEach(img => {
        images.push(img.filename)
    });

    req.body.images=images
        let product=new productModel(req.body);       
         await product.save();
        res.status(200).json(product)
        console.log(req.files);



      
    })

//2-get all product
exports.getproducts=factory.getAll(productModel)
//3-get spacific product

exports.getproduct= factory.getOne(productModel)


    //4-update category

exports.updateproduct= catchAsyncErr(async (req,res,next)=>{
    
        const{id}=req.params

        if(req.body.name){
            req.body.slug=slugify(req.body.name)

        }
    let images=[]
        req.body.imageCover=req.files.imageCover[0].filename
        req.files.images.forEach(img => {
            images.push(img.filename)
        });
    
        req.body.images=images

        let product=await productModel.findByIdAndUpdate(id,req.body,{new:true});
        
        !product && next(new AppError("product not found",404))
         product && res.status(200).json(product)
    
        }) 


       //5-delete product

exports.deleteproduct=factory.deleteOne(productModel)





