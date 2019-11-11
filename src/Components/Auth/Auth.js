import React, { useState, useEffect } from "react";
import axios from "axios";
import anime from "animejs";
import { Link } from "react-router-dom";
import { updateUser } from "../../redux/userReducer";
import { connect } from "react-redux";
import "./Auth.css";

const Auth = props => {
  //STATE
  const [passwordInput, changePasswordInput] = useState("");
  const [emailInput, changeEmailInput] = useState("");

  //INPUT HANDLERS
  const handleEmailInput = value => {
    changeEmailInput(value);
    // console.log(`email: ${value}`);
  };
  const handlePasswordInput = value => {
    changePasswordInput(value);
    // console.log(`password: ${value}`);
  };

  //SUBMIT METHODS
  const register = () => {
    if (passwordInput && emailInput) {
      axios
        .post("/api/auth/register", { emailInput, passwordInput })
        .then(res => {
          const { user_id, profile_pic, email } = res.data;
          props.updateUser(email, profile_pic, user_id);
          props.history.push("/dashboard");
        })
        .catch(err => console.log(err, props));
    }
  };

  const login = () => {
    if (passwordInput && emailInput) {
      axios
        .post("/api/auth/login", { emailInput, passwordInput })
        .then(res => {
          const { user_id, profile_pic, email } = res.data;
          props.updateUser(email, profile_pic, user_id);
          props.history.push("/dashboard");
        })
        .catch(err => console.log(err, props));
    }
  };
  return (
    <div className="authBox">
      <div className="centerBox">
        <h1>Listo</h1>
        <form className="smallBox" onSubmit={e => e.preventDefault()}>
          <div className="row">
            <p>{`Email`}</p>
          </div>
          <input
            className="inputField"
            name="emailInput"
            value={emailInput}
            onChange={e => handleEmailInput(e.target.value)}
          />

          <div className="row">
            <p>{`Password`}</p>
          </div>
          <input
            className="inputField"
            type="password"
            name="passwordInput"
            value={passwordInput}
            onChange={e => handlePasswordInput(e.target.value)}
          />

          <div className="row">
            <button type="submit" onClick={login}>
              Login
            </button>
          </div>
          <div className="row">
            <button type="submit" onClick={register}>
              Register
            </button>
          </div>
        </form>
        <section className="smallBox">
          <header>
            <p>Don't have an account?</p>

            <p>Start a list right now</p>
          </header>
          <div className="row">
            <Link to="/new-list">
              <button
                onClick={() => {
                  axios.post("api/auth/logout");
                }}
              >
                Create New List
              </button>
            </Link>{" "}
          </div>
        </section>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  updateUser
};

export default connect(null, mapDispatchToProps)(Auth);
