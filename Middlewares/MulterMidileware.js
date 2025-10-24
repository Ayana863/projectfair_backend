const multer=require('multer')

 const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./Uploads')
    },
    filename:(req,file,callback)=>{
        // callback(null,`image${Date.now()}-${req.file.originalname}`)
        callback(null, `image${Date.now()}-${file.originalname}`);

    }
 })
 const multerMiddileware=multer({storage})
 module.exports = multerMiddileware;
