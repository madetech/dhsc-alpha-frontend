import React, { useEffect, useRef, useState } from "react";
import Layout from "../../../components/common/layout/Layout";
import { Breadcrumb } from "../../../data/interfaces/Breadcrumb";
import DataCategoriesSidePanel from "../../../components/common/panels/data-categories-side-panel/DataCategoriesSidePanel";
import MainCategoriesSearch from "../../../components/common/main-categories-search/MainCategoriesSearch";
import OrganisationFilter from "../../../components/common/organisation-filter/OrganisationFilter";
import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../../../data/types/LoaderData";
import { generateBarchartSvg } from "../../../services/charts/BarchartService";
import CapacityTrackerTotalHoursAgencyWorkedByRegionService from "../../../services/capacity-tracker/CapacityTrackerTotalHoursAgencyWorkedByRegionService";
import MetricDetailsFilterBar from "../../../components/metric-components/metric-details-filter-bar/MetricDetailsFilterBar";
import MetricDetailsDownloadAndShareBar from "../../../components/metric-components/metric-details-download-and-share-bar/MetricDetailsDownloadAndShareBar";
import YourFavouriteMetricsSidePanel from "../../../components/common/panels/your-favourite-metrics-side-panel/YourFavouriteMetricsSidePanel";
import DataGuideSidePanel from "../../../components/common/panels/data-guide-side-panel/DataGuideSidePanel";
import ReportLinksSidePanel from "../../../components/common/panels/report-links-side-panel/ReportLinksSidePanel";
import KnowledgeCentreSidePanel from "../../../components/common/panels/knowledge-centre-side-panel/KnowledgeCentreSidePanel";
import DataLimitationsContainer from "../../../components/common/data-limitations-container/DataLimitationsContainer";
import SmartInsights from "../../../components/common/smart-insights/SmartInsights";
import MetricDescription from "../../../components/metric-components/metric-description/MetricDescription";

const CapacityTrackerTotalHoursWorkedByAgencyPage: React.FC = () => {
  const { capacityTrackerTotalHoursAgencyWorkedByRegionData } =
    useLoaderData() as LoaderData;

  const [selectMetricViewValue, setSelectMetricViewValue] =
    useState("barchart");

  const [metricView, setMetricView] = useState("barchart");

  const [selectLocationLevelValue, setSelectLocationLevelValue] =
    useState("region");

  const [locationLevel, setLocationLevel] = useState("region");

  const handleLocationLevelDropdownChange = (selectedValue: string) => {
    setSelectLocationLevelValue(selectedValue);
  };

  const handleUpdateLocationLevel = () => {
    setLocationLevel(selectLocationLevelValue);
  };

  const handleMetricViewDropdownChange = (selectedValue: string) => {
    setSelectMetricViewValue(selectedValue);
  };

  const handleUpdateMetricView = () => {
    setMetricView(selectMetricViewValue);
  };

  const data = new CapacityTrackerTotalHoursAgencyWorkedByRegionService(
    capacityTrackerTotalHoursAgencyWorkedByRegionData
  ).getCapacityTrackerData();

  const barchart = generateBarchartSvg({
    data: data,
    width: 675,
    height: 400,
    xLabel: "Region",
    yLabel: "Total hours worked that are agency",
    title: "",
    medianLineColor: "#000000",
    barColor: "#1d70b8",
    showLegend: false,
    showToolTip: true,
    shortenLabels: false,
    yAxisAsPercentage: true,
    tickCount: 8,
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
          <MetricDetailsFilterBar
            selectedLocationLevel={selectLocationLevelValue}
            selectedMetricView={selectMetricViewValue}
            onLocationLevelDropdownChange={handleLocationLevelDropdownChange}
            onMetricViewDropdownChange={handleMetricViewDropdownChange}
            onLocationLevelButtonClick={handleUpdateLocationLevel}
            onMetricViewButtonClick={handleUpdateMetricView}
          />
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <h1 className="govuk-heading-l">
                Percentage of Total Work Hours Covered by Agency Staff
              </h1>
            </div>
          </div>
          {metricView === "barchart" ? (
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-full govuk-!-text-align-center">
                <div ref={svgContainerRef}></div>
              </div>
            </div>
          ) : (
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-full">
                <table className="govuk-table">
                  <thead className="govuk-table__head">
                    <tr className="govuk-table__row">
                      <th scope="col" className="govuk-table__header">
                        Region
                      </th>
                      <th scope="col" className="govuk-table__header">
                        Total hours worked that are agency %
                      </th>
                    </tr>
                  </thead>
                  <tbody className="govuk-table__body">
                    {capacityTrackerTotalHoursAgencyWorkedByRegionData.map(
                      (entry) => (
                        <tr className="govuk-table__row">
                          <th scope="row" className="govuk-table__header">
                            {entry.location_name}
                          </th>
                          <td className="govuk-table__cell">
                            {(entry.value * 100).toFixed(2) + "%"}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <MetricDetailsDownloadAndShareBar
            data={data}
            filename="PercentageOfTotalWorkHoursCoveredByAgencyStaffByRegion"
            xLabel="Region"
          />
          <MetricDescription
            title="Percentage of Total Work Hours Covered by Agency Staff"
            body="This chart displays the proportion of total work hours covered
                by agency staff across different regions. It highlights regional
                variations, with some areas showing a greater reliance on agency
                staff than others. The dotted line represents the median agency
                coverage across all regions."
            dataSource="Capacity Tracker"
          />
          <SmartInsights
            body="The relatively low proportion of agency-covered work hours
                  in London suggests a higher reliance on permanent staff
                  compared to other regions. This may reflect a more stable
                  workforce or greater access to local talent, reducing the
                  need for temporary or agency staff. However, the region's
                  unique economic pressures and high demand for skilled
                  workers could also be contributing factors in shaping this
                  staffing model."
          />
          <DataLimitationsContainer
            header="Data limitations"
            body="MOCK DESCRIPTION Capacity Tracker assessment frequency will 
                  depend on the information they receive and the evidence they 
                  collect. The next assessment is either planned or responsive. 
                  Their approach will be informed by risk, and they will decide 
                  the order of their planned assessments of providers based on 
                  the level of risk. There is a significant backlog in registration 
                  of new providers which results in there begin additional 
                  providers that are not captured in the data"
          />
        </div>
      </div>
    </Layout>
  );
};

export default CapacityTrackerTotalHoursWorkedByAgencyPage;
