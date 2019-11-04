import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateUser } from "../../redux/userReducer";
import NavMenu from "../NavMenu/NavMenu";
import usericon from "./icons/usericon.jpg";
import "@fortawesome/fontawesome-free/css/all.css";
import "./Nav.css";

const Nav = () => {
  //STATE
  const [justLoaded, changeJustLoaded] = useState(true);
  const [showMenu, changeShowMenu] = useState(true);
  const [email, changeEmail] = useState("");
  const [profilePic, changeProfilePic] = useState("");

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

  useEffect(() => {
    axios
      .get("/api/auth/user")
      .then(res => {
        // console.log(res);
        const { email, profile_pic, user_id } = res.data;
        changeEmail(email);
        changeProfilePic(profile_pic);
        updateUser(email, profile_pic, user_id);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="navMenuContainer">
      {" "}
      <header className="navBar">
        {" "}
        <img
          alt="profile"
          className="profilePic"
          src={profilePic ? profilePic : usericon}
        />{" "}
        <h1> {email ? `${email}` : `guest`}</h1>{" "}
        <i className="fas fa-bars fa-3x" onClick={toggleMenu}></i>{" "}
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
)(Nav);
