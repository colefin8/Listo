import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NewUser.css";

const NewUser = props => {
  const [input, changeInput] = useState("");
  const [users, changeUsers] = useState([]);
  const [loading, changeLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`api/users/${props.listId}`)
      .then(res => changeUsers(res))
      .catch(err => console.log(err));
  }, []);

  const handleAddUser = () => {
    axios.post(`api/list-users/`);
  };

  const handleInput = value => {
    changeInput(value);
  };
  return (
    <>
      <section className={props.name}>
        <p className="exit" onClick={props.toggleAddUser}>
          X
        </p>
        <div className="newUserInput">
          <span>Enter user email here: </span>
          <input
            className="inputField"
            value={input}
            onChange={e => handleInput(e.target.value)}
          />
        </div>
        <button className="newItemInput" onClick={handleAddUser}>
          Add User to List
        </button>
      </section>
    </>
  );
};

export default NewUser;
