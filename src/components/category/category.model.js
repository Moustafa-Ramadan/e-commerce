const{Schema,model,Types}=require("mongoose")


const schema=Schema({
name:{
    type:String,
    required:[true,"category name required"],
    trim:true,
    unique:[true,"category name must be unique"],
    minlength:[2,"category name must be at least 2 characters"]
},

image:{ type:String
    ,default:"https://res.cloudinary.com/dtm4kmm5s/image/upload/v1667863582/cld-sample-2.jpg"},

slug:{
    type:String,
    lowercase:true
}


},{timestamps:true})

module.exports=model("category",schema)