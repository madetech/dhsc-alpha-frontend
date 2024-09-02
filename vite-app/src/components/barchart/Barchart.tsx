import React, { useEffect, useRef, useState } from "react";
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
import DownloadToCsv from "../download-to-csv/DownloadToCsv";
import { BarchartProps } from "../../data/interfaces/BarchartData";
import StandardButton from "../buttons/functionality/standard-button/StandardButton";

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
  const [showAsTable, setShowAsTable] = useState(false);
  const toggleShowAsTable = () => setShowAsTable(!showAsTable);
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
      <StandardButton
        buttonString={!showAsTable ? "View As Table" : "View As Graph"}
        buttonFunction={toggleShowAsTable}
      ></StandardButton>
      <div role="img" aria-labelledby="barchart-title barchart-desc">
        {!showAsTable ? (
          <svg ref={ref}>
            <title id="barchart-title">{title}</title>
            <desc id="barchart-desc">
              A bar chart showing {title}. The x-axis represents {xLabel}, and
              the y-axis represents {yLabel}.
            </desc>
          </svg>
        ) : (
          <div>
            <table className="govuk-table">
              <caption className="govuk-table__caption govuk-table__caption--m">
                {title}
              </caption>
              <thead className="govuk-table__head">
                <tr className="govuk-table__row">
                  <th
                    scope="col"
                    className="govuk-table__header govuk-!-width-three-quarters"
                  >
                    {xLabel}
                  </th>
                  <th
                    scope="col"
                    className="govuk-table__header govuk-!-width-one-quarter"
                  >
                    {yLabel}
                  </th>
                </tr>
              </thead>
              <tbody className="govuk-table__body">
                {data.map((dataItem, index) => (
                  <tr className="govuk-table__row" key={index}>
                    <td className="govuk-table__cell">{dataItem.xAxisValue}</td>
                    <td className="govuk-table__cell">{dataItem.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <DownloadToCsv data={data} filename={title} xLabel={xLabel}>
          <StandardButton
            buttonString="Download To Csv"
            buttonFunction={() => {}}
          ></StandardButton>
        </DownloadToCsv>
      </div>
    </>
  );
};

export default Barchart;
