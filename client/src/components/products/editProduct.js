import { Fragment, useState, useRef, useEffect } from "react";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import InlineEditor from "@ckeditor/ckeditor5-build-inline";
//import InlineEditor from "@ckeditor/ckeditor5-build-inline";
import CustomUpload from "../../js/CustomUploader";
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

//const sanitizeHtml = require('sanitize-html');

const EditProduct = ({ product }) => {
  const [product_id] = useState(product.id);
  const [name, setName] = useState(product.name);
  const [vendor_id] = useState(product.vendor_id);
  const [vendor, setVendor] = useState(product.vendor);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [quantity, setQuantity] = useState(product.quantity);
  const [status, setStatus] = useState(product.status);
  const [category, setCategory] = useState(product.category);
  


  // SOLO: Uploaded Solo File
  const [solofile, setSoloFile] = useState();
  const [solopreview, setSoloPreview] = useState("");
  const [solodata, getSoloFile] = useState({ name: "", path: "" });
  const [soloprogress, setSoloProgress] = useState(0);
  const soloel = useRef();

  const soloHandleChange = (e) => {
    setSoloProgress(0);
    const file = e.target.files[0]; // accesing file
    console.log(file);
    setSoloFile(e.target.files[0]); // storing file

    if (!e.target.files) {
      setSoloPreview({
        file: null,
      });
    } else {
      //console.log(previews);

      setSoloPreview({
        file: URL.createObjectURL(e.target.files[0]),
      });
      //console.log(image);
    }
  };

  const soloUploadFile = () => {
    const formData = new FormData();
    formData.append("file", solofile); // appending file
    for (var value of formData.values()) {
      console.log(value);
    }
    axios
      .post("http://localhost:8080/upload", formData, {
        onUploadProgress: (ProgressEvent) => {
          let progress = Math.round(
            (ProgressEvent.loaded / ProgressEvent.total) * 100
          );
          setSoloProgress(progress);
        },
      })
      .then((res) => {
        console.log(res);
        getSoloFile({
          name: res.data.name,
          // path: "http://localhost:8080" + res.data.path, (before cloudinary)
          path: res.data.path,
        });

        //const path = res.data.path;
      })
      .catch((err) => console.log(err));
  };

  // MULTI: storing the recived file from backend
  const [previews, setPreviews] = useState([]);
  const [file, setFile] = useState([]); // storing the uploaded files
  const [uploaderror, setUploaderror] = useState();
  const imgmax = 5;
  const [pathurl, setPathurl] = useState([]);
  const [progress, setProgess] = useState(0); // progess bar
  const el = useRef(); // accessing input element
  const [productimgs, setProductimgs] = useState([]);
  const [imgavailable, setImgavailable] = useState(5);
  const [array] = useState([]);
  
  const deleteImg = async (id) =>{
    try {
      const deleteImage = await fetch(
        `http://localhost:8080/api/productimgs/${id}`, { method: "DELETE"}
      );
        setProductimgs(productimgs.filter((productimg) => productimg.id !== id));
        console.log(deleteImage);
    } catch(err){
      console.error(err.message);
    }
  }

  const deleteImgUpload = async (index) =>{
    try {
        setPathurl(pathurl.filter((path) => path !== index));
        setFile(file.filter((name) => name !== index));
        console.log(previews);
        const resultat = imgavailable + 1;
        setImgavailable(resultat);

    } catch(err){
      console.error(err.message);
    }
  }
  
  useEffect(() => {
    const getProductimgs = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/productimgs/product_id/${product.id}`
        );
        const jsonData = await response.json();

        setProductimgs(jsonData);
      
      } catch (err) {
        console.error(err.message);
      }
      
    
    };
    
    getProductimgs();
  }, [product.id]);

  
  useEffect(()=>{
    const resultat = imgmax - productimgs.length; 
    setImgavailable(resultat);
  }, [productimgs]);
  
  const handleChange = (e) => {
    const files = e.target.files; // accesing file

    if(files.length > 5){
      setUploaderror("Cannot exceed 5!");
    }else{

      setUploaderror();

      setProgess(0);

    console.log(files);
    if(files.length <= imgavailable){
       // storing file

      if (!e.target.files) {
        setPreviews({
          file: null,
        });
      } else {
        //const array = [];
        
        for (let i = 0; i < files.length; i++) {
          //previews.push(files[i]);
          //array.push(files[i]);
          previews.push(URL.createObjectURL(files[i]));
          file.push(files[i]);
          
        }
        console.log(imgmax);
        console.log(files.length);
        const resultat = imgavailable - files.length;
        setImgavailable(resultat);
      }
    }else{
      setUploaderror("Cannot exceed 5!");
    }
    }
  };

  const uploadFile = () => {
    console.log(file);
    const formData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formData.append("file", file[i]);
    }
    console.log(formData);
    //formData.append('file', file); // appending file
    axios
      .post("http://localhost:8080/multiuploads", formData, {
        onUploadProgress: (ProgressEvent) => {
          let progress = Math.round(
            (ProgressEvent.loaded / ProgressEvent.total) * 100
          );
          setProgess(progress);
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        console.log(res.data.data.length);
        for (let i = 0; i < res.data.data.length; i++) {
          //console.log("res.data[i].url");
          array.push(res.data.data[i].url);
        }
        setPathurl(array);
        setPreviews([]);
        /*  
          
          if(!res.data){
          setDatas({
                file: null
            })
        }else{
         
         for (let i = 0; i < res.data.length; i++) {
             //previews.push(files[i]);
             //array.push(files[i]);
             datas.push(res.data[i]);    
         }
         //console.log(previews);

         
        }*/
        //getFile({ name: res.data.name,
        //       path: 'http://localhost:8080' + res.data.path
        //   });

        //const path = res.data.path;
      })
      .catch((err) => console.log(err));
  };

  // Update product function
  const UpdateProduct = async (e) => {
    console.log(solodata.path);
    if (solodata.path === "") {
      const image = product.image;
      e.preventDefault();
      try {
        const body = {
          description,
          name,
          vendor,
          image,
          price,
          status,
          category,
          quantity,
        };
        const response = await fetch(
          `http://localhost:8080/api/products/${product.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );

        window.location = "";
        console.log(response);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      const image = solodata.path;
      console.log(image);
      e.preventDefault();
      try {
        const body = {
          description,
          name,
          vendor,
          image,
          price,
          status,
          category,
          quantity,
        };
        const response = await fetch(
          `http://localhost:8080/api/products/${product.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );

        window.location = "";
        console.log(response);
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  // Update product function
  const CreateProductimg = async (e) => {
    e.preventDefault();
    if (pathurl) {
      for (let i = 0; i < pathurl.length; i++) {
        const path = pathurl[i];
        console.log(path);
        try {
          const body = { path, vendor_id, product_id };
          const response = await fetch(
            "http://localhost:8080/api/productimgs",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            }
          );

          //window.location="";
          console.log(response);
        } catch (err) {
          console.error(err.message);
        }
        /*
                
                */
      }
    }
  };

  /*
   
    */
  let soloimgPreview;
  if (solopreview) {
    soloimgPreview = <img src={solopreview.file} alt="" />;
  };

  let imgPreview;
  if (previews) {
    for (let i = 0; i < previews.length; i++) {
      imgPreview = previews.map((index) => (
        <div key={index}>
          <img src={index} alt=""></img>
        </div>
      ));
    }
    //imgPreview = <img src={previews.file}></img>;
    //console.log(previews);
  };

  let galeriePreview;
  if (pathurl) {
    for (let i = 0; i < pathurl.length; i++) {
      galeriePreview = pathurl.map((index) => (
        <div className="galeryItem" key={index} style={{ position: "relative" ,maxWidth: "130px", margin: "5px"}}>
                    <button
                      className="tinyDeleteButton"
                      onClick={() => deleteImgUpload(index)}
                      style={{ position: "absolute", right:"0"}}
                    ><i className="far fa-trash-alt"></i>
                    </button>
                    <img
                      src={index}
                      className="galeryImage"
                      alt=""
                      style={{ maxWidth: "130px", height: "auto", border: "1px solid rgb(189, 184, 184)" }}
                    />
                  </div>
      ));
    }
  }

  /*let pathPreview;
   if (pathurl) {
       console.log(pathurl);
       for (let i = 0; i < pathurl.length; i++) {
       pathPreview = pathurl.map(index=>(<div key={index}><img src={index} alt=""></img></div>));
        }
   //datasPreview = <p>{datas}</p>;
   
}*/

  return (
    <Fragment>
      <button
        type="button"
        id="miniEditButton"
        data-toggle="modal"
        data-target={`#Edit-id${product.id}`}
      >
        <i className="far fa-edit"></i> <p>Edit</p>
      </button>

      <div className="modal" id={`Edit-id${product.id}`}>
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-name">Edit Product</h4>
              <button
                type="button"
                id="closeButton"
                data-dismiss="modal"
                onClick={() => {
                  setDescription(product.description);
                  setName(product.name);
                  setPrice(product.price);
                  setStatus(product.status);
                  setVendor(product.vendor);
                  setQuantity(product.quantity);
                }}
              >
                <i className="far fa-times-circle"></i>
              </button>
            </div>

            <div className="modal-body">
              <div className="uploadContainer">
                <p style={{ textAlign: "center" }}>
                  Change your product image:
                </p>
                {/*
                        <div className="form-group preview">
                            {imgPreview}
                        </div>

                        <div className="form-group">
                            <input type="file" className="form-control" onChange={uploadSingleFile} />
                        </div>
                        
                        */}

                <div className="file-upload">
                  <input
                    type="file"
                    name="file"
                    ref={soloel}
                    multiple
                    onChange={soloHandleChange}
                    className="inputImage"
                  />
                  <p
                    style={{ width: `${soloprogress}%` }}
                    data-value={soloprogress}
                  ></p>

                  {/* displaying received image*/}
                  <progress
                    max="100"
                    value={soloprogress}
                    className="imageProgressBar"
                  >
                    <div className="progress-bar">
                      <span style={{ width: `${soloprogress}%` }}>
                        {soloprogress}
                      </span>
                    </div>
                  </progress>
                  <div className="form-group preview">
                    {soloimgPreview}

                    {/*
                                            previews &&
                                            previews.map((file, index) => (
                                                <li className="list-group-item" key={index}>
                                                {file.name}
                                                </li>
                                            ))
                                        */}
                    {/*data.path && <img src={data.path} alt={data.name} />*/}
                  </div>
                </div>
                <button id="uploadButton" onClick={soloUploadFile}>
                  <i className="fas fa-upload"></i>
                  <p>Upload</p>
                </button>
              </div>
              
              <div className="uploadContainer" style={{ marginTop: "20px" }}>
                <p style={{ textAlign: "center" }}>
                  Add more images for your product (max:5!)
                </p>
                {/*
                                    <div className="form-group preview">
                                        {imgPreview}
                                    </div>

                                    <div className="form-group">
                                        <input type="file" className="form-control" onChange={uploadSingleFile} />
                                    </div>
                                    
                                    */}
                <div className="file-upload">
                  <p>Your product galery</p>
                  <div className="productGalery" style={{ width: "100%", backgroundColor: " #414141", display: "flex", flexDirection: "row", flexWrap: "wrap", border: "1px solid rgb(189, 184, 184)", marginBottom: "10px", justifyContent: "center"}}>
                {productimgs.map((productimg) => (
                  <div className="galeryItem" key={productimg.id} style={{ position: "relative" ,maxWidth: "130px", margin: "5px"}}>
                    <button
                      className="tinyDeleteButton"
                      onClick={() => deleteImg(productimg.id)}
                      style={{ position: "absolute", right:"0"}}
                    ><i className="far fa-trash-alt"></i>
                    </button>
                    <img
                      src={productimg.path}
                      className="galeryImage"
                      alt=""
                      style={{ maxWidth: "130px", height: "auto", border: "1px solid rgb(189, 184, 184)" }}
                    />
                  </div>
              ))}{galeriePreview}
                </div>
                  <input
                    type="file"
                    name="file"
                    ref={el}
                    multiple
                    onChange={handleChange}
                    className="inputImage"
                  />
                    
                    {imgavailable === 0 && (<small id="emailHelp" className="form-text text-muted">Your product galery is<span style={{color: "red"}}> full</span>.</small>)}
                    {imgavailable === 1 && (<small id="emailHelp" className="form-text text-muted"><span style={{color: "blue"}}>{imgavailable}</span> image left</small>)}
                    {imgavailable > 1 && (<small id="emailHelp" className="form-text text-muted"><span style={{color: "blue"}}>{imgavailable}</span> images available</small>)}
                  {uploaderror && <div className="alert alert-danger" role="alert">{uploaderror}</div>}
                  <p
                    style={{ width: `${progress}%` }}
                    data-value={progress}
                  ></p>
                  {/* displaying received image*/}
                  <progress
                    max="100"
                    value={progress}
                    className="imageProgressBar"
                  >
                    <div className="progress-bar">
                      <span style={{ width: `${progress}%` }}>{progress}</span>
                    </div>
                  </progress>
                  <div className="form-group preview">
                    {imgPreview}
                    {/*{pathPreview}
                                        previews &&
                                        previews.map((file, index) => (
                                            <li className="list-group-item" key={index}>
                                            {file.name}
                                            </li>
                                        ))*/}
                    {/*data.path && <img src={data.path} alt={data.name} />*/}
                  </div>
                </div>

                <button id="uploadButton" onClick={uploadFile}>
                  <i className="fas fa-upload"></i>
                  <p>Upload</p>
                </button>
              </div>

              <form className="mt-2">
                <div className="form-row">
                  <div className="form-group col-md-4">
                    <div className="input-group ">
                      <div className="input-group-prepend">
                        <span className="input-group-text">Name:</span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      ></input>
                    </div>
                  </div>

                  <div className="form-group col-md-4">
                    <div className="input-group ">
                      <div className="input-group-prepend">
                        <span className="input-group-text">Vendor:</span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        value={vendor}
                        onChange={(e) => setVendor(e.target.value)}
                      ></input>
                    </div>
                  </div>

                  <div className="form-group col-md-4">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">Quantity</span>
                      </div>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                {/*<label className="mt-2">Product Description</label>        
                            <textarea className="form-control" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                            */}
                <div className="editor">
                  <CKEditor
                    editor={InlineEditor}
                    data={description}
                    config={{
                      extraPlugins: [CustomUpload],
                    }}
                    onReady={(editor) => {
                      // You can store the "editor" and use when it is needed.
                      console.log("Editor is ready to use!", editor);
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setDescription(data);
                      console.log(event, editor, data);
                    }}
                    onBlur={(event, editor) => {
                      console.log("Blur.", editor);
                    }}
                    onFocus={(event, editor) => {
                      console.log("Focus.", editor);
                    }}
                  />
                </div>
                <div className="form-row mt-3">
                  <div className="form-group col-md-4">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">€</span>
                      </div>
                      <input
                        type="number"
                        min="0.00"
                        step="0.05"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-4">
                    <div className="input-group ">
                      <div className="input-group-prepend">
                        <span className="input-group-text">Status:</span>
                      </div>
                      <select
                        className="form-control"
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        {status === true && (
                          <option value="true">On Sale</option>
                        )}
                        {status !== false && (
                          <option value="false">Waiting</option>
                        )}
                        {status === false && (
                          <option value="false">Waiting</option>
                        )}
                        {status !== true && (
                          <option value="true">On sale</option>
                        )}
                      </select>
                    </div>
                  </div>

                  <div className="form-group col-md-4">
                    <div className="input-group ">
                      <div className="input-group-prepend">
                        <span className="input-group-text">Category:</span>
                      </div>
                      <select
                        className="form-control"
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value={category}>{category}</option>
                        {category !== "Cosmetic" && (<option>Cosmetic</option>)}
                        {category !== "Fashion" && (<option>Fashion</option>)}
                        {category !== "PC" && (<option>PC</option>)}
                        {category !== "Estate" && (<option>Estate</option>)}
                        {category !== "Services" && (<option>Services</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                id="editButton"
                data-dismiss="modal"
                onClick={(e) => {
                  UpdateProduct(e);
                  CreateProductimg(e);
                }}
              >
                <i className="far fa-edit"></i>
                <p>Edit</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditProduct;
