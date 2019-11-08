import React from "react";
import { Link } from "react-router-dom";

const List = props => {
  return !props.array[0] ? (
    <p>No lists of this type have been made yet!</p>
  ) : (
    props.array.map((e, i) => {
      return (
        <Link
          className="linkstyle"
          key={`listID: ${e.list_id}${i}`}
          to={`/list/${e.list_id}`}
        >
          <div className="listItem">
            <p>{e.name}</p>
            <p className="rightText">{`Budget: $${e.budget}`}</p>
          </div>
        </Link>
      );
    })
  );
};

export default List;
