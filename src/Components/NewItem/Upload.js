import React, { useState } from "react";
import axios from "axios";
import { v4 as randomString } from "uuid";
import "./NewItem.css";

const Upload = props => {
  const [url, changeURL] = useState("http://via.placeholder.com/450x450");

  const getSignedRequest = () => {
    let file = document.getElementById("file").files[0];
    console.log(file);
    const fileName = `${randomString()}-${file.name.replace(/\s/g, "-")}`;
    axios
      .get("/api/signs3", {
        params: {
          "file-name": fileName,
          "file-type": file.type
        }
      })
      .then(res => {
        const { signedRequest, url } = res.data;
        uploadFile(file, signedRequest, url);
      })
      .catch(err => console.log(err));
  };

  const uploadFile = (file, signedRequest, url) => {
    const options = {
      headers: {
        "Content-Type": file.type
      }
    };
    console.log(signedRequest, file, options);

    axios
      .put(signedRequest, file, options)
      .then(res => {
        changeURL(url);
        props.changeImage(url);
        console.log(res.data);
        console.log(url);
      })
      .catch(err => {
        console.log(
          `ERROR: forbidden bc of some weird permissions thing \n${err}`
        );
      });
  };

  return (
    <div>
      <img alt="" src={url} className="preview" />
      <input
        type="file"
        id="file"
        accept="image/png, image/jpeg"
        onChange={() => getSignedRequest()}
      />
      <label htmlFor="file" class="fileInput">
        Choose a file
      </label>
    </div>
  );
};

export default Upload;
