import React, { useCallback } from "react";
import DropArea from "../DropArea/DropArea";
import "./NewItem.css";

function NewItem(props) {
  return (
    <section className={props.name}>
      <div>
        <span>Item: </span>
        <input name="name" />
      </div>
      <div>
        <span>Price: </span>
        <input name="price" type="number" />
      </div>
      <div>
        <span>Notes: </span>
        <input name="notes" type="textbox" />
      </div>
      <div>{/* <DropArea /> */}</div>
      <div>
        <span>Link: </span>
        <input name="link" />
      </div>
    </section>
  );
}

export default NewItem;
