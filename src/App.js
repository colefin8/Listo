import React from "react";
import "./App.css";
import routes from "./routes";
import { Provider } from "react-redux";
import store from "./redux/store";
import { withRouter } from "react-router";

function App() {
  return (
    <Provider store={store}>
      <div className="App">{routes}</div>
    </Provider>
  );
}

export default withRouter(App);
