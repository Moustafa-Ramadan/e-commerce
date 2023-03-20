const multer  = require('multer')
const { v4: uuidv4 } = require('uuid');
const AppError = require('./catchError');

let option=(folderfile)=>{
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads/${folderfile}`)
    },
    filename: function (req, file, cb) {
      cb(null,uuidv4()+"_"+ file.originalname)
    }
  })

  function fileFilter (req, file, cb) {

    if(file.mimetype.startsWith("image")){
        cb(null, true)
    }
    else{
        cb(new AppError("images only",400), false)
    }
    }
  
  const upload = multer({ storage: storage,fileFilter })
  return upload
}

module.exports.imgupload=(fieldName,folderfile)=>option(folderfile).single(fieldName)




module.exports.imagesMixsUpload=(fieldsArray,folderfile)=>option(folderfile).fields(fieldsArray)

  
