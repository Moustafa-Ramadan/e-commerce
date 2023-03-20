const{Schema,model,Types}=require("mongoose")


const schema=Schema({
name:{
    type:String,
    required:[true,"product name required"],
    trim:true,
    unique:[true,"product name must be unique"],
    minlength:[2,"product name must be at least 2 characters"]
},

image:String,

slug:{
    type:String,
    lowercase:true
},
description:{
    type:String,
    required:[true,"product description required"],
    trim:true,
    minlength:[10,"product description must be at least 10 characters"]
},
quantity:{
    type:Number,
    required:[true,"quantity name required"],
    default:0,
    min:[0,"quantity must be at least 0 "]
},
sold:{
    type:Number,
    default:0
},

price:{
    type:Number,
   
},
priceAfterDiscount:{
    type:Number,
   
},
colors:[String],

imageCover:String,

images:[String],

category:{
    type:Types.ObjectId,
    ref:"category"
},
subcategory:{
    type:Types.ObjectId,
    ref:"subcategory"
},
brand:{
    type:Types.ObjectId,
    ref:"brand"
},
averageRating:{
    type:Number,
    min:[1,"rating number must be between 0 and 5"],
    max:[5,"rating number must be between 0 and 5"]

},
ratingCount:{
    type:Number,
    default:0
}

},{timestamps:true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }})



schema.virtual('reviews', {
    ref: 'review',
    localField: '_id',
    foreignField:'productId'
  });


  schema.pre(/^find/,function(){
    this.populate([{
        path:"reviews",
        select:"name",
        Options:{ limit: 1}
    }])
})


schema.post("init",(doc)=>{
    if(doc.imageCover && doc.images){
        let imgs=[]
    doc.imageCover="http://localhost:3000/product/"+doc.imageCover
    doc.images.forEach(img => {
        imgs.push("http://localhost:3000/product/"+img)
        
    }
    );
    doc.images=imgs
    }
    
    })
  
   
 
        
    

module.exports=model("product",schema)