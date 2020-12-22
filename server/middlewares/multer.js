const multer = require("multer");
//const Datauri = require("datauri");
const DatauriParser = require("datauri/parser");
const path = require("path");

const singlestorage = multer.memoryStorage();
const multerUpload = multer({ singlestorage }).single('file');

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/uploads')
    }
    ,
    filename:function(req,file,cb){
        cb(null, file.originalname)
    }
})

// FILE VALIDATION

const fileFilter = (req,file,cb) =>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    }else{
        // prevent upload
        cb({message: 'unsupported file format'}, false)
    }

}

const upload = multer({
    storage: storage,
    limits:{fileSize: 1024 * 1024},
    fileFilter:fileFilter
})


//const multerMultiUploads = multer({ storage }).array('file');
//const dUri = new Datauri();
const parser = new DatauriParser();

const dataUri = req => parser.format(
    path.extname(req.file.originalname).toString(),
    req.file.buffer
    ).content;

module.exports = { multerUpload, dataUri, upload };