const{Schema,model,Types}=require("mongoose")
const bcrypt=require("bcrypt")


const schema=Schema({
name:{
    type:String,
    required:[true,"user name required"],
    trim:true,
    minlength:[2,"user name must be at least 2 characters"]
},
email:{
    type:String,
    required:[true,"user email required"],
    trim:true,
    unique:[true,"category name must be unique"],
 
},
password:{
    type:String,
    required:[true,"user password required"],
    minlength:[6,"user name must be at least 6  characters"]
},
changePasswordAt:Date,

phone:{
    type:String,
    required:[true,"user email required"],
},

profileImage:{ type:String
,default:"https://res.cloudinary.com/dtm4kmm5s/image/upload/v1667863582/cld-sample-2.jpg"},

role:{type:String,
enum:["admin","user"],
default:'user'},
emailConfirm:{
    type:Boolean,
    default:false
},
activationCode:String
,
isactive:{
    type:Boolean,
    default:true
},
wishlist:[{type:Types.ObjectId,
    ref:"product"}],

    addresses:[{
        name:String,
        street:String,
        city:String,
        phone:String,
    }]



},{timestamps:true})


schema.pre("save",async function(){
 this.password= await  bcrypt.hash(this.password, Number(process.env.ROUND) )
})

schema.pre("findOneAndUpdate",async function(){
    if(this._update.password){
        this._update.password= await  bcrypt.hash( this._update.password, Number(process.env.ROUND) )
    }
   
   })

module.exports=model("user",schema)