import React, { Component } from "react";
import "./DropArea.css";

class DropArea extends Component {
  componentDidMount() {
    const dropbox = document.getElementById("dropbox");
    dropbox.addEventListener("dragenter", this.noopHandler, false);
    dropbox.addEventListener("dragexit", this.noopHandler, false);
    dropbox.addEventListener("dragover", this.noopHandler, false);
    dropbox.addEventListener("drop", this.drop, false);
  }
  noopHandler = evt => {
    evt.stopPropagation();
    evt.preventDefault();
  };

  drop = evt => {
    evt.stopPropagation();
    evt.preventDefault();
    var imageUrl = evt.dataTransfer.getData("URL");
    alert(imageUrl);
  };
  render() {
    return <div>DropZone => you could drop any image from any page here</div>;
  }
}

export default DropArea;
