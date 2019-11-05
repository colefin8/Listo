import React, { useState } from "react";
import axios from "axios";
import { v4 as randomString } from "uuid";

const NewItem2 = () => {
  const [isUploading, changeUploading] = useState(false);
  const [url, changeURL] = useState("http://via.placeholder.com/450x450");

  const getSignedRequest = ([file]) => {
    console.log(file);
    changeUploading(true);
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
        changeUploading(false);
        changeURL(url);
        console.log(res.data);
      })
      .catch(err => {
        changeUploading(false);
        console.log(
          `ERROR: forbidden bc of some weird permissions thing \n${err}`
        );
      });
  };

  return (
    <div>
      <div>gotta put a drop zone here</div>
    </div>
  );
};

export default NewItem2;
