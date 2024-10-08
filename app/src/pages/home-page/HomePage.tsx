import React from "react";
import Layout from "../../components/common/layout/Layout";
import { Breadcrumb } from "../../data/interfaces/Breadcrumb";
import { MetricCardData } from "../../data/interfaces/MetricCardData";
import HomePageDataUpdatesPanel from "../../components/home-page-components/home-page-data-updates-panel/HomePageDataUpdatesPanel";
import HomePageDataDefinitionsPanel from "../../components/home-page-components/home-page-data-definitions-panel/HomePageDataDefinitionsPanel";
import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../../data/types/LoaderData";
import CapacityTrackerTotalHoursAgencyWorkedByRegionService from "../../services/capacity-tracker/CapacityTrackerTotalHoursAgencyWorkedByRegionService";
import MetricCard from "../../components/metric-components/metric-card/MetricCard";
import HomePageAddFavouriteMetricsPanel from "../../components/home-page-components/home-page-add-favourite-metrics-panel/FavouriteMetricsPanel";
import DataCategoriesSidePanel from "../../components/common/panels/data-categories-side-panel/DataCategoriesSidePanel";
import MainCategoriesSearch from "../../components/common/main-categories-search/MainCategoriesSearch";
import OrganisationFilter from "../../components/common/organisation-filter/OrganisationFilter";
import YourFavouriteMetricsSidePanel from "../../components/common/panels/your-favourite-metrics-side-panel/YourFavouriteMetricsSidePanel";
import DataGuideSidePanel from "../../components/common/panels/data-guide-side-panel/DataGuideSidePanel";
import ReportLinksSidePanel from "../../components/common/panels/report-links-side-panel/ReportLinksSidePanel";
import KnowledgeCentreSidePanel from "../../components/common/panels/knowledge-centre-side-panel/KnowledgeCentreSidePanel";

const HomePage: React.FC = () => {
  const breadcrumbs: Array<Breadcrumb> = [
    {
      text: "Homepage",
      url: "/home",
    },
  ];

  const {
    capacityTrackerTotalHoursAgencyWorkedByRegionData,
    capacityTrackerTotalHoursAgencyWorkedByLaData,
  } = useLoaderData() as LoaderData;

  const capacityTrackerTotalHoursAgencyWorkedByRegionService =
    new CapacityTrackerTotalHoursAgencyWorkedByRegionService(
      capacityTrackerTotalHoursAgencyWorkedByRegionData,
      capacityTrackerTotalHoursAgencyWorkedByLaData
    );

  const metricCardsData: Array<MetricCardData> = [
    capacityTrackerTotalHoursAgencyWorkedByRegionService.getMetricCardData(),
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
              <h1 className="govuk-heading-l">Homepage</h1>
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
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <h3 className="govuk-heading-s">Headline metrics</h3>
            </div>
          </div>
          {metricCardsData.map((_, index) => {
            if (index % 2 === 0) {
              return (
                <div className="govuk-grid-row" key={index}>
                  <div className="govuk-grid-column-one-half">
                    <MetricCard data={metricCardsData[index]} />
                  </div>
                  {metricCardsData[index + 1] && (
                    <div className="govuk-grid-column-one-half">
                      <MetricCard data={metricCardsData[index + 1]} />
                    </div>
                  )}
                </div>
              );
            }
            return null;
          })}
          <HomePageAddFavouriteMetricsPanel />
          <HomePageDataUpdatesPanel />
          <HomePageDataDefinitionsPanel />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
