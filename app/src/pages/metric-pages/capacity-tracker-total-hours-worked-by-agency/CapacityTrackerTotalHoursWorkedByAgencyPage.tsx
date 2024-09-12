import React, { useEffect, useRef } from "react";
import Layout from "../../../components/standard-components/layout/Layout";
import { Breadcrumb } from "../../../data/interfaces/Breadcrumb";
import DataCategoriesSidePanel from "../../../components/panels/data-categories-side-panel/DataCategoriesSidePanel";
import MainCategoriesSearch from "../../../components/standard-components/main-categories-search/MainCategoriesSearch";
import OrganisationFilter from "../../../components/standard-components/organisation-filter/OrganisationFilter";
import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../../../data/types/LoaderData";
import { generateBarchartSvg } from "../../../services/charts/BarchartService";
import CapacityTrackerTotalHoursAgencyWorkedByRegionService from "../../../services/capacity-tracker/CapacityTrackerTotalHoursAgencyWorkedByRegionService";
import MetricDetailsFilterBar from "../../../components/metric-components/metric-details-filter-bar/MetricDetailsFilterBar";
import MetricDetailsDownloadAndShareBar from "../../../components/metric-components/metric-details-download-and-share-bar/MetricDetailsDownloadAndShareBar";
import YourFavouriteMetricsSidePanel from "../../../components/panels/your-favourite-metrics-side-panel/YourFavouriteMetricsSidePanel";
import DataGuideSidePanel from "../../../components/panels/data-guide-side-panel/DataGuideSidePanel";
import ReportLinksSidePanel from "../../../components/panels/report-links-side-panel/ReportLinksSidePanel";
import KnowledgeCentreSidePanel from "../../../components/panels/knowledge-centre-side-panel/KnowledgeCentreSidePanel";
import DataLimitationsContainer from "../../../components/standard-components/data-limitations-container/DataLimitationsContainer";

const CapacityTrackerTotalHoursWorkedByAgencyPage: React.FC = () => {
  const { capacityTrackerTotalHoursAgencyWorkedByRegionData } =
    useLoaderData() as LoaderData;

  const data = new CapacityTrackerTotalHoursAgencyWorkedByRegionService(
    capacityTrackerTotalHoursAgencyWorkedByRegionData
  ).getCapacityTrackerData();

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

  const breadcrumbs: Array<Breadcrumb> = [
    {
      text: "Homepage",
      url: "/home",
    },
    {
      text: "Capacity tracker data",
      url: "/home",
    },
  ];

  return (
    <Layout
      autoSpaceMainContent={false}
      breadcrumbs={breadcrumbs}
      showLoginInformation={true}
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <h1 className="govuk-heading-l">Metric Details</h1>
              <DataCategoriesSidePanel />
              <YourFavouriteMetricsSidePanel />
              <DataGuideSidePanel />
              <ReportLinksSidePanel />
              <KnowledgeCentreSidePanel />
            </div>
          </div>
        </div>
        <div className="govuk-grid-column-two-thirds">
          <MainCategoriesSearch />
          <hr className="govuk-section-break govuk-section-break--s govuk-section-break--visible govuk-!-margin-bottom-3"></hr>
          <OrganisationFilter />
          <hr className="govuk-section-break govuk-section-break--s govuk-section-break--visible govuk-!-margin-bottom-7"></hr>
          <MetricDetailsFilterBar />
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <h1 className="govuk-heading-l">
                Percentage of Total Work Hours Covered by Agency Staff
              </h1>
            </div>
          </div>
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full govuk-!-text-align-center">
              <div ref={svgContainerRef}></div>
            </div>
          </div>
          <MetricDetailsDownloadAndShareBar />
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <h2 className="govuk-heading-m">
                Percentage of Total Work Hours Covered by Agency Staff
              </h2>
              <p className="govuk-body">
                This chart displays the proportion of total work hours covered
                by agency staff across different regions. It highlights regional
                variations, with some areas showing a greater reliance on agency
                staff than others. The dotted line represents the median agency
                coverage across all regions.
              </p>
            </div>
          </div>
          <div className="govuk-grid-row govuk-!-margin-bottom-2">
            <div className="govuk-grid-column-full">
              <p className="govuk-body">
                <span className="govuk-!-font-weight-bold">Data Source: </span>{" "}
                <a href="#" className="govuk-link">
                  Capacity Tracker
                </a>
              </p>
            </div>
          </div>
          <div className="govuk-grid-row govuk-!-margin-bottom-2">
            <div className="govuk-grid-column-full">
              <div className="dhsc-white-panel-container">
                <div className="govuk-grid-row">
                  <div className="govuk-grid-column-full">
                    <p className="govuk-body govuk-!-font-weight-bold govuk-!-margin-top-0 govuk-!-margin-bottom-1">
                      Smart insights
                    </p>
                  </div>
                </div>
                <div className="govuk-grid-row govuk-!-margin-top-2">
                  <div className="govuk-grid-column-full">
                    <p className="govuk-body govuk-!-margin-bottom-0">
                      The relatively low proportion of agency-covered work hours
                      in London suggests a higher reliance on permanent staff
                      compared to other regions. This may reflect a more stable
                      workforce or greater access to local talent, reducing the
                      need for temporary or agency staff. However, the region's
                      unique economic pressures and high demand for skilled
                      workers could also be contributing factors in shaping this
                      staffing model.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DataLimitationsContainer
            header="Data limitations"
            body=" MOCK DESCRIPTION Capacity Tracker assessment frequency will depend on the information they receive and the evidence they collect. The next assessment is either planned or responsive. Their approach will be informed by risk, and they will decide the order of their planned assessments of providers based on the level of risk. There is a significant backlog in registration of new providers which results in there begin additional  providers that are not captured in the data"
          />
        </div>
      </div>
    </Layout>
  );
};

export default CapacityTrackerTotalHoursWorkedByAgencyPage;
