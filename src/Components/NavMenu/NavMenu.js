import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./NavMenu.css";
import "@fortawesome/fontawesome-free/css/all.css";
import axios from "axios";

function NavMenu(props) {
  //GETS THE LOCATION OFF OF PROPS, THEN ASSIGNS THE STRING "dashboard", "list", "new-list", OR "item" TO path
  let path = props.location.pathname;
  path = path.split("/");
  path = path[1];

  const logout = () => {
    axios
      .post("/api/auth/logout")
      .then(console.log(props.history.push("/")))
      .catch(err => console.log(err));
  };
  if (props.user_id === 1) {
    return (
      <nav className={props.className}>
        <span>Return to login</span>{" "}
        <i className="fas fa-sign-out-alt fa-3x" onClick={logout}></i>
      </nav>
    );
  } else {
    if (path === "dashboard") {
      return (
        <nav className={props.className}>
          <Link className="menuLink" to={`/lists/${props.user_id}`}>
            <i className="fas fa-list fa-3x"></i>
          </Link>
          <i className="fas fa-sign-out-alt fa-3x" onClick={logout}></i>
        </nav>
      );
    } else if (path === "list") {
      return (
        <nav className={props.className}>
          <Link className="menuLink" to="/dashboard">
            <i className="fas fa-home fa-3x"></i>
          </Link>
          <i className="fas fa-sign-out-alt fa-3x" onClick={logout}></i>
        </nav>
      );
    } else if (path === "item") {
      return (
        <nav className={props.className}>
          <Link className="menuLink" to="/dashboard">
            <i className="fas fa-home fa-3x"></i>
          </Link>
          <Link className="menuLink" to={`/lists/${props.user_id}`}>
            <i className="fas fa-list fa-3x"></i>
          </Link>
          <i className="fas fa-sign-out-alt fa-3x" onClick={logout}></i>
        </nav>
      );
    } else if (path === "new-list") {
      return (
        <nav className={props.className}>
          <Link className="menuLink" to="/dashboard">
            <i className="fas fa-home fa-3x"></i>
          </Link>
          <Link className="menuLink" to={`/lists/${props.user_id}`}>
            <i className="fas fa-list fa-3x"></i>
          </Link>
          <i className="fas fa-sign-out-alt fa-3x" onClick={logout}></i>
        </nav>
      );
    }
  }
}

const mapStateToProps = reduxState => {
  const { user_id } = reduxState;
  return { user_id };
};

export default connect(mapStateToProps)(withRouter(NavMenu));
