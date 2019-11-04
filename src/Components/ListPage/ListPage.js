import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import NewItem from "../NewItem/NewItem";
import Item from "../Item/Item";
import Nav from "../Nav/Nav";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ListPage.css";

function ListPage(props) {
  const [justLoaded, changeJustLoaded] = useState(true);
  const [showMenu, changeShowMenu] = useState(true);
  const [name, changeName] = useState("");
  const [budget, changeBudget] = useState(0);
  const [creatorId, changeCreatorId] = useState(0);
  const [listId, changeListId] = useState(0);
  const [shared, changeShared] = useState(false);

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
  }, [props.match.params.listid]);

  const toggleAddItem = () => {
    changeShowMenu(!showMenu);
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
    console.log(shared);
    console.log(showMenu);
    return shared ? (
      props.user_id === creatorId ? (
        <section>
          <Nav />
          {showMenu ? (
            <>
              {" "}
              <h1>{name}</h1>
              <h1>{`budget: $${budget}`}</h1>
              <button onClick={toggleAddItem}>Add Item</button>
              <Item listId={listId} shared={shared} />
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
        <>
          {" "}
          <h1>This is a private list</h1>
          <h2>Please login to access your private lists</h2>
          <h2>
            <Link to="/">Login screen ---></Link>
          </h2>
        </>
      )
    ) : (
      //End of shared? first statement
      <section>
        <Nav />

        {showMenu ? (
          <>
            {" "}
            <h1>{name}</h1>
            <h1>{`budget: $${budget}`}</h1>
            <button onClick={toggleAddItem}>Add Item</button>
            <Item listId={listId} shared={shared} />
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
    );
    //if shared(private) is false then it can be viewed by anyone
  };
  return <>{authentication()}</>;
}

const mapStateToProps = reduxState => {
  const { user_id } = reduxState;

  return { user_id };
};

export default connect(mapStateToProps)(ListPage);
