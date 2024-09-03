import React from "react";
import Layout from "../../components/layout/Layout";
import { Breadcrumb } from "../../data/interfaces/Breadcrumb";
import DataCategoriesPanel from "../../components/data-categories-panel/DataCategoriesPanel";
import YourMetricsPanel from "../../components/your-metrics-panel/YourMetricsPanel";
import MetadataPanel from "../../components/metadata-panel/MetadataPanel";
import RecentPublicationsPanel from "../../components/recent-publications-panel/RecentPublicationsPanel";
import HomePageMainSearch from "../../components/home-page-main-search/HomePageMainSearch";
import HomePageOrganisationFilter from "../../components/home-page-organisation-filter/HomePageOrganisationFilter";

const HomePage: React.FC = () => {
  const breadcrumbs: Array<Breadcrumb> = [
    {
      text: "Homepage",
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
          <hr className="govuk-section-break govuk-section-break--s govuk-section-break--visible"></hr>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
