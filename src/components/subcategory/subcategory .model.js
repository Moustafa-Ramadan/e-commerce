const{Schema,model,Types}=require("mongoose")


const schema=Schema({
name:{
    type:String,
    required:[true,"subcategory name required"],
    trim:true,
    unique:[true,"subcategory name must be unique"],
    minlength:[2,"suncategory name must be at least 2 characters"]
},

categoryId:{
    type:Types.ObjectId,
    ref:"category"
},
slug:{
    type:String,
    lowercase:true
}


},{timestamps:true})

module.exports=model("subcategory",schema)