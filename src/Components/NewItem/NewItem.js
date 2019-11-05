import React, { useState, useEffect } from "react";
import FormData from "form-data";
import axios from "axios";
import DropArea from "../DropArea/DropArea";
import "./NewItem.css";
import default_icon from "./icons/default_icon.png";

function NewItem(props) {
  const [name, changeName] = useState("");
  const [price, changePrice] = useState("");
  const [notes, changeNotes] = useState("");
  const [previewImage, changeImage] = useState(`${default_icon}`);
  const [imageKey, changeKey] = useState("");
  const [link, changeLink] = useState("");
  const fileInput = React.createRef();

  useEffect(() => {
    cloudImage();
  }, [imageKey]);

  const cloudImage = () => {
    // axios
    //   .post(`/api/photo/`, { data: imageKey })
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));
    changeImage(
      `https://listodevmountain.s3-us-west-1.amazonaws.com/${imageKey}`
    );
  };

  // const dropImage = url => {
  //   const uploadedFile = url;
  //   let data = new FormData();
  //   console.log(uploadedFile);
  //   data.append("file", uploadedFile);
  //   axios
  //     .post("/api/photo/addURL", data, {
  //       headers: {
  //         "Content-Type": `multipart/form-data; boundary=${data._boundary}`
  //       }
  //     })
  //     .then(res => {
  //       changeKey(res.data);
  //       cloudImage();
  //     })
  //     .catch(err => console.log(`front end: ${err}`));
  // };

  // const fileUpload = () => {
  //   const uploadedFile = fileInput.current.files[0];
  //   let data = new FormData();
  //   // console.log(uploadedFile);
  //   data.append("file", uploadedFile);
  //   axios
  //     .post("/api/photo/add", data, {
  //       headers: {
  //         "Content-Type": `multipart/form-data; boundary=${data._boundary}`
  //       }
  //     })
  //     .then(res => {
  //       console.log(res.data);
  //       changeKey(res.data);
  //       cloudImage();
  //     });
  // };

  const handleAddItem = () => {
    // fileUpload();
    const item = {
      list_id: props.listId,
      added_by_id: props.userId,
      name,
      price,
      image: imageKey,
      notes,
      link
    };

    axios.post("/api/item/add", item).then(() => {
      props.toggleAddItem();
    });
  };

  return (
    <>
      <section className={props.name}>
        <p className="exit" onClick={props.toggleAddItem}>
          X
        </p>
        <div className="newItemInput">
          <span>Item: </span>
          <input
            name="name"
            value={name}
            onChange={e => changeName(e.target.value)}
          />
        </div>
        <div className="newItemInput">
          <span>Price: </span>
          <input
            name="price"
            type="number"
            value={price}
            onChange={e => changePrice(e.target.value)}
          />
        </div>

        <div className="newItemInput">
          <span>Notes: </span>
          <input
            name="notes"
            type="textarea"
            value={notes}
            onChange={e => changeNotes(e.target.value)}
          />
        </div>

        <input
          className="newItemInput"
          name="imgUpload"
          type="file"
          ref={fileInput}
          // onChange={fileUpload}
        />
        <div>
          <p>Drag and drop image onto screen</p>
          <img alt="preview" className="preview" src={previewImage} />
        </div>
        <div className="newItemInput">
          <span>Link: </span>
          <input
            name="link"
            value={link}
            onChange={e => changeLink(e.target.value)}
          />
        </div>
        <button className="newItemInput" onClick={handleAddItem}>
          Add Item to List
        </button>
      </section>
    </>
  );
}

export default NewItem;
