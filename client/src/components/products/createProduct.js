import React, { Fragment, useState, useRef } from "react";
import axios from "axios";
import CKEditor from "@ckeditor/ckeditor5-react";
import InlineEditor from "@ckeditor/ckeditor5-build-inline";
//import InlineEditor from "@ckeditor/ckeditor5-build-inline";
import CustomUpload from "../../js/CustomUploader";
//import SingleImageUploadComponent from '../single-imgUpload.component';
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
const sanitizeHtml = require("sanitize-html");

const CreateProduct = ({ currentUser }) => {
  const [name, setName] = useState();
  const [vendor_id, setVendor_id] = useState(`${currentUser.id}`);
  const [vendor, setVendor] = useState(`${currentUser.username}`);
  const [vendor_avatar, setVendor_avatar] = useState(`${currentUser.avatar}`);
  const [description, setDescription] = useState();
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("0.00");
  const [quantity, setQuantity] = useState("0");
  const [category, setCategory] = useState("Others");
  const [status, setStatus] = useState();

  const [alert, setAlert] = useState();

  const [file, setFile] = useState(""); // storing the uploaded file

  // storing the recived file from backend
  const [data, getFile] = useState({ name: "", path: "" });
  const [progress, setProgess] = useState(0); // progess bar
  const el = useRef(); // accessing input element

  const handleChange = (e) => {
    setProgess(0);
    const file = e.target.files[0]; // accesing file
    console.log(file);
    setFile(file); // storing file
    if (!e.target.files[0]) {
      setImage({
        file: null,
      });
    } else {
      setImage({
        file: URL.createObjectURL(e.target.files[0]),
      });
      //console.log(image);
    }
  };

  const uploadFile = () => {
    const formData = new FormData();
    formData.append("file", file); // appending file
    axios
      .post("http://localhost:8080/upload", formData, {
        onUploadProgress: (ProgressEvent) => {
          let progress = Math.round(
            (ProgressEvent.loaded / ProgressEvent.total) * 100
          );
          setProgess(progress);
        },
      })
      .then((res) => {
        console.log(res);
        getFile({
          name: res.data.name,
          // path: "http://localhost:8080" + res.data.path, (before cloudinary)
          path: res.data.path,
        });

        //const path = res.data.path;
      })
      .catch((err) => console.log(err));
  };

  /*
        
        const uploadSingleFile = async e => {
        


        if(!e.target.files[0]){
            setImage({
                file: null
            })
        }else{

            setImage({
                file: URL.createObjectURL(e.target.files[0])
            })

        }
        

    }
         let imgPreview;
        if (image) {
            imgPreview = <img src={image.file} alt='' />;
        }
        
        */

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        name,
        vendor,
        vendor_id,
        vendor_avatar,
        description,
        price,
        quantity,
        status,
        category,
        image,
      };
      const response = await fetch("http://localhost:8080/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then((res) => res.clone().json());
      if (response.status === "400") {
        setAlert(response.message);
      } else {
        window.location = "";
      }
    } catch (error) {
      console.log(error);
    }
  };
  // TRES TRES IMPORTANT
  let imgPreview;
  if (image) {
    imgPreview = <img src={image.file} alt="" />;
  }

  return (
    <Fragment>
      <div className="container text-center mt-5" id="productCreate">
        <div className="ComponentTitle">
          <div>
            <h1>Add a new product</h1>
          </div>
        </div>
        <div className="form-row">
          <div className="uploadContainer">
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
                ref={el}
                onChange={handleChange}
                className="inputImage"
              />
              <p style={{ width: `${progress}%` }} data-value={progress}></p>

              {/* displaying received image*/}
              <progress max="100" value={progress} className="imageProgressBar">
                <div className="progress-bar">
                  <span style={{ width: `${progress}%` }}>{progress}</span>
                </div>
              </progress>
              <div className="form-group preview">
                {imgPreview}
                {/*data.path && <img src={data.path} alt={data.name} />*/}
              </div>
            </div>

            <button id="uploadButton" onClick={uploadFile}>
              <i className="fas fa-upload"></i>
              <p>Upload</p>
            </button>
          </div>
        </div>

        <form
          className="mt-5"
          style={{ maxWidth: "780px", margin: "auto" }}
          onSubmit={onSubmitForm}
        >
          <div id="AlertMessage">{alert && <p>Error: {alert}</p>}</div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <div className="input-group ">
                <div className="input-group-prepend">
                  <span className="input-group-text">Name:</span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Product Name.."
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
                  placeholder={vendor}
                  onChange={(e) => setVendor(e.target.value)}
                ></input>
                <input
                  type="hidden"
                  className="form-control"
                  placeholder={vendor_id}
                  onChange={(e) => setVendor_id(e.target.value)}
                ></input>
                <input
                  type="hidden"
                  className="form-control"
                  placeholder={vendor_avatar}
                  onChange={(e) => setVendor_avatar(e.target.value)}
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

          {/* <textarea className="form-control mt-3" placeholder={description} onChange={e => setDescription(e.target.value)}></textarea>*/}
          <div className="editor">
            {/*config={ {
                   
                   toolbar: ['heading', '|', 'bold', 'italic', '|', 'undo', 'redo', '|', 'mediaEmbed' ]
               } }*/}
            <CKEditor
              editor={InlineEditor}
              data="<p>Write a description for you product..</p>"
              config={{
                extraPlugins: [CustomUpload],
              }}
              onInit={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                const dataparse = sanitizeHtml(data, {
                  allowedTags: [
                    "h3",
                    "h4",
                    "h5",
                    "h6",
                    "blockquote",
                    "p",
                    "a",
                    "ul",
                    "ol",
                    "nl",
                    "li",
                    "b",
                    "i",
                    "strong",
                    "em",
                    "strike",
                    "code",
                    "hr",
                    "br",
                    "div",
                    "table",
                    "thead",
                    "caption",
                    "tbody",
                    "tr",
                    "th",
                    "td",
                    "pre",
                    "figure",
                    "oembed",
                    "img",
                  ],
                  allowedAttributes: {
                    a: ["href", "name", "target"],
                    figure: ["class"],
                    oembed: ["url"],
                    // We don't currently allow img itself by default, but this
                    // would make sense if we did
                    img: ["src"],
                  },
                  // Lots of these won't come up by default because we don't allow them
                  selfClosing: [
                    "br",
                    "hr",
                    "area",
                    "base",
                    "basefont",
                    "input",
                    "link",
                    "meta",
                  ],
                  // URL schemes we permit
                  allowedSchemes: ["http", "https", "ftp", "mailto"],
                  allowedSchemesByTag: {},
                });
                setDescription(data);
                console.log({ event, editor, data, dataparse });
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
            <div className="form-group col-md-2">
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

            <div className="form-group col-md-6">
              <div className="input-group ">
                <div className="input-group-prepend">
                  <span className="input-group-text">Status:</span>
                </div>
                <select
                  id="selectStatus"
                  className="form-control"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="false">Waiting</option>
                  <option value="true">On Sale</option>
                </select>
              </div>
            </div>
            <div className="form-group col-md-4">
              <div className="input-group ">
                <div className="input-group-prepend">
                  <span className="input-group-text">Category:</span>
                </div>
                <select
                  id="selectCat"
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
          <div className="wrap">
            <button id="createButton" onClick={(e) => setImage(data.path)}>
              <i className="fas fa-plus"></i>
              <p>ADD PRODUCT</p>
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default CreateProduct;
