const userModel=require("./user.model")
let catchAsyncErr=require("../../utlits/catchAsyncError")
const AppError = require("../../utlits/catchError")
var slugify = require('slugify')

const factory=require("../Handlers/handel.factory")
// const cloudinary=require("cloudinary")

// cloudinary.config({ 
//     cloud_name: 'dtm4kmm5s', 
//     api_key: '273764512386596', 
//     api_secret: 'j7n1Anjf0axpKeHnAeX1smcAk0U' 
//   });




//1-create user

exports.createuser= catchAsyncErr(async (req,res,next)=>{

    // cloudinary.v2.uploader.upload(req.file.path,
    //   async(error, result)=> {
    //  console.log(result); });
    let isuser=await userModel.findOne({email:req.body.email})
    if(isuser) return next(new AppError("email already exist",401))
    let user=new userModel(req.body);
        await user.save();
        res.status(200).json(user)

    })

//2-get all users
exports.getusers=factory.getAll(userModel)
//3-get spacific user

exports.getuser= factory.getOne(userModel)


    //4-update user

exports.updateuser=catchAsyncErr(async (req,res,next)=>{
    
        const{id}=req.params
        let user=await userModel.findByIdAndUpdate(id,req.body,{new:true});
        
        !user && next(new AppError("user not found",404))
         user && res.status(200).json({result:user})
    
        }) 

//4-change password
 exports.changepassword=catchAsyncErr(async (req,res,next)=>{
    
            const{id}=req.params
            req.body.changePasswordAt=Date.now()
            let user=await userModel.findByIdAndUpdate(id,req.body,{new:true});
            
            !user && next(new AppError("user not found",404))
             user && res.status(200).json({result:user})
        
            }) 
    


            //5-update image

// exports.updateimageuser= catchAsyncErr(async (req,res,next)=>{

    


    
//         const{id}=req.params
//         if(req.file){
//             const path = __dirname+"../../../uploads/user/"
//             console.log(__dirname)
//             fs.unlink(path)
            
//             let brand=await userModel.findByIdAndUpdate(id,{image:req.file.filename,},{new:true});
        
//             !brand && next(new AppError("brand not found",404))
//             brand &&  res.status(200).json(brand)
//         }
//         else
//         {

//             res.status(404).json({message:"image only"})
        
//         }
        
        
    
//         }) 

        


       //6-delete user

exports.deleteuser=factory.deleteOne(userModel)