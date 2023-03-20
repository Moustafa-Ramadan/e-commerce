const mongoose=require("mongoose")


exports.dbConnection=()=>{
    mongoose.connect(process.env.CONNECTION_STRING).then(()=>{
        console.log("db Connection established")
    }).catch((err)=>{console.log(err)})
}
