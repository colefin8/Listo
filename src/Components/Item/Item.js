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
      <Link key={`item key:${i}`} to={`/item/${e.item_id}`}>
        <li>
          <h1 className="itemName">{e.name}</h1>
          <div>
            <span>Price:</span>
            {`$${e.price}`}
          </div>
          <div>
            <span>Notes: </span>
            {e.notes}
          </div>
          <img alt={`${e.name}`} src={e.image} className="itemImage" />
          <div>
            <span>Link to product:</span>
            {e.link}
          </div>
        </li>
      </Link>
    );
  });
  return <ul>{mapped}</ul>;
}

const mapStateToProps = reduxState => {
  const { user_id } = reduxState;

  return { user_id };
};

export default connect(mapStateToProps)(Item);
