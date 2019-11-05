import React from "react";
import * as d3 from "d3";

function SampleSVG() {
  const radius = Math.min(450, 450) / 2 - 40;
  d3.pie(90, 360);
  const svg = d3
    .select("#my_data")
    .append("svg")
    .attr("width", 450)
    .attr("height", 450)
    .append("g")
    .attr("transform", "translate(" + 450 / 2 + "," + 450 / 2 + ")");

  const data = { a: 9, b: 20, c: 30, d: 8, e: 12 };

  const color = d3
    .scaleOrdinal()
    .domain(data)
    .range(["#545f66", "#829399", "#d0f4ea", "#08605f", "#177e89"]);
  return <div id="my_data"></div>;
}

export default SampleSVG;
