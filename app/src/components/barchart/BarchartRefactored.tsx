import { BarchartProps } from "../../data/interfaces/BarchartData";
import {
  initializeSvg,
  createXAxisScale,
  createYAxisScale,
  calculateMedian,
  renderBars,
  renderXAxis,
  renderYAxis,
  renderLabels,
  addTooltip,
  renderMedianLine,
  renderLegend,
} from "./barchartHelpers";

export function generateBarchartSvg({
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
}: BarchartProps): SVGSVGElement | null {
  if (!data.length) return null;

  const svgElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  const ref = { current: svgElement };

  const chartSvg = initializeSvg(ref, width, height);
  const xAxisScale = createXAxisScale(data, width, margin);
  const yAxisScale = createYAxisScale(data, height, margin);
  const median = calculateMedian(data, showMedian);

  renderBars(chartSvg, data, xAxisScale, yAxisScale, barColor, height, margin);
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

  return svgElement;
}
