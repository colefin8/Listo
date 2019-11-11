import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./NewList.css";
import axios from "axios";

const NewList = props => {
  const [listName, changeListName] = useState("");
  const [shared, changeShared] = useState(true);
  const [budget, changeBudget] = useState("");

  const addNewList = () => {
    console.log(`firing, ${(budget, listName)}`);
    props.email
      ? shared
        ? axios
            .post("/api/list/addprivate", {
              listName,
              shared,
              budget,
              email: props.email
            })
            .then(res => {
              const { list_id } = res.data;
              console.log(props.history);
              props.history.push(`/list/${list_id}`);
            })
            .catch(err => console.log(err))
        : axios
            .post("/api/list/addpublic", {
              listName,
              shared,
              budget,
              email: props.email
            })
            .then(res => {
              const { list_id } = res.data;
              console.log(props.history);
              props.history.push(`/list/${list_id}`);
            })
            .catch(err => console.log(err))
      : axios
          .post("/api/list/addguest", {
            listName,
            budget
          })
          .then(res => {
            console.log(res);
            const { list_id } = res.data;
            props.history.push(`/list/${list_id}`);
          })
          .catch(err => console.log(err));
  };
  return (
    <>
      <article className="newListWizard">
        <h1>New List</h1>
        <form
          className="newListForm"
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <div>
            <p>List Name</p>
            <input
              className="wizardInput"
              name="listName"
              onChange={e => changeListName(e.target.value)}
              value={listName}
            />
          </div>
          <div>
            <p>Budget</p>
            <input
              className="wizardInput"
              name="budget"
              type="number"
              onChange={e => changeBudget(e.target.value)}
              value={budget}
            />
          </div>
          {props.user_id === 1 ? (
            <div>
              <span>List will be public</span>
              <input
                name="changeShared"
                type="checkbox"
                value={false}
                checked
                readOnly
              />
            </div>
          ) : (
            <div>
              <span>Make it a shared List? </span>
              <input
                name="changeShared"
                type="checkbox"
                value={shared}
                onChange={() => changeShared(!shared)}
              />
            </div>
          )}
          <button className="wizardButton" type="submit" onClick={addNewList}>
            Complete
          </button>
        </form>
      </article>
    </>
  );
};

const mapStateToProps = reduxState => {
  const { email, user_id } = reduxState;

  return {
    user_id,
    email
  };
};

export default connect(mapStateToProps)(withRouter(NewList));
