import React, { useState } from "react";
import { connect } from "react-redux";
import "./User.css";
import Upload from "../Upload/Upload";
import usericon from "./icons/usericon.svg";
import axios from "axios";

const User = props => {
  console.log(props);
  const [toggleEdit, changeToggleEdit] = useState(false);
  const [previewImg, changePreview] = useState(props.profile_pic || usericon);
  const [email, changeEmail] = useState(props.email || "none");
  const user = true;

  const editUser = () => {
    axios
      .put(`/api/user/${props.user_id}`, { email, image: previewImg })
      .then(() => changeToggleEdit(!toggleEdit));
  };
  return props.user_id === 1 ? (
    <>{props.history.push("/")}</>
  ) : (
    <div className="userMenu">
      {toggleEdit ? (
        <>
          <p className="backButton" onClick={() => props.history.goBack()}>
            Back
          </p>
          <div>
            <h1>Email:</h1>
            <input
              className="userEditInput"
              value={email}
              onChange={e => changeEmail(e.target.value)}
            />
          </div>
          <Upload
            className="profilePic"
            user={user}
            changeImage={changePreview}
          />
          <button onClick={() => editUser()}>Save</button>
        </>
      ) : (
        <>
          <p className="backButton" onClick={() => props.history.goBack()}>
            Back
          </p>
          <div>
            <h1>Email:</h1>
            <h1>{email}</h1>
          </div>
          <img alt="user" className="profilePic" src={previewImg} />
        </>
      )}{" "}
      <button onClick={() => changeToggleEdit(!toggleEdit)}>
        {toggleEdit ? "Cancel" : "Edit"}
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
