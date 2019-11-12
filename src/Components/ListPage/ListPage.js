import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import NewItem from "../NewItem/NewItem";
import NewUser from "../NewUser/NewUser";
import Loading from "../Loading/Loading";
import Item from "../Item/Item";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import "./ListPage.css";
require("dotenv").config();
const { LOCALHOST_URL } = process.env;

function ListPage(props) {
  const [justLoaded, changeJustLoaded] = useState(true);
  const [showMenu, changeShowMenu] = useState(true);
  const [justLoadedUser, changeJustLoadedUser] = useState(true);
  const [showUserMenu, changeShowUserMenu] = useState(true);
  const [name, changeName] = useState("");
  const [budget, changeBudget] = useState(0);
  const [creatorId, changeCreatorId] = useState(0);
  const [listId, changeListId] = useState(0);
  const [shared, changeShared] = useState(false);
  const [total, changeTotal] = useState(0);
  const [loading, changeLoading] = useState(false);

  useEffect(() => {
    changeLoading(true);
    changeListId(props.match.params.listid);
    axios
      .get(`api/list/${props.match.params.listid}`)
      .then(res => {
        const { creator_id, budget, name } = res.data;
        const shared = res.data.private;
        changeName(name);
        changeBudget(budget);
        changeCreatorId(creator_id);
        changeShared(shared);
        changeLoading(false);
      })
      .catch(() => changeLoading(false));
  }, []);

  const runningTotal = value => {
    changeTotal(value);
  };

  const toggleAddUser = () => {
    changeShowUserMenu(prev => !prev);
    changeJustLoadedUser(false);
  };

  const toggleAddItem = () => {
    changeShowMenu(prev => !prev);
    changeJustLoaded(false);
  };

  const addItemClassName = () => {
    const name = justLoaded
      ? "popup"
      : showMenu
      ? "popup hide-new-item-animation"
      : "popup show-new-item-animation";
    return name;
  };

  const addUserClassName = () => {
    const name = justLoadedUser
      ? "popup"
      : showUserMenu
      ? "popup hide-new-item-animation"
      : "popup show-new-item-animation";
    return name;
  };

  const authentication = () => {
    console.log(listId);
    return shared ? (
      props.user_id === creatorId ? (
        <section className="listPage">
          {showMenu ? (
            <>
              {" "}
              <div className="menu">
                {" "}
                <h1>{name}</h1>
                <h1>{`budget: $${budget}`}</h1>
                <h1>{`current total: $${total}`}</h1>
                <button className="button" onClick={toggleAddItem}>
                  Add Item
                </button>
              </div>
              <div>
                {" "}
                <Item
                  listId={listId}
                  shared={shared}
                  runningTotal={runningTotal}
                />
              </div>
            </>
          ) : (
            <NewItem
              name={addItemClassName()}
              toggleAddItem={toggleAddItem}
              listId={listId}
              userId={props.user_id}
            />
          )}
        </section>
      ) : (
        //End of props.user_id == creatorId? first statement
        <section className="listPage">
          {" "}
          <h1>This is a private list</h1>
          <h2>Please login to access your private lists</h2>
          <h2>
            <Link to="/">Login screen ---></Link>
          </h2>
        </section>
      )
    ) : (
      //End of shared? first statement
      <section className="listPage">
        {showMenu ? (
          showUserMenu ? (
            <div className="menu">
              {" "}
              <h1>{name}</h1>
              <h1>{`budget: $${budget}`}</h1>
              <h1>{`current total: $${total}`}</h1>
              <div className="buttonBar">
                <button className="button" onClick={toggleAddItem}>
                  Add Item
                </button>
                <button className="button" onClick={toggleAddUser}>
                  Add User
                </button>
              </div>
              <Item
                listId={listId}
                shared={shared}
                runningTotal={runningTotal}
              />
            </div>
          ) : (
            <NewUser
              name={addUserClassName()}
              toggleAddUser={toggleAddUser}
              listId={listId}
              userId={props.user_id}
            />
          )
        ) : (
          <NewItem
            name={addItemClassName()}
            toggleAddItem={toggleAddItem}
            listId={listId}
            userId={props.user_id}
          />
        )}
      </section>
    );
    //if shared(private) is false then it can be viewed by anyone
  };
  return loading ? (
    <Loading />
  ) : (
    <>
      {authentication()}
      {props.user_id === 1 ? (
        <div>
          <p>Copy this link to return to this list.</p>
          <p>
            Because it is a guest list anyone with this link can edit the list!
          </p>
          <input
            readOnly
            value={`${LOCALHOST_URL}${props.match.url}`}
            onFocus={e => e.target.select()}
          />
        </div>
      ) : null}
    </>
  );
}

const mapStateToProps = reduxState => {
  const { user_id } = reduxState;

  return { user_id };
};

export default connect(mapStateToProps)(withRouter(ListPage));
