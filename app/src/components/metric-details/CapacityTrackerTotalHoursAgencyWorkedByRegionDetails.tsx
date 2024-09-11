import React, { useEffect, useRef } from "react";
import { BarchartData } from "../../data/interfaces/BarchartData";
import { generateBarchartSvg } from "../barchart/BarchartRefactored";

type Props = {
  data: BarchartData[];
};

const CapacityTrackerTotalHoursAgencyWorkedByRegionDetails: React.FC<Props> = ({
  data,
}) => {
  const barchart = generateBarchartSvg({
    data: data,
    width: 675,
    height: 400,
    xLabel: "Percentage of total hours worked that are agency",
    yLabel: "Region",
    title: "",
    medianLineColor: "#000000",
    barColor: "#1d70b8",
    showLegend: false,
    showToolTip: true,
    shortenLabels: false,
    yAxisAsPercentage: true,
  });
  const svgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (svgContainerRef.current) {
      svgContainerRef.current.innerHTML = "";
      if (barchart) {
        svgContainerRef.current.appendChild(barchart);
      }
    }
  }, [data]);

  return (
    <>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          <a href="/home" className="govuk-back-link govuk-!-margin-bottom-9">
            Back
          </a>
        </div>
      </div>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          <h1 className="govuk-heading-l">
            Percentage of total hours worked that are agency by region
          </h1>
        </div>
      </div>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full govuk-!-text-align-center">
          <div ref={svgContainerRef}></div>
        </div>
      </div>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          <h2 className="govuk-heading-m">
            Percentage of total hours worked that are agency by region
          </h2>
          <p className="govuk-body">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
      </div>
      <div className="govuk-grid-row govuk-!-margin-bottom-9">
        <div className="govuk-grid-column-full">
          <p className="govuk-body">
            <span className="govuk-!-font-weight-bold">Data Source: </span>{" "}
            <a href="#" className="govuk-link">
              Capacity Tracker
            </a>
          </p>
        </div>
      </div>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          <div className="dhsc-white-panel-container">
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-full">
                <p className="govuk-body govuk-!-font-weight-bold govuk-!-margin-top-0 govuk-!-margin-bottom-1">
                  Data Limitations
                </p>
              </div>
            </div>
            <div className="govuk-grid-row govuk-!-margin-top-2">
              <div className="govuk-grid-column-full">
                <p className="govuk-body govuk-!-margin-bottom-0">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CapacityTrackerTotalHoursAgencyWorkedByRegionDetails;
