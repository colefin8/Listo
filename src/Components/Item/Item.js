import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./Item.css";
import axios from "axios";
import { Link } from "react-router-dom";
import defaulticon from "./icons/149092.svg";

function Item(props) {
  const [items, changeItems] = useState([]);

  const removeItem = id => {
    axios
      .delete(`/api/item/${id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    getItems();
  };

  const getItems = () => {
    axios
      .get(`/api/items/${props.listId}`)
      .then(res => {
        changeItems(res.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getItems();
  }, []);

  const mapped = items.map((e, i) => {
    return (
      <li className="listedItem" key={`item key:${i}`}>
        <h1 className="itemName">{e.name}</h1>
        <div className="info">
          <Link className="link" to={`/item/${e.item_id}`}>
            <div>{`$${e.price}`}</div>
            <div className="notes">
              <p>Notes: </p>
              <p>{e.notes}</p>
            </div>
            <img
              alt={`${e.name}`}
              src={e.image || defaulticon}
              className="itemImage"
            />
          </Link>
          <p className="removeButton" onClick={() => removeItem()}>
            X
          </p>
        </div>
      </li>
    );
  });

  props.runningTotal(
    items.reduce((a, e) => {
      return (a += e.price);
    }, 0)
  );
  return <ul>{mapped}</ul>;
}

const mapStateToProps = reduxState => {
  const { user_id } = reduxState;

  return { user_id };
};

export default connect(mapStateToProps)(Item);
