const CategoryModel=require("./category.model")
var slugify = require('slugify')
let catchAsyncErr=require("../../utlits/catchAsyncError")
const AppError = require("../../utlits/catchError")
const factory=require("../Handlers/handel.factory")
const fs = require('fs')




//1-create category

exports.createCategory= catchAsyncErr(async (req,res,next)=>{
    req.body.image=req.file?.filename
    if(req.body.name){
        req.body.slug=slugify(req.body.name)
    }
    
    let category=new CategoryModel(req.body);
    await category.save();
    res.status(200).json(category)
     
    
    })

//2-get all categories
exports.getCategories=factory.getAll(CategoryModel)
//3-get spacific category

exports.getCategory= factory.getOne(CategoryModel)

    //4-update category

exports.updateCategory= factory.updateDocument(CategoryModel)


       //5-delete category

exports.deleteCategory=factory.deleteOne(CategoryModel)


// 6-update image

exports.updateimageCategory= catchAsyncErr(async (req,res,next)=>{
 const{id}=req.params

    let img=await CategoryModel.findById(id)
    console.log(img)
  
    if(req.file){
        fs.unlink(`uploads/category`, function (err) {
            if (err) throw err;
            // if no error, file has been deleted successfully
            console.log('File deleted!');
        });
        
        let category=await CategoryModel.findByIdAndUpdate(id,{image:req.file.filename,},{new:true});
    
        !category && next(new AppError("category not found",404))
        category &&  res.status(200).json(category)
    }
    else
    {

        res.status(404).json({message:"image only"})
    
    }
    
    

    }) 

   