const{Schema,model,Types}=require("mongoose")


const schema=Schema({
title:{
    type:String,
    required:[true,"review name required"],
    trim:true,
},

user:{
    type:Types.ObjectId,
    ref:"user"
},
productId:{
    type:Types.ObjectId,
    ref:"product"
},
averagerating:{
    type:Number,
    min:[1,"rating number must be between 0 and 5"],
    max:[5,"rating number must be between 0 and 5"]

}
},{timestamps:true })


schema.pre(/^find/,function(){
    this.populate('user','name')
})

module.exports=model("review",schema)