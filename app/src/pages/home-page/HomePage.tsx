import React from "react";
import Layout from "../../components/layout/Layout";
import { Breadcrumb } from "../../data/interfaces/Breadcrumb";
import DataCategoriesPanel from "../../components/data-categories-panel/DataCategoriesPanel";
import YourMetricsPanel from "../../components/your-metrics-panel/YourMetricsPanel";
import MetadataPanel from "../../components/metadata-panel/MetadataPanel";
import RecentPublicationsPanel from "../../components/recent-publications-panel/RecentPublicationsPanel";
import HomePageMainSearch from "../../components/home-page-main-search/HomePageMainSearch";
import HomePageOrganisationFilter from "../../components/home-page-organisation-filter/HomePageOrganisationFilter";
import MetricCard from "../../components/metric-card/MetricCard";
import { MetricCardData } from "../../data/interfaces/MetricCardData";
import cardPlaceHolderImage from "../../assets/images/metricCardPlaceholder.svg";
import cardPlaceholderImageHistogram from "../../assets/images/metricCardPlaceholderHistogram.svg";
import FavouriteMetricsPanel from "../../components/favourite-metrics-panel/FavouriteMetricsPanel";

const HomePage: React.FC = () => {
  const breadcrumbs: Array<Breadcrumb> = [
    {
      text: "Homepage",
      url: "/home",
    },
  ];

  const metricCardsData: Array<MetricCardData> = [
    {
      title: "Qol by expenditure",
      svg: cardPlaceHolderImage,
      description:
        "Comparing social care quality of life to total expenditure on care at your authority",
      sourceUrl: "#",
      sourceLinkString: "XXX",
      metricPageUrl: "#",
      limitationDescription: "lorem lorem lorem lorem lorem lorem",
    },
    {
      title: "Size of care providers by area",
      svg: cardPlaceholderImageHistogram,
      description:
        "Care home bed capacity and the sizes of the care homes on the market",
      sourceUrl: "#",
      sourceLinkString: "XXX",
      metricPageUrl: "#",
      limitationDescription: "lorem lorem lorem lorem lorem lorem",
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
              <h1 className="govuk-heading-l">Homepage</h1>
              <DataCategoriesPanel />
              <YourMetricsPanel />
              <MetadataPanel />
              <RecentPublicationsPanel />
            </div>
          </div>
        </div>
        <div className="govuk-grid-column-two-thirds">
          <HomePageMainSearch />
          <hr className="govuk-section-break govuk-section-break--s govuk-section-break--visible govuk-!-margin-bottom-3"></hr>
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
          <FavouriteMetricsPanel />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
