import React from "react";
import { withRouter } from "react-router";
import "./NavMenu.css";
import "@fortawesome/fontawesome-free/css/all.css";

function NavMenu(props) {
  //GETS THE LOCATION OFF OF PROPS, THEN ASSIGNS THE STRING "dashboard", "list", "new-list", OR "item" TO path
  let path = props.location.pathname;
  path = path.split("/");
  path = path[1];
  console.log(path);

  if (path === "dashboard") {
    return (
      <nav className={props.className}>
        <i className="fas fa-list fa-3x"></i>
        <i className="fas fa-sign-out-alt fa-3x"></i>
      </nav>
    );
  } else if (path === "list") {
    return (
      <nav className={props.className}>
        <i className="fas fa-list fa-3x"></i>
        <i className="fas fa-sign-out-alt fa-3x"></i>
      </nav>
    );
  }
  return (
    <nav className={props.className}>
      <i className="fas fa-home fa-3x"></i>
      <i className="fas fa-list fa-3x"></i>
      <i className="fas fa-sign-out-alt fa-3x"></i>
    </nav>
  );
}

export default withRouter(NavMenu);
