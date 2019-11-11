import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NewUser.css";

const NewUser = props => {
  const [input, changeInput] = useState("");
  const [users, changeUsers] = useState([]);
  const [loading, changeLoading] = useState(false);

  useEffect(() => {
    console.log(props.listId);
    getUsers();
  }, [props.listId]);

  const getUsers = () => {
    axios
      .get(`api/users/${props.listId}`)
      .then(res => changeUsers(res.data))
      .catch(err => console.log(err));
  };

  const handleAddUser = () => {
    axios
      .post(`api/listusers/${props.listId}`, { email: input })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    getUsers();
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
        <div className="usersList">
          <p>Emails already added</p>
          {users.map((e, i) => {
            return <p key={`sharedgroupemail${i}`}>{e.email}</p>;
          })}
        </div>
        <div className="newUserInput">
          <span>Enter user email here: </span>
          <input
            className="newUserInputField"
            value={input}
            onChange={e => handleInput(e.target.value)}
          />
        </div>
        <button className="newUserButton" onClick={handleAddUser}>
          Add User to List
        </button>
      </section>
    </>
  );
};

export default NewUser;
