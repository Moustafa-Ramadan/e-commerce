const{Schema,model,Types}=require("mongoose")


const schema=Schema({
name:{
    type:String,
    required:[true,"brand name required"],
    trim:true,
    unique:[true,"brand name must be unique"],
    minlength:[2,"brand name must be at least 2 characters"]
},
slug:{
    type:String,
    lowercase:true
},
image:String,


},{timestamps:true})


// schema.post("init",(doc)=>{
// doc.image="http://localhost:3000/brand/"+doc.image
// })

module.exports=model("brand",schema)