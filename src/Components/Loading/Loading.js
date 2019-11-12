import React, { Component } from "react";
import anime from "animejs";
import "./Loading.css";

class Loading extends Component {
  componentDidMount() {
    anime
      .timeline({
        targets: ".gridItem",
        loop: true,
        direction: "alternate"
      })
      .add({
        scale: [
          { value: 0.5, easing: "easeInOutSine", duration: 400 },
          { value: 1, easing: "easeInOutQuad", duration: 1200 }
        ],
        delay: anime.stagger(150, { grid: [5, 10], from: "first" }),
        direction: "alternate"
      })
      .add(
        {
          backgroundColor: [
            { value: "#f4f3ea", easing: "easeInOutSine", duration: 400 },
            { value: "#d3ac2b", easing: "easeInOutQuad", duration: 1200 }
          ],
          delay: anime.stagger(150, { grid: [5, 10], from: "center" }),
          direction: "alternate"
        },
        "-=1600"
      );
  }
  render() {
    return (
      <div className="loading">
        <div className="grid">
          <div className="gridItem gridSphere"></div>
          <div className="gridItem gridLine"></div>
          <div className="gridItem gridLine"></div>
          <div className="gridItem gridLine"></div>
          <div className="gridItem gridLine"></div>
          <div className="gridItem gridSphere"></div>
          <div className="gridItem gridLine"></div>
          <div className="gridItem gridLine"></div>
          <div className="gridItem gridLine"></div>
          <div className="gridItem gridLine"></div>
          <div className="gridItem gridSphere"></div>
          <div className="gridItem gridLine"></div>
          <div className="gridItem gridLine"></div>
          <div className="gridItem gridLine"></div>
          <div className="gridItem gridLine"></div>
          <div className="gridItem gridSphere"></div>
          <div className="gridItem gridLine"></div>
          <div className="gridItem gridLine"></div>
          <div className="gridItem gridLine"></div>
          <div className="gridItem gridLine"></div>
          <div className="gridItem gridSphere"></div>
          <div className="gridItem gridLine"></div>
          <div className="gridItem gridLine"></div>
          <div className="gridItem gridLine"></div>
          <div className="gridItem gridLine"></div>
          <div className="gridItem gridSphere"></div>
          <div className="gridItem gridLine"></div>
          <div className="gridItem gridLine"></div>
          <div className="gridItem gridLine"></div>
          <div className="gridItem gridLine"></div>
          <div className="gridItem gridSphere"></div>
          <div className="gridItem gridLine"></div>
          <div className="gridItem gridLine"></div>
          <div className="gridItem gridLine"></div>
          <div className="gridItem gridLine"></div>
          <div className="gridItem gridSphere"></div>
          <div className="gridItem gridLine"></div>
          <div className="gridItem gridLine"></div>
          <div className="gridItem gridLine"></div>
          <div className="gridItem gridLine"></div>
          <div className="gridItem gridSphere"></div>
          <div className="gridItem gridLine"></div>
          <div className="gridItem gridLine"></div>
          <div className="gridItem gridLine"></div>
          <div className="gridItem gridLine"></div>
          <div className="gridItem gridSphere"></div>
          <div className="gridItem gridLine"></div>
          <div className="gridItem gridLine"></div>
          <div className="gridItem gridLine"></div>
          <div className="gridItem gridLine"></div>
        </div>
      </div>
    );
  }
}

export default Loading;
