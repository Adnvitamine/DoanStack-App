import React, { Fragment, useState, useRef } from "react";
import axios from "axios";
//import ReactQuill, {Quill} from 'react-quill';
import QuillEditor from "../editor/QuillEditor";
//import CKEditor from '@ckeditor/ckeditor5-react';
//import InlineEditor from '@ckeditor/ckeditor5-build-inline';
//import CustomUpload from '../../js/CustomUploader';
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

//const sanitizeHtml = require('sanitize-html');

const QuillEdit = ({ product }) => {
  const [product_id] = useState(product.id);
  const [description, setDescription] = useState(product.description);
  const [name, setName] = useState(product.name);
  const [vendor, setVendor] = useState(product.vendor);
  const [vendor_id] = useState(product.vendor_id);
  const [status, setStatus] = useState(product.status);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState();

  // SOLO: Uploaded Solo File
  const [solofile, setSoloFile] = useState();
  const [solopreview, setSoloPreview] = useState("");
  const [solodata, getSoloFile] = useState({ name: "", path: "" });
  const [soloprogress, setSoloProgress] = useState(0);
  const soloel = useRef();

  const onEditorChange = (value) => {
    setDescription(value);
  };

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
  const [file, setFile] = useState(); // storing the uploaded files
  const [pathurl, setPathurl] = useState([]);
  const [progress, setProgess] = useState(0); // progess bar
  const el = useRef(); // accessing input element

  const handleChange = (e) => {
    setProgess(0);
    const files = e.target.files; // accesing file
    setFile(e.target.files); // storing file

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
      }
    }
  };

  const uploadFile = () => {
    const formData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formData.append("file", file[i]);
    }
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
        const array = [];
        for (let i = 0; i < res.data.data.length; i++) {
          //array.push("http://localhost:8080/" + res.data[i].filename);
          array.push(res.data.data[i].url);
        }
        setPathurl(array);
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
        };
        const response = await fetch(
          `http://localhost:8080/api/products/${product.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );
        console.log(response);
        window.location = "";
      } catch (err) {
        console.error(err.message);
      }
    } else {
      const image = solodata.path;
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
        };
        const response = await fetch(
          `http://localhost:8080/api/products/${product.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );
        console.log(response);
        window.location = "";
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
          console.log(response);
          //window.location="";
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
    soloimgPreview = (
      <img
        src={solopreview.file}
        alt="soloimgPreview"
        className="soloimgPreview"
        style={{ width: "100%" }}
      />
    );
  }

  let imgPreview;
  if (previews) {
    for (let i = 0; i < previews.length; i++) {
      imgPreview = previews.map((index) => (
        <div key={index}>
          <img
            src={index}
            alt="imgsPreview"
            className="imgsPreview"
            style={{ width: "100%" }}
          ></img>
        </div>
      ));
    }
    //imgPreview = <img src={previews.file}></img>;
    //console.log(previews);
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
        data-target={`#EditQuill-id${product.id}`}
      >
        <i className="far fa-edit"></i> <p>Edit Quill</p>
      </button>

      <div className="modal" id={`EditQuill-id${product.id}`}>
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
                  <input
                    type="file"
                    name="file"
                    ref={el}
                    multiple
                    onChange={handleChange}
                    className="inputImage"
                  />
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
                  <div className="form-group col-md-6">
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

                  <div className="form-group col-md-6">
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
                </div>
                {/*<label className="mt-2">Product Description</label>        
                            <textarea className="form-control" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                            */}
                <QuillEditor
                  toolbarId={`toolbar${product_id}`}
                  value={description}
                  onEditorChange={onEditorChange}
                />

                <div className="form-row mt-3">
                  <div className="form-group col-md-4">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">$</span>
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
                        <span className="input-group-text">Categpry:</span>
                      </div>
                      <select
                        className="form-control"
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="others">Choose..</option>
                        <option>Cosmetic</option>
                        <option>Fashion</option>
                        <option>PC</option>
                        <option>Estate</option>
                        <option>Services</option>
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

export default QuillEdit;
