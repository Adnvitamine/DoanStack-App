import React, { Fragment, useState, useRef } from "react";
import axios from "axios";

const EditUser = ({ currentUser }) => {
  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState(currentUser.password);
  const [avatar, setAvatar] = useState();
  const [preview, setPreview] = useState();

  // UploadAvatar
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
      setPreview({
        file: null,
      });
    } else {
      setPreview({
        file: URL.createObjectURL(e.target.files[0]),
      });
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
          name: res.data.filename,
          // path: "http://localhost:8080" + res.data.path, (before cloudinary)
          path: res.data.path,
        });
        //setAvatar(data.path);

        //const path = res.data.path;
      })
      .catch((err) => console.log(err));
  };

  // Update user function
  const UpdateUser = async (e) => {
    e.preventDefault();
    try {
      const body = { username, email, password, avatar };
      const response = await fetch(
        `http://localhost:8080/api/user/${currentUser.id}`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      window.location = "";
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  // TRES TRES IMPORTANT
  let imgPreview;
  if (preview) {
    imgPreview = (
      <img
        src={preview.file}
        alt="profile-img"
        className="profile-img-card"
        style={{ marginTop: "20px", marginBottom: "0px" }}
      />
    );
  }

  return (
    <Fragment>
      <div id="userEdit">
        <div className="ComponentTitle">
          <div>
            <h1>Edit your profile</h1>
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
                style= {{ overflow: `hidden`}}
              />
              <p style={{ width: `${progress}%` }} data-value={progress}></p>

              {/* displaying received image*/}
              <progress max="100" value={progress} className="imageProgressBar">
                <div className="progress-bar">
                  <span style={{ width: `${progress}%` }}>{progress}</span>
                </div>
              </progress>
              <div className="form-group profile">
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

        <div className="editUserForm" onSubmit={UpdateUser}>
          <form className="mt-2 text-center">
            <div className="form-row">
              <div className="form-group col-md-12">
                <div className="input-group ">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Username:</span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={currentUser.username}
                    onChange={(e) => setUsername(e.target.value)}
                  ></input>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-12">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Email:</span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={currentUser.email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-12">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Password:</span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="New Password"
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </div>
              </div>
            </div>
            {/*<div className="form-group">
                                    <label>Old password:</label>
                                    <input type="text" className="form-control" placeholder="Old password" onChange={e=> setOldPassword(e.target.value)}></input>
                            </div>*/}

            <div className="wrap">
              <button id="createButton" onClick={(e) => setAvatar(data.path)}>
                <i className="fas fa-plus"></i>
                <p>Save Profile</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default EditUser;
