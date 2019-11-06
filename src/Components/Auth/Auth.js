import React, { useState, useEffect } from "react";
import axios from "axios";
import anime from "animejs";
import { Link } from "react-router-dom";
import { updateUser } from "../../redux/userReducer";
import { connect } from "react-redux";
import "./Auth.css";
import * as d3 from "d3";

const Auth = props => {
  //STATE
  const [passwordInput, changePasswordInput] = useState("");
  const [emailInput, changeEmailInput] = useState("");

  useEffect(() => {
    anime({
      targets: ".circle",
      left: "15vw",
      easing: "easeInOutQuad",
      delay: anime.stagger(150)
    });
  }, []);

  //INPUT HANDLERS
  const handleEmailInput = value => {
    changeEmailInput(value);
    // console.log(`email: ${value}`);
  };
  const handlePasswordInput = value => {
    changePasswordInput(value);
    // console.log(`password: ${value}`);
  };

  const animate = id => {
    const target = document.getElementById(id);
    console.log("fired animate");
    console.log(target);
    anime({
      targets: target,
      translateX: "75vw",
      easing: "spring(1, 50, 11, 2)",
      direction: "forward"
    });
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
            <div id="1" className="circle"></div>
            <p>{`Email`}</p>
            <input
              onClick={() => animate("1")}
              className="inputField"
              name="emailInput"
              value={emailInput}
              onChange={e => handleEmailInput(e.target.value)}
            />
          </div>
          <div>
            <div id="2" className="circle"></div>
            <p>{`Password`}</p>
            <input
              onClick={() => animate("2")}
              className="inputField"
              type="password"
              name="passwordInput"
              value={passwordInput}
              onChange={e => handlePasswordInput(e.target.value)}
            />
          </div>
          <div>
            <div className="circle"></div>
            <button type="submit" onClick={login}>
              Login
            </button>
          </div>
          <div>
            <div className="circle"></div>
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
          <div>
            <div className="circle"></div>
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

export default connect(
  null,
  mapDispatchToProps
)(Auth);
