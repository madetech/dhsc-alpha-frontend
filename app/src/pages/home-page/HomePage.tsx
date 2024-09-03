import React from "react";
import Layout from "../../components/layout/Layout";
import { Breadcrumb } from "../../data/interfaces/Breadcrumb";
import DataCategoriesPanel from "../../components/data-categories-panel/DataCategoriesPanel";

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
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
