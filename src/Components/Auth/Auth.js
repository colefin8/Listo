import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { updateUser } from "../../redux/userReducer";
import { connect } from "react-redux";
import "./Auth.css";
import * as d3 from "d3";

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
    axios
      .post("/api/auth/register", { emailInput, passwordInput })
      .then(res => {
        const { user_id, profile_pic, email } = res.data;
        props.updateUser(email, profile_pic, user_id);
        props.history.push("/dashboard");
      })
      .catch(err => console.log(err, props));
  };

  const login = () => {
    axios
      .post("/api/auth/login", { emailInput, passwordInput })
      .then(res => {
        const { user_id, profile_pic, email } = res.data;
        props.updateUser(email, profile_pic, user_id);
        props.history.push("/dashboard");
      })
      .catch(err => console.log(err, props));
  };

  return (
    <div className="authBox">
      <div className="centerBox">
        <h1>Listo</h1>
        <form className="smallBox" onSubmit={e => e.preventDefault()}>
          <div>
            <p>{`Email`}</p>
            <input
              className="inputField"
              name="emailInput"
              value={emailInput}
              onChange={e => handleEmailInput(e.target.value)}
            />
          </div>
          <div>
            <p>{`Password`}</p>
            <input
              className="inputField"
              type="password"
              name="passwordInput"
              value={passwordInput}
              onChange={e => handlePasswordInput(e.target.value)}
            />
          </div>

          <button type="submit" onClick={login}>
            Login
          </button>

          <button type="submit" onClick={register}>
            Register
          </button>
        </form>
        <section className="smallBox">
          <header>
            <p>Don't have an account?</p>
            <p>Start a list right now</p>
          </header>
          <Link to="/new-list">
            <button
              onClick={() => {
                axios.post("api/auth/logout");
              }}
            >
              Create New List
            </button>
          </Link>
        </section>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  updateUser
};

export default connect(
  null,
  mapDispatchToProps
)(Auth);
