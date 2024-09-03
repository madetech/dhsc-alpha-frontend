import React from "react";

const YourMetricsPanel: React.FC = () => {
  return (
    <div className="dhsc-blue-panel-container">
      <h1 className="govuk-heading-m dhsc-!-text-white">Your metrics</h1>
      <ul className="govuk-list govuk-list--bullet">
        <li className="govuk-!-margin-bottom-0 dhsc-!-text-white">
          <a
            className="govuk-link dhsc-!-text-white govuk-!-font-weight-bold"
            href="#"
          >
            View your metrics
          </a>
        </li>
      </ul>
    </div>
  );
};

export default YourMetricsPanel;
