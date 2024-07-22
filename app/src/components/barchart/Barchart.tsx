import * as d3 from "d3";
import React, {useEffect, useRef } from "react";

const Barchart = () => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // set the dimensions and margins of the graph
    const margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 500 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3
      .select(ref.current!)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // TODO:  - We can change this to be JSON or similar, based on how we get the data back from the Backend
    d3.csv(
      "/example_data/census_example.csv"
    ).then(function (data) {
      // X axis
      const x = d3
        .scaleBand()
        .range([0, width])
        .domain(data.map((d) => d.Local_Government_Areas))
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      // Add Y axis
      const y = d3.scaleLinear().domain([0, 50]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .join("rect")
        .attr("x", (d) => x(d.Local_Government_Areas)!)
        .attr("y", (d) => y(+d.Registrations))
        .attr("width", x.bandwidth())
        .attr("height", (d) => height - y(+d.Registrations))
        .attr("fill", "#5f0f40");
    });
  }, []);

  return <svg width={500} height={400} id="barchart" ref={ref} />;
};

export default Barchart;