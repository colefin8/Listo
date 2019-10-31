import React, { Component } from "react";
import "./DropArea.css";

class DropArea extends Component {
  noPropHandler = e => {
    e.stopPropagation();
    e.preventDefault();
  };

  drop = e => {
    e.stopPropagation();
    e.preventDefault();
    console.log(e.dataTransfer);
    const imageUrl = e.dataTransfer.getData("URL");
    this.props.getImage(imageUrl);
  };
  render() {
    return (
      <div
        className="dropzone"
        onDragEnter={e => this.noPropHandler(e)}
        onDragExit={e => this.noPropHandler(e)}
        onDragOver={e => this.noPropHandler(e)}
        onDrop={e => this.drop(e)}
      ></div>
    );
  }
}

export default DropArea;
