import React from "react";

const RecentPublicationsPanel: React.FC = () => {
  const reports: Array<string> = [
    "Sample report one",
    "Sample report two including...",
    "Sample report three excluding...",
  ];

  return (
    <div className="dhsc-grey-panel-container">
      <h1 className="govuk-heading-s">Recent Publications</h1>
      <p className="govuk-body-s">
        Here is a collection of information on all the data sources we hold
      </p>
      <ul className="govuk-list govuk-list--bullet">
        {reports.map((report) => (
          <li className="govuk-!-margin-bottom-0">
            <a className="govuk-link" href="#">
              {report}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentPublicationsPanel;
