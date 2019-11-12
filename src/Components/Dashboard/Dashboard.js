import React, { useState, useEffect } from "react";
import List from "../List/List";
import "./Dashboard.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";

function Dashboard(props) {
  console.log(props.user_id);
  const [publicArray, changePublic] = useState([]);
  const [privateArray, changePrivate] = useState([]);
  const [loading, changeLoading] = useState(false);

  useEffect(() => {
    changeLoading(true);
    axios
      .get(`api/lists/private/${props.user_id}`)
      .then(res => {
        changePrivate(res.data);
      })
      .catch(err => console.log(err));
    axios
      .get(`api/lists/public/${props.user_id}`)
      .then(res => {
        changePublic(res.data);
        changeLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, [props.user_id]);

  return (
    <>
      {props.user_id === 1 ? (
        <article className="dashboard">
          <Link className="linkstyle guestHeader" to="/new-list">
            <h1>New List</h1>
            <i id="arrow" className="fa fa-angle-right"></i>
          </Link>
          <h1 className="guestHeader">Logged in as Guest</h1>
          <Link className="linkstyle guestHeader" to="/">
            <h1>Return to login screen? </h1>
            <i id="arrow" className="fa fa-angle-right"></i>
          </Link>
        </article>
      ) : loading ? (
        <Loading />
      ) : (
        <article className="dashboard">
          <Link className="linkstyle" to="/new-list">
            <h1>New List</h1>
            <i id="arrow" className="fa fa-angle-right"></i>
          </Link>
          <div>
            <h1>Recent Personal Lists</h1>
            <List array={privateArray} />
          </div>
          <div>
            <h1>Recent Group Lists</h1>
            <List array={publicArray} />
          </div>
        </article>
      )}
    </>
  );
}

const mapStateToProps = reduxState => {
  const { user_id } = reduxState;
  return {
    user_id
  };
};

export default connect(mapStateToProps)(Dashboard);
