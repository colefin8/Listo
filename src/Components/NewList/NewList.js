import React, { useState } from "react";
import Nav from "../Nav/Nav";
// import { Link } from "react-router-dom";
import "./NewList.css";
import axios from "axios";

const NewList = () => {
  const [listName, changeListName] = useState("");
  const [shared, changeShared] = useState(true);
  const [budget, changeBudget] = useState("");

  const addNewList = () => {
    axios
      .post()
      .then()
      .catch();
  };

  return (
    <>
      <Nav />
      <article className="newListWizard">
        <h1>New List</h1>
        <form
          className="newListForm"
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <div>
            <span>List Name: </span>
            <input
              name="listName"
              onChange={e => changeListName(e.target.value)}
              value={listName}
            />
          </div>
          <div>
            <span>Budget: </span>
            <input
              name="budget"
              type="number"
              onChange={e => changeBudget(e.target.value)}
              value={budget}
            />
          </div>
          <div>
            <span>Make it a shared List? </span>
            <input
              name="changeShared"
              type="checkbox"
              value={shared}
              onChange={() => changeShared(!shared)}
            />
          </div>
          {/* link to list page for newly completed list */}
          {/* <Link> */}
          <button type="submit" onClick={addNewList}>
            Complete
          </button>
          {/* </Link> */}
        </form>
      </article>
    </>
  );
};

export default NewList;
