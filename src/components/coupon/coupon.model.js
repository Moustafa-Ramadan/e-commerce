const{Schema,model,Types}=require("mongoose")


const schema=Schema({
code:{
    type:String,
    required:[true,"coupon code required"],
    // unique:[true,"coupon code must be unique"],
    trim:true,
},
expires:{type:Date},

discount:{type:Number},

},{timestamps:true})

module.exports=model("coupon",schema)