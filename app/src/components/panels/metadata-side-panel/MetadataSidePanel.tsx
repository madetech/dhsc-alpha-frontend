import React from "react";
import Details from "../../standard-components/details/Details";

const MetadataSidePanel: React.FC = () => {
  const detailContents = "lorem ipsum lorem ipsum lorem ipsum lorem ipsum";
  return (
    <div className="dhsc-grey-panel-container">
      <h1 className="govuk-heading-s">Metadata</h1>
      <p className="govuk-body-s">
        Background information on all the data sources we hold
      </p>
      <Details link="View the metadata" contents={detailContents} />
    </div>
  );
};

export default MetadataSidePanel;
