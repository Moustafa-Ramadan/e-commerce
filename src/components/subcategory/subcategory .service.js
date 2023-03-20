const SubCategoryModel=require("./subcategory .model")
let catchAsyncErr=require("../../utlits/catchAsyncError")
const AppError = require("../../utlits/catchError")
var slugify = require('slugify')
const categoryModel = require("../category/category.model")
const ApiFeatures = require("../../utlits/ApiFeatures")
const factory=require("../Handlers/handel.factory")




//1-create subcategory

exports.createSubCategory= catchAsyncErr(async (req,res,next)=>{
    const{name,categoryId}=req.body
    let category=await categoryModel.findById(categoryId)
    if(!category){
        return next(new AppError("category not found",404))
        
    }
    let subcategory=new SubCategoryModel({name,categoryId,slug:slugify(name)});
    await subcategory.save();
    res.status(200).json(subcategory)
     
    
    })

//2-get all subCategories
exports.getSubCategories=factory.getAll(SubCategoryModel)
//3-get spacific subCategory

exports.getSubCategory= factory.getOne(SubCategoryModel)


    //4-update category

exports.updateSubCategory=factory.updateDocument(SubCategoryModel)

       //5-delete subCategory

exports.deleteSubCategory=factory.deleteOne(SubCategoryModel)




 //note: get spacific category with its subCategories in the category.service.js page


