import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Item from "../Item/Item";
import Nav from "../Nav/Nav";
import axios from "axios";
import { Link } from "react-router-dom";

function List(props) {
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
        const shared = res.data.private;
        changeName(name);
        changeBudget(budget);
        changeCreatorId(creator_id);
        changeListId(list_id);
        changeShared(shared);
      })
      .catch(err => console.log(err));
  }, [props.match.params.listid]);

  const authentication = () => {
    return shared ? (
      props.user_id === creatorId ? (
        <section>
          <Nav />
          <h1>{name}</h1>
          {`budget: $${budget}`}
          <Item />
        </section>
      ) : (
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
      <section>
        <Nav />
        <h1>{name}</h1>
        {`budget: $${budget}`}
        <button onClick={() => }>Add Item</button>
        <Item listId={listId} />
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

export default connect(mapStateToProps)(List);
