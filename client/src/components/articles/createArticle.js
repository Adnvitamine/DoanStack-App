import React, { Fragment, useState, useRef } from "react";
import axios from "axios";
import CKEditor from "@ckeditor/ckeditor5-react";
import InlineEditor from "@ckeditor/ckeditor5-build-inline";
//import InlineEditor from "@ckeditor/ckeditor5-build-inline";
import CustomUpload from "../../js/CustomUploader";
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

//import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';
//import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock';

const sanitizeHtml = require("sanitize-html");

const CreateArticle = ({ currentUser }) => {
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState(`${currentUser.username}`);
  const [author_id, setAuthor_id] = useState(`${currentUser.id}`);
  const [author_avatar, setAuthor_avatar] = useState(`${currentUser.avatar}`);
  const [image, setImage] = useState("");
  const [content, setContent] = useState();
  const [category, setCategory] = useState("Others");
  const [published, setPublished] = useState();
  const [alert, setAlert] = useState();

  const [file, setFile] = useState(""); // storing the uploaded file

  // storing the recived file from backend
  const [data, getFile] = useState({ name: "", path: "" });
  const [progress, setProgess] = useState(0); // progess bar
  const el = useRef(); // accessing input element

  const handleChange = (e) => {
    setProgess(0);
    const file = e.target.files[0]; // accesing file

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
    for (var value of formData.values()) {
      console.log(value);
    }
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
          // path: "http://localhost:8080" + res.data.path, (before Cloudinary)
          path: res.data.path,
        });
        console.log(data);
        //const path = res.data.path;
      })
      .catch((err) => console.log(err));
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        title,
        author,
        author_id,
        author_avatar,
        image,
        content,
        category,
        published,
      };
      const response = await fetch("http://localhost:8080/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then((res) => res.clone().json());
      if (response.status === "400") {
        setAlert(response.message);
      } else {
        window.location = "";
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  let imgPreview;
  if (image) {
    imgPreview = <img src={image.file} alt="" />;
  }

  return (
    <Fragment>
      <div className="container text-center mt-5" id="articleCreate">
        <div className="ComponentTitle">
          <div>
            {" "}
            <h1>Add a new article</h1>
          </div>
        </div>
        <div className="form-row">
          <div className="uploadContainer">
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
            <div className="form-group col-md-6">
              <div className="input-group ">
                <div className="input-group-prepend">
                  <span className="input-group-text">Title:</span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Article Title..."
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
              </div>
            </div>

            <div className="form-group col-md-6">
              <div className="input-group ">
                <div className="input-group-prepend">
                  <span className="input-group-text">Author:</span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder={author}
                  onChange={(e) => setAuthor(e.target.value)}
                ></input>
              </div>
              <input
                type="hidden"
                className="form-control"
                placeholder={author_id}
                onChange={(e) => setAuthor_id(e.target.value)}
              ></input>
              <input
                type="hidden"
                className="form-control"
                placeholder={author_avatar}
                onChange={(e) => setAuthor_avatar(e.target.value)}
              ></input>
            </div>
          </div>

          {/* <textarea className="form-control mt-3" placeholder={description} onChange={e => setDescription(e.target.value)}></textarea>*/}
          <div className="editor">
            {/*config={ {
                   
                   toolbar: ['heading', '|', 'bold', 'italic', '|', 'undo', 'redo', '|', 'mediaEmbed' ]
               } }*/}
            <CKEditor
              editor={InlineEditor}
              data="<p>Write something here..</p>"
              config={{
                extraPlugins: [CustomUpload],
              }}
              onInit={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                console.log(event);

                /*editor.execute( 'imageInsert', {
                            source:  [
                                'path/to/image.jpg',
                                'path/to/other-image.jpg'
                            ]
                        } );*/
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
                setContent(data);

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
            <div className="form-group col-md-6">
              <div className="input-group ">
                <div className="input-group-prepend">
                  <span className="input-group-text">Publish:</span>
                </div>
                <select
                  id="selectStatus"
                  className="form-control"
                  onChange={(e) => setPublished(e.target.value)}
                >
                  <option value="false">Waiting</option>
                  <option value="true">Online</option>
                </select>
              </div>
            </div>
            <div className="form-group col-md-6">
              <div className="input-group ">
                <div className="input-group-prepend">
                  <span className="input-group-text">Category:</span>
                </div>
                <select
                  id="selectCat"
                  className="form-control"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Others</option>
                  <option>News</option>
                  <option>BackEnd</option>
                  <option>FrontEnd</option>
                  <option>Life</option>
                </select>
              </div>
            </div>
          </div>
          <div className="wrap">
            <button id="createButton" onClick={(e) => setImage(data.path)}>
              <i className="fas fa-plus"></i>
              <p>POST</p>
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default CreateArticle;
