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
  truncateLabels,
} from "./barchartHelpers";

export function generateBarchartSvg({
  data,
  width = 1000,
  height = 400,
  xLabel,
  yLabel,
  barColor = "#5f0f40",
  medianLineColor = "#808000",
  medianLineDash = "5,5",
  title = "Barchart",
  showMedian = true,
  showLegend = true,
  shortenLabels = false,
  showToolTip = true,
  tickCount,
  yAxisAsPercentage = false,
}: BarchartProps): SVGSVGElement | null {
  if (!data.length) return null;

  const dynamicMargin = {
    top: height * 0.1,
    right: width * 0.1,
    bottom: height * 0.4,
    left: width * 0.2,
  };

  const svgElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  const ref = { current: svgElement };

  const chartSvg = initializeSvg(ref, width, height);

  data = data.map((entry) => ({
    ...entry,
    xAxisValue: shortenLabels
      ? truncateLabels(entry.xAxisValue, 16)
      : entry.xAxisValue,
  }));

  const xAxisScale = createXAxisScale(data, width, dynamicMargin);
  const yAxisScale = createYAxisScale(data, height, dynamicMargin);
  const median = calculateMedian(data, showMedian);

  renderBars(
    chartSvg,
    data,
    xAxisScale,
    yAxisScale,
    barColor,
    height,
    dynamicMargin
  );
  renderXAxis(chartSvg, xAxisScale, height, dynamicMargin);
  renderYAxis(
    chartSvg,
    yAxisScale,
    dynamicMargin,
    tickCount,
    yAxisAsPercentage
  );
  renderLabels(chartSvg, width, height, dynamicMargin, xLabel, yLabel, title);

  if (showToolTip) {
    addTooltip(chartSvg);
  }

  if (showMedian && median !== null) {
    renderMedianLine(
      chartSvg,
      median,
      yAxisScale,
      width,
      dynamicMargin,
      medianLineColor,
      medianLineDash
    );
  }

  if (showLegend) {
    renderLegend(
      chartSvg,
      width,
      dynamicMargin,
      medianLineColor,
      medianLineDash
    );
  }

  return svgElement;
}
