import React, { useState } from "react";
import { Link } from "react-router-dom";

const Auth = () => {
  const [passwordInput, changePasswordInput] = useState("");
  const [emailInput, changeEmailInput] = useState("");

  return (
    <div>
      <form>
        <div>
          <span>Email</span>
          <input name="email" value={emailInput} />
        </div>
        <div>
          <span>Password</span>
          <input name="password" value={passwordInput} />
        </div>
        <Link to="/dashboard">
          <button>Login</button>
        </Link>
        <Link to="/dashboard">
          <button>Register</button>
        </Link>
      </form>
      <section>
        <header>Or start a list right now</header>
        <Link to="/new-list">
          <button>Create New List</button>
        </Link>
      </section>
    </div>
  );
};

export default Auth;
