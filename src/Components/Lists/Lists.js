import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import "./Lists.css";

const Lists = props => {
  const [lists, changeLists] = useState([]);
  console.log(props.user_id, props.match.params.userid);
  if (props.user_id === +props.match.params.userid) {
    console.log(props);
    axios.get(`/api/lists/${props.match.params.userid}`).then(res => {
      changeLists(res.data);
    });
    return (
      <ul className="listsPage">
        {lists.map((e, i) => {
          return (
            <li key={`listid${i}`}>
              <p>{e.name}</p>
              <p>{e.budget}</p>
              <p>{e.private ? `public` : `private`}</p>
            </li>
          );
        })}
      </ul>
    );
  } else {
    return props.history.push("/");
  }
};

const mapStateToProps = reduxState => {
  const { user_id } = reduxState;
  return { user_id };
};

export default connect(mapStateToProps)(Lists);
