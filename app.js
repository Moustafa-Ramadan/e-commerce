process.on('uncaughtException',(err)=>{

    console.log('uncaughtException',err);
})



const express = require('express')
const { dbConnection } = require('./src/database/database')
var morgan = require('morgan')
const AppError = require('./src/utlits/catchError')

let globalmiddlewareError=require("./src/utlits/globalmiddlewareError");
const { allRequires } = require('./src/utlits/indexAPP');
 
const app = express()
require("dotenv").config({path:"./config/.env"})
const port = process.env.PORT ||5000 
app.use(express.json())
app.use(express.static('uploads'))
if(process.env.MODE_ENV === "development"){
    app.use(morgan('dev'))

}

allRequires(app)

app.get('/', (req, res) => res.send('Hello World!'))
app.all("*",(req,res,next)=>{

    
    next(
        new AppError(`can't find this route:${req.originalUrl} on server `,404)
        );
})
// error handling middleware 
app.use(globalmiddlewareError)

dbConnection()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


process.on('unhandledRejection',(err)=>{

    console.log('unhandledRejection',err);
})