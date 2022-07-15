//const sslRedirect = require("heroku-ssl-redirect");
const express = require("express");
//const bodyParser = require("body-parser");
const cors = require("cors");
const cloudinary = require("./config/cloudinaryConfig");
const { uploader } = require ('cloudinary');
const { multerUpload, dataUri, upload } = require("./middlewares/multer");
const fs = require('fs');
const newStart = require("./middlewares/newStart");


//const path = require('path');
//const uuid = require('uuidv4');
//const fileUpload = require('express-fileupload');
//const morgan = require('morgan');
//const fs = require('fs');
//const multiparty = require('connect-multiparty');
//const MultipartyMiddleware = multiparty({uploadDir:'./public'});
//var multipart = require('connect-multiparty');
//var multipartMiddleware = multipart({uploadDir: './public'});
//const multipartMiddleware = multipart({uploadDir:'./public'});

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// middle ware
app.use(express.static("public")); //to access the files in public folder

//const db = require("./models/");
//const Role = db.role;
//const User = db.user;


newStart();


/*
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage }).single("file");
var multiupload = multer({ storage: storage }).array("file");
*/

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(express.json({ limit: "800kb" }));

// Enable SSL redirect
//app.use(sslRedirect());

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to DoanStack application." });
});

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/product.routes")(app);
require("./routes/productimg.routes")(app);
require("./routes/productcom.routes")(app);
require("./routes/article.routes")(app);
require("./routes/articlecom.routes")(app);
require("./routes/articleimg.routes")(app);
require("./routes/productRating.routes")(app);
require("./routes/mail.routes")(app);


// file upload api
/*
app.post('/upload', (req, res) => {
  if (!req.files) {
      return res.status(500).send({ msg: "file is not found" })
  }
      // accessing the file
  const myFile = req.files.file;
  //  mv() method places the file inside public directory
  myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
      if (err) {
          console.log(err)
          return res.status(500).send({ msg: "Error occured" });
      }
      // returing the response with file path and name
      return res.send({name: myFile.name, path: `/${myFile.name}`});
  });
});

*/

/*
app.post("/upload", function (req, res) {
  console.log(req);
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    console.log(req.file);
    return res
      .status(200)
      .send({ name: req.file.filename, path: `/${req.file.filename}` });
  });
});


app.post("/multiupload", function (req, res) {
  console.log(req.files);
  multiupload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    //console.log(req);
    return res.status(200).send(req.files);
  });
});

app.post("/uploadfiles", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      url: res.req.file.filename,
      fileName: res.req.file.filename,
    });
  });
});

app.post("/ckeditorupload", upload, function (req, res) {
  var html;
  var fs = require("fs");
  fs.readFile(req.file.path, function (err, data) {
    if (err) {
      res.send({ error: err });
    } else {
      var imageinfo = "";
      imageinfo =
        "{\n " +
        '    "uploaded": 1,\n' +
        '    "fileName": "' +
        req.file.filename +
        '",\n' +
        '    "url": "http://localhost:8080/' +
        req.file.filename +
        '"\n' +
        "}";

      console.log(imageinfo);

      res.send(imageinfo);
    }
  });
  // don't forget to delete all req.files when done
});

TESTING POSTMAN
app.post('/upload', multerUploads, (req, res) => {
console.log('req.file :', req.file);
});

*/

app.post('/upload', multerUpload, (req, res) => {

    if(req.file) {
 
    const file = dataUri(req);
    return uploader.upload(file).then((result) => {
    const image = result.secure_url;
    return res.status(200).send({ name: req.file.originalname, path: image })
    }).catch((err) => res.status(400).json({
      message: 'something went wrong while processing your request',
      data: {err}}))
    }
    
});

app.post('/multiuploads', upload.array('file'), async(req, res)=>{
  const uploader = async (path) => await cloudinary.uploads(path, 'uploads');

  const urls = [];
  const files = req.files;
  for(const file of files){
    const {path} = file;

    const newPath = await uploader(path);

    urls.push(newPath);
    
    fs.unlinkSync(path);
  }

  res.status(200).json({
    message: "Images Uploaded Successfully",
    data: urls
  });
})

app.post('/uploadfiles', multerUpload, (req, res) => {

  if(req.file) {
 
  const file = dataUri(req);
  return uploader.upload(file).then((result) => {

  const image = result.secure_url;
  return res.status(200).json({
    success: true,
    url: image,
    fileName: res.req.file.originalname,
  })
  }).catch((err) => res.status(400).json({
    message: 'something went wrong while processing your request',
    data: {err}}))
  }
    
});


app.post('/ckeditorupload', multerUpload, (req, res) => {

  if(req.file) {

  const file = dataUri(req);
  return uploader.upload(file).then((result) => {

  const image = result.secure_url;
  return res.status(200).send({ url: image })
  }).catch((err) => res.status(400).json({
    message: 'something went wrong while processing your request',
    data: {err}}))
  }
  
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
