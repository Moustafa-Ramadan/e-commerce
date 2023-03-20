const brandModel=require("./brand.model")
let catchAsyncErr=require("../../utlits/catchAsyncError")
const AppError = require("../../utlits/catchError")
var slugify = require('slugify')
const fs = require('fs')
const factory=require("../Handlers/handel.factory")
const cloudinary=require("cloudinary")

cloudinary.config({ 
    cloud_name: 'dtm4kmm5s', 
    api_key: '273764512386596', 
    api_secret: 'j7n1Anjf0axpKeHnAeX1smcAk0U' 
  });




//1-create brand

exports.createbrand= catchAsyncErr(async (req,res,next)=>{

    cloudinary.v2.uploader.upload(req.file.path,
      async(error, result)=> {
    const{name}=req.body
    req.body.image=result.secure_url
    
   if(req.body.name){
    req.body.slug=slugify(name)
   }
    
     let brand=new brandModel(req.body);
        await brand.save();
        res.status(200).json(brand)
    
    console.log(result); });

    })

//2-get all brands
exports.getbrands=factory.getAll(brandModel)
//3-get spacific brand

exports.getbrand= factory.getOne(brandModel)


    //4-update brand

exports.updatebrand= factory.updateDocument(brandModel)


            //5-update image

exports.updateimageBrand= catchAsyncErr(async (req,res,next)=>{

    


    
        const{id}=req.params
        if(req.file){
            // const path = __dirname+"../../../uploads/brand/"
            // console.log(__dirname)
            // fs.unlink(path)
            
            let brand=await brandModel.findByIdAndUpdate(id,{image:req.file.filename,},{new:true});
        
            !brand && next(new AppError("brand not found",404))
            brand &&  res.status(200).json(brand)
        }
        else
        {

            res.status(404).json({message:"image only"})
        
        }
        
        
    
        }) 

        


       //6-delete brand

exports.deletebrand=factory.deleteOne(brandModel)