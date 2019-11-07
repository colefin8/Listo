import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { updateUser } from "../../redux/userReducer";
import NavMenu from "../NavMenu/NavMenu";
import usericon from "./icons/usericon.svg";
import "@fortawesome/fontawesome-free/css/all.css";
import "./Nav.css";

const Nav = props => {
  //STATE
  const [justLoaded, changeJustLoaded] = useState(true);
  const [showMenu, changeShowMenu] = useState(true);

  const toggleMenu = () => {
    changeShowMenu(!showMenu);
    changeJustLoaded(false);
  };

  const navClass = () => {
    const name = justLoaded
      ? "dropdown"
      : showMenu
      ? "dropdown hide-animation"
      : "dropdown show-animation";
    // console.log(name);
    return name;
  };
  const { updateUser } = props;
  useEffect(() => {
    updateUser();
  }, []);

  return (
    <div className="navMenuContainer">
      {" "}
      <header className="navBar">
        {" "}
        <img
          onClick={() =>
            props.user_id === 1 ? null : props.history.push("/user")
          }
          alt="profile"
          className="profilePic"
          src={props.profile_pic ? props.profile_pic : usericon}
        />{" "}
        <i className="fas fa-bars fa-4x" onClick={toggleMenu}></i>{" "}
      </header>{" "}
      <NavMenu className={navClass()} />{" "}
    </div>
  );
};

const mapStateToProps = reduxState => {
  const { email, profile_pic, user_id } = reduxState;

  return {
    email,
    profile_pic,
    user_id
  };
};

const mapDispatchToProps = {
  updateUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Nav));
