import React from "react";
import "./App.css";
import routes from "./routes";
import { Provider } from "react-redux";
import store from "./redux/store";
import { withRouter } from "react-router";
import DropArea from "./Components/DropArea/DropArea";

function App() {
  return (
    <Provider store={store}>
      <div id="dropbox">
        <DropArea />
      </div>
      {/* <div className="App">{routes}</div> */}
    </Provider>
  );
}

export default withRouter(App);
