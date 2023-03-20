let catchAsyncErr=require("../../utlits/catchAsyncError")
const AppError = require("../../utlits/catchError")
var slugify = require('slugify')
const ApiFeatures = require("../../utlits/ApiFeatures")



exports.deleteOne=(model)=>{
return catchAsyncErr(async (req,res,next)=>{

    const{id}=req.params
    let document=await model.findByIdAndDelete(id);
    !document && next(new AppError("document not found",404))
    document &&  res.status(200).json({result:document})
   
    
})  
}

exports.updateDocument=(model)=>{
    return catchAsyncErr(async (req,res,next)=>{
        if(req.body.name){
            req.body.slug=slugify(req.body.name)
        }
       
            const{id}=req.params
            let document=await model.findByIdAndUpdate(id,req.body,{new:true});
            
            !document && next(new AppError("document not found",404))
             document && res.status(200).json({result:document})
        
            }) 
    
}


exports.getOne=(model)=>{
    return catchAsyncErr(async (req,res,next)=>{
        const{id}=req.params
        let document=await model.findById(id)
        
        !document && next(new AppError("document not found",404))
        document && res.status(200).json({result:document})
    
        })
}

exports.getAll=(model)=>{
    return catchAsyncErr(async (req,res,next)=>{
        console.log(req.params);
        let filter={}
        if(req.params.categoryId){
            filter={categoryId:req.params.categoryId}
        
        }
        
        let apifeatures= new ApiFeatures(model.find(filter),req.query)
        .paginate()
        .filter()
        .sort()
        .search()
        .fields() 
        let document=await apifeatures.mongooseQuery ;
        !document && next(new AppError("document not found",404))
        document && res.status(200).json({page:apifeatures.page,document})
            }
        )
}