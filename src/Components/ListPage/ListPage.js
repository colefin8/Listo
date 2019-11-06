import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import NewItem from "../NewItem/NewItem";
import Item from "../Item/Item";
import Nav from "../Nav/Nav";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ListPage.css";

function ListPage(props) {
  console.log(props);
  const [justLoaded, changeJustLoaded] = useState(true);
  const [showMenu, changeShowMenu] = useState(true);
  const [name, changeName] = useState("");
  const [budget, changeBudget] = useState(0);
  const [creatorId, changeCreatorId] = useState(0);
  const [listId, changeListId] = useState(0);
  const [shared, changeShared] = useState(false);
  const [total, changeTotal] = useState(0);

  useEffect(() => {
    axios
      .get(`api/list/${props.match.params.listid}`)
      .then(res => {
        const { list_id, creator_id, budget, name } = res.data;
        console.log(creator_id);
        const shared = res.data.private;
        changeName(name);
        changeBudget(budget);
        changeCreatorId(creator_id);
        changeListId(list_id);
        changeShared(shared);
      })
      .catch(err => console.log(err));
  }, []);

  const runningTotal = value => {
    changeTotal(value);
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

  const authentication = () => {
    return shared ? (
      props.user_id === creatorId ? (
        <section className="listPage">
          {showMenu ? (
            <div className="menu">
              {" "}
              <h1>{name}</h1>
              <h1>{`budget: $${budget}`}</h1>
              <h1>{`current total: $${total}`}</h1>
              <button className="button" onClick={toggleAddItem}>
                Add Item
              </button>
              <Item
                listId={listId}
                shared={shared}
                runningTotal={runningTotal}
              />
            </div>
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
          <div className="menu">
            {" "}
            <h1>{name}</h1>
            <h1>{`budget: $${budget}`}</h1>
            <h1>{`current total: $${total}`}</h1>
            <button className="button" onClick={toggleAddItem}>
              Add Item
            </button>
            <Item listId={listId} shared={shared} runningTotal={runningTotal} />
          </div>
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
  return (
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
            value={`localhost:3000/#/${props.match.url}`}
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
