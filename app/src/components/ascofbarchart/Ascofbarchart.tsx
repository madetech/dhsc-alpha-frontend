import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";

interface ASCOFData {
  geographical_description: string;
  measure_group_description: string;
  outcome: number;
}

const Ascofbarchart: React.FC = () => {
  const ref = useRef<SVGSVGElement>(null);
  const [data, setData] = useState<ASCOFData[]>([]);
  const [metrics, setMetrics] = useState<string[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<string>("");

  useEffect(() => {
    // Load the data
    d3.json<ASCOFData[]>("/ascof_data/ascof_region_data.json")
      .then((data) => {
        if (data) {
          // Extract unique metrics for the dropdown
          const metrics = Array.from(
            new Set(data.map((d) => d.measure_group_description))
          );

          setData(data);
          setMetrics(metrics);
          setSelectedMetric(metrics[0]); // Initialize with the first metric
        }
      })
      .catch((error) => {
        console.error("Error loading or parsing data:", error);
      });
  }, []);

  useEffect(() => {
    if (!data.length || !selectedMetric) return;

    // Set dimensions and margins
    const width = 1000;
    const height = 400;
    const margin = { top: 30, right: 150, bottom: 120, left: 80 };

    // Clear any existing SVG elements
    d3.select(ref.current).selectAll("*").remove();

    // Select the SVG element
    const svg = d3.select(ref.current)
      .attr("width", width)
      .attr("height", height);

    // Filter data based on the selected metric
    const filteredData = data.filter(
      (d) => d.measure_group_description === selectedMetric
    );

    // Calculate the median
    const median = d3.median(filteredData, (d) => d.outcome)!;

    // Define the x and y scales
    const x = d3.scaleBand()
      .domain(filteredData.map((d) => d.geographical_description))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(filteredData, (d) => d.outcome)!]).nice()
      .range([height - margin.bottom, margin.top]);

    // Create bars
    const bars = svg.selectAll<SVGRectElement, ASCOFData>("rect")
      .data(filteredData, (d: ASCOFData) => d.geographical_description);

    bars.enter()
      .append("rect")
      .merge(bars)
      .attr("x", (d) => x(d.geographical_description)!)
      .attr("y", (d) => y(d.outcome)!)
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - margin.bottom - y(d.outcome)!)
      .attr("class", "bar")
      .attr("fill", "#5f0f40");

    bars.exit().remove();

    // Add x-axis
    const xAxisGroup = svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSize(0))
      .attr("class", "x-axis");

    // Rotate x-axis labels
    xAxisGroup.selectAll("text")
      .attr("transform", "rotate(-45)")
      .attr("text-anchor", "end")
      .attr("dx", "-0.8em")
      .attr("dy", "0.15em");

    // Add y-axis
    const yAxisGroup = svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .attr("class", "y-axis");

    // Add x-axis label
    svg.append("text")
      .attr("transform", `translate(${width / 2},${height - margin.bottom / 4})`)
      .style("text-anchor", "middle")
      .text("Region")
      .attr("class", "x-axis-label");

    // Add y-axis label
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(height - margin.bottom) / 2)
      .attr("y", margin.left / 4)
      .style("text-anchor", "middle")
      .text("Value")
      .attr("class", "y-axis-label");

    // Add chart title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", margin.top / 2)
      .style("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text("2023 ASCOF - Metric Visualisation")
      .attr("class", "chart-title");

    // Add median line
    svg.append("line")
      .attr("x1", margin.left)
      .attr("x2", width - margin.right)
      .attr("y1", y(median))
      .attr("y2", y(median))
      .attr("stroke", "#808000")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5")
      .attr("class", "median-line");

    // Add legend group
    const legendGroup = svg.append("g")
      .attr("transform", `translate(${width - margin.right + 20},${margin.top})`);

    // Add legend box
    legendGroup.append("rect")
      .attr("x", -10)
      .attr("y", -10)
      .attr("width", 120)
      .attr("height", 30)
      .attr("fill", "#f9f9f9")
      .attr("stroke", "#000000")
      .attr("stroke-width", 1);

    // Legend line
    legendGroup.append("line")
      .attr("x1", 0)
      .attr("x2", 40)
      .attr("y1", 5)
      .attr("y2", 5)
      .attr("stroke", "#808000")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5");

    // Legend text
    legendGroup.append("text")
      .attr("x", 50)
      .attr("y", 5)
      .text("Median")
      .style("font-size", "14px")
      .attr("alignment-baseline", "middle");

  }, [data, selectedMetric]);

  return (
    <div>
      <div style={{ margin: "20px 0" }}>
        <label htmlFor="metric-select">Select metric:</label>
        <select
          id="metric-select"
          value={selectedMetric}
          onChange={(e) => setSelectedMetric(e.target.value)}
        >
          {metrics.map((metric) => (
            <option key={metric} value={metric}>
              {metric}
            </option>
          ))}
        </select>
      </div>
      <svg ref={ref}></svg>
    </div>
  );
};

export default Ascofbarchart;
