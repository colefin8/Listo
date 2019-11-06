import React, { useState } from "react";
import { connect } from "react-redux";
import "./User.css";
import Upload from "../Upload/Upload";
import usericon from "./icons/usericon.svg";
import axios from "axios";

const User = props => {
  const [toggleEdit, changeToggleEdit] = useState(false);
  const [previewImg, changePreview] = useState(props.profile_pic || usericon);
  const [email, changeEmail] = useState(props.email || "none");

  const editUser = () => {
    axios.put(`/api/user/${props.user_id}`, { email, image: previewImg });
  };

  return (
    <div className="userMenu">
      {toggleEdit ? (
        <>
          <div>
            <h1>Email:</h1>
            <input value={email} onChange={e => changeEmail(e.target.value)} />
          </div>
          <Upload className="profilePic" changeImage={changePreview} />
          <button onClick={() => editUser}>Save</button>
        </>
      ) : (
        <>
          <div>
            <h1>Email:</h1>
            <h1>{email}</h1>
          </div>
          <img alt="user" className="profilePic" src={previewImg} />
        </>
      )}{" "}
      <button onClick={() => changeToggleEdit(!toggleEdit)}>
        {toggleEdit ? "cancel" : "edit"}
      </button>
    </div>
  );
};

const mapStateToProps = reduxState => {
  const { user_id, profile_pic, email } = reduxState;
  return {
    user_id,
    profile_pic,
    email
  };
};

export default connect(mapStateToProps)(User);
