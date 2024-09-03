import React from "react";
import Layout from "../../components/layout/Layout";
import { Breadcrumb } from "../../data/interfaces/Breadcrumb";
import DataCategoriesPanel from "../../components/data-categories-panel/DataCategoriesPanel";
import YourMetricsPanel from "../../components/your-metrics-panel/YourMetricsPanel";
import MetadataPanel from "../../components/metadata-panel/MetadataPanel";
import RecentPublicationsPanel from "../../components/recent-publications-panel/RecentPublicationsPanel";

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
      </div>
    </Layout>
  );
};

export default HomePage;
