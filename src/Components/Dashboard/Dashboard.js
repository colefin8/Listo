import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import List from "../List/List";
import "./Dashboard.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

function Dashboard(props) {
  const [publicArray, changePublic] = useState([]);
  const [privateArray, changePrivate] = useState([]);

  useEffect(() => {
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
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <Nav />
      {props.user_id === 1 ? (
        <article className="dashboard">
          <Link className="linkstyle guestHeader" to="/new-list">
            <h1>New List</h1>
          </Link>
          <h1 className="guestHeader">Currently logged in as Guest</h1>
          <Link className="linkstyle guestHeader" to="/">
            <h1>Return to login screen?</h1>
          </Link>
        </article>
      ) : (
        <article className="dashboard">
          <Link className="linkstyle" to="/new-list">
            <h1>New List</h1>
          </Link>
          <h1>Recent Personal Lists</h1>
          <List array={privateArray} />
          <h1>Recent Group Lists</h1>
          <List array={publicArray} />
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
