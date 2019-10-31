import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Nav from "../Nav/Nav";
import DropArea from "../DropArea/DropArea";
import axios from "axios";
import default_icon from "./icons/default_icon.png";
import "./ItemPage.css";

function ItemPage(props) {
  const [edit, changeEdit] = useState(false);
  const [name, changeName] = useState("");
  const [price, changePrice] = useState(0);
  const [creatorEmail, changeEmail] = useState("");
  const [creatorId, changeId] = useState(1);
  const [notes, changeNotes] = useState("");
  const [image, changeImage] = useState("");
  const [link, changeLink] = useState("");

  const toggleEdit = () => {
    console.log(props.user_id, creatorId);
    if (props.user_id === creatorId) {
      changeEdit(!edit);
    } else {
      alert("The user logged in is not the creator of this item");
    }
  };

  const editItem = () => {};

  const getImage = url => {
    changeImage(url);
  };
  useEffect(() => {
    axios
      .get(`/api/item/${props.match.params.itemid}`)
      .then(res => {
        let { name, price, email, notes, image, link, creator_id } = res.data;

        changeName(name);
        changePrice(price);
        changeEmail(email);
        changeNotes(notes);
        changeImage(image);
        changeLink(link);
        changeId(creator_id);
        console.log(creatorId);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <section>
      <Nav />
      {edit ? (
        <>
          <DropArea getImage={getImage} />
          <article className="itemPage">
            <input className="editInput" name="name" />
            <input className="editInput" name="price" type="number" />

            {creatorEmail ? <p>{`Creator: ${creatorEmail}`}</p> : null}
            <input className="editInput" name="notes" />
            <div>
              {" "}
              <p>Drag and drop new picture onto old one to replace</p>
              <img
                alt="item"
                className="largeItemImage"
                src={image ? image : default_icon}
              />
            </div>
            <input className="editInput" name="link" />
          </article>
        </>
      ) : (
        <article className="itemPage">
          {name ? <h1>{name}</h1> : null}
          {price ? <p>{`$${price}`}</p> : null}
          {creatorEmail ? <p>{`Creator: ${creatorEmail}`}</p> : null}
          {notes ? <p>{`Notes: ${notes}`}</p> : null}
          <img
            alt="item"
            className="largeItemImage"
            src={image ? image : default_icon}
          />
          {link ? <p>{`Link:${link}`}</p> : null}
        </article>
      )}
      <div className="buttons editInput">
        <button className="editInput" onClick={() => toggleEdit()}>
          {edit ? "Cancel" : "Edit"}
        </button>
        <button className="editInput">Delete</button>
      </div>
    </section>
  );
}

const mapStateToProps = reduxState => {
  const { user_id } = reduxState;
  return { user_id };
};

export default connect(mapStateToProps)(ItemPage);
