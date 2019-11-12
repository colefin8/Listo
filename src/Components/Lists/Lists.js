import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import "./Lists.css";
import { Link } from "react-router-dom";
import Nav from "../Nav/Nav";
import Loading from "../Loading/Loading";

const Lists = props => {
  const [lists, changeLists] = useState([]);
  const [loading, changeLoading] = useState(false);

  useEffect(() => {
    changeLoading(true);
    props.user_id === +props.match.params.userid
      ? axios
          .get(`/api/lists/${props.match.params.userid}`)
          .then(res => {
            changeLists(res.data);
            changeLoading(false);
          })
          .catch(() => changeLoading(false))
      : changeLists([]);
  }, []);

  console.log(props.user_id, props.match.params.userid);
  if (props.user_id === +props.match.params.userid) {
    return loading ? (
      <Loading />
    ) : (
      <>
        <Nav />
        <ul className="listsPage">
          {lists.length >= 1 ? (
            lists.map((e, i) => {
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
            })
          ) : (
            <h1> No lists yet!</h1>
          )}
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
