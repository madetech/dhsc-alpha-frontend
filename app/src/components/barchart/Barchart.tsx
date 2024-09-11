import React, { useEffect, useRef } from "react";
import {
  initializeSvg,
  createXAxisScale,
  createYAxisScale,
  calculateMedian,
  renderBars,
  renderXAxis,
  renderYAxis,
  renderLabels,
  renderMedianLine,
  renderLegend,
  addTooltip,
} from "./barchartHelpers";
import { BarchartProps } from "../../data/interfaces/BarchartData";

const Barchart: React.FC<BarchartProps> = ({
  data,
  width = 1000,
  height = 400,
  margin = { top: 30, right: 150, bottom: 120, left: 80 },
  xLabel,
  yLabel,
  barColor = "#5f0f40",
  medianLineColor = "#808000",
  medianLineDash = "5,5",
  title = "Barchart",
  showMedian = true,
  showLegend = true,
}) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data.length) return;

    const chartSvg = initializeSvg(ref, width, height);
    const xAxisScale = createXAxisScale(data, width, margin);
    const yAxisScale = createYAxisScale(data, height, margin);
    const median = calculateMedian(data, showMedian);

    renderBars(
      chartSvg,
      data,
      xAxisScale,
      yAxisScale,
      barColor,
      height,
      margin
    );

    renderXAxis(chartSvg, xAxisScale, height, margin);
    renderYAxis(chartSvg, yAxisScale, margin);
    renderLabels(chartSvg, width, height, margin, xLabel, yLabel, title);
    addTooltip(chartSvg);

    if (showMedian && median !== null) {
      renderMedianLine(
        chartSvg,
        median,
        yAxisScale,
        width,
        margin,
        medianLineColor,
        medianLineDash
      );
    }

    if (showLegend) {
      renderLegend(chartSvg, width, margin, medianLineColor, medianLineDash);
    }
  }, [
    data,
    width,
    height,
    margin,
    xLabel,
    yLabel,
    barColor,
    medianLineColor,
    medianLineDash,
    title,
    showMedian,
    showLegend,
  ]);

  return (
    <>
      <div role="img" aria-labelledby="barchart-title barchart-desc">
        <svg ref={ref}>
          <title id="barchart-title">{title}</title>
          <desc id="barchart-desc">
            A bar chart showing {title}. The x-axis represents {xLabel}, and the
            y-axis represents {yLabel}.
          </desc>
        </svg>
      </div>
    </>
  );
};

export default Barchart;
