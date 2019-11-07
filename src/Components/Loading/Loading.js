import React, { Component } from "react";
import anime from "animejs";
import "./Loading.css";

class Loading extends Component {
  componentDidMount() {
    anime
      .timeline({ targets: ".gridSphere", loop: true, direction: "alternate" })
      .add({
        scale: [
          { value: 0.5, easing: "easeOutSine", duration: 400 },
          { value: 1, easing: "easeInOutQuad", duration: 1200 }
        ],
        delay: anime.stagger(150, { grid: [5, 5], from: "center" }),
        direction: "alternate"
      })
      .add(
        {
          backgroundColor: [
            { value: "#f4f3ea", easing: "easeOutQuad", duration: 400 },
            { value: "#d3ac2b", easing: "easeInOutSine", duration: 1200 }
          ],
          delay: anime.stagger(150, { grid: [5, 5], from: "center" }),
          direction: "alternate"
        },
        "-=1600"
      );
  }
  render() {
    return (
      <div className="App">
        <div className="grid">
          <div className="gridSphere"></div>
          <div className="gridSphere"></div>
          <div className="gridSphere"></div>
          <div className="gridSphere"></div>
          <div className="gridSphere"></div>
          <div className="gridSphere"></div>
          <div className="gridSphere"></div>
          <div className="gridSphere"></div>
          <div className="gridSphere"></div>
          <div className="gridSphere"></div>
          <div className="gridSphere"></div>
          <div className="gridSphere"></div>
          <div className="gridSphere"></div>
          <div className="gridSphere"></div>
          <div className="gridSphere"></div>
          <div className="gridSphere"></div>
          <div className="gridSphere"></div>
          <div className="gridSphere"></div>
          <div className="gridSphere"></div>
          <div className="gridSphere"></div>
          <div className="gridSphere"></div>
          <div className="gridSphere"></div>
          <div className="gridSphere"></div>
          <div className="gridSphere"></div>
          <div className="gridSphere"></div>
        </div>
      </div>
    );
  }
}

export default Loading;
