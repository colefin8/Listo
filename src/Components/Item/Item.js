import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./Item.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Item(props) {
  console.log(`Item hit! Props.listId = ${props.listId}`);

  const [items, changeItems] = useState([]);

  useEffect(() => {
    if (props.listId) {
      axios
        .get(`/api/items/${props.listId}`)
        .then(res => {
          console.log(res.data);
          changeItems(res.data);
        })
        .catch(err => console.log(err));
    }
  }, [props.listId]);

  const mapped = items.map((e, i) => {
    return (
      <Link className="link" key={`item key:${i}`} to={`/item/${e.item_id}`}>
        <li className="listedItem">
          <h1 className="itemName">{e.name}</h1>
          <div className="info">
            <div>{`$${e.price}`}</div>
            <div>
              <p>Notes: </p>
              {e.notes}
            </div>
            <img alt={`${e.name}`} src={e.image} className="itemImage" />
            <div>
              <p>Link to product:</p>
              {e.link}
            </div>
          </div>
        </li>
      </Link>
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
