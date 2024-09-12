import React, { FunctionComponentElement, useState } from "react";
import Layout from "../../components/standard-components/layout/Layout";
import { Breadcrumb } from "../../data/interfaces/Breadcrumb";
import HomePageMainSearch from "../../components/home-page-components/home-page-main-search/HomePageMainSearch";
import HomePageOrganisationFilter from "../../components/home-page-components/home-page-organisation-filter/HomePageOrganisationFilter";
import { MetricCardData } from "../../data/interfaces/MetricCardData";
import HomePageDataUpdatesPanel from "../../components/home-page-components/home-page-data-updates-panel/HomePageDataUpdatesPanel";
import HomePageDataDefinitionsPanel from "../../components/home-page-components/home-page-data-definitions-panel/HomePageDataDefinitionsPanel";
import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../../data/types/LoaderData";
import CapacityTrackerTotalHoursAgencyWorkedByRegionService from "../../services/capacity-tracker/CapacityTrackerTotalHoursAgencyWorkedByRegionService";
import MetricCard from "../../components/metric-components/metric-card/MetricCard";
import HomePageAddFavouriteMetricsPanel from "../../components/home-page-components/home-page-add-favourite-metrics-panel/FavouriteMetricsPanel";
import DataCategoriesSidePanel from "../../components/panels/data-categories-side-panel/DataCategoriesSidePanel";
import YourMetricsSidePanel from "../../components/panels/your-metrics-side-panel/YourMetricsSidePanel";
import MetadataSidePanel from "../../components/panels/metadata-side-panel/MetadataSidePanel";
import RecentPublicationsSidePanel from "../../components/panels/recent-publications-side-panel/RecentPublicationsSidePanel";

const HomePage: React.FC = () => {
  const [isMetricSelected, setIsMetricSelected] = useState<boolean>(false);
  const [selectedMetricComponent, setSelectedMetricComponent] =
    useState<FunctionComponentElement<any> | null>(null);

  const breadcrumbs: Array<Breadcrumb> = [
    {
      text: "Homepage",
      url: "/home",
    },
  ];

  const { capacityTrackerTotalHoursAgencyWorkedByRegionData } =
    useLoaderData() as LoaderData;

  const metricCardsData: Array<MetricCardData> = [
    new CapacityTrackerTotalHoursAgencyWorkedByRegionService(
      capacityTrackerTotalHoursAgencyWorkedByRegionData
    ).getMetricCardData(),
  ];

  const handleMetricSelect = (component: FunctionComponentElement<any>) => {
    setSelectedMetricComponent(() => component);
    setIsMetricSelected(true);
  };

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
              <YourMetricsSidePanel />
              <MetadataSidePanel />
              <RecentPublicationsSidePanel />
            </div>
          </div>
        </div>
        <div className="govuk-grid-column-two-thirds">
          <HomePageMainSearch />
          <hr className="govuk-section-break govuk-section-break--s govuk-section-break--visible govuk-!-margin-bottom-3"></hr>
          {isMetricSelected && selectedMetricComponent ? (
            selectedMetricComponent
          ) : (
            <>
              <HomePageOrganisationFilter />
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
                        <MetricCard
                          data={metricCardsData[index]}
                          onHandleMetricSelect={() =>
                            handleMetricSelect(metricCardsData[index].component)
                          }
                        />
                      </div>
                      {metricCardsData[index + 1] && (
                        <div className="govuk-grid-column-one-half">
                          <MetricCard
                            data={metricCardsData[index + 1]}
                            onHandleMetricSelect={() =>
                              handleMetricSelect(
                                metricCardsData[index + 1].component
                              )
                            }
                          />
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
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
