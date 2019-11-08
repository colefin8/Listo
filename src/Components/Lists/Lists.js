import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import "./Lists.css";
import { Link } from "react-router-dom";
import Nav from "../Nav/Nav";

const Lists = props => {
  useEffect(() => {
    props.user_id === +props.match.params.userid
      ? axios.get(`/api/lists/${props.match.params.userid}`).then(res => {
          changeLists(res.data);
        })
      : changeLists([]);
  }, []);

  const [lists, changeLists] = useState([]);
  console.log(props.user_id, props.match.params.userid);
  if (props.user_id === +props.match.params.userid) {
    return (
      <>
        <Nav />
        <ul className="listsPage">
          {lists.map((e, i) => {
            console.log(e);
            return (
              <Link
                className="listsLinks"
                key={`listid${i}`}
                to={`/list/${e.list_id}`}
              >
                <li className="listsPageItem">
                  <p className="leftText">{e.name}</p>
                  <p className="centerText">{`$${e.budget}`}</p>
                  <p className="rightText">
                    {e.private ? `public` : `private`}
                  </p>
                </li>
              </Link>
            );
          })}
        </ul>
      </>
    );
  } else {
    return <>{props.history.push("/")}</>;
  }
};

const mapStateToProps = reduxState => {
  const { user_id } = reduxState;
  return { user_id };
};

export default connect(mapStateToProps)(Lists);
