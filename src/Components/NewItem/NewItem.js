import React, { useState } from "react";
import axios from "axios";
import DropArea from "../DropArea/DropArea";
import "./NewItem.css";
import default_icon from "./icons/default_icon.png";

function NewItem(props) {
  const [name, changeName] = useState("");
  const [price, changePrice] = useState("");
  const [notes, changeNotes] = useState("");
  const [previewImage, changeImage] = useState(`${default_icon}`);
  const [link, changeLink] = useState("");

  const getImage = url => {
    changeImage(url);
  };

  const handleAddItem = () => {
    const item = {
      list_id: props.listId,
      added_by_id: props.userId,
      name,
      price,
      notes,
      image: previewImage,
      link
    };
    console.log(item);
    axios.post("/api/item/add", item);
  };

  return (
    <>
      <section className={props.name}>
        <DropArea getImage={getImage} />
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

        <input className="newItemInput" name="imgUpload" type="file" />

        <div>
          <p>Drag and drop image onto screen</p>
          <img alt="preview" className="preview" src={`${previewImage}`} />
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
