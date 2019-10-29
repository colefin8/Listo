import React from "react";
import Nav from "../Nav/Nav";
import "./Dashboard.css";

import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <Nav />
      <article className="dashboard">
        <Link className="linkstyle" to="/new-list">
          <h1>New List</h1>
        </Link>
        <h1>Recent Personal Lists</h1>
        <section>Lists</section>
        <h1>Recent Group Lists</h1>
        <section>Lists</section>
      </article>
    </>
  );
}

export default Dashboard;
