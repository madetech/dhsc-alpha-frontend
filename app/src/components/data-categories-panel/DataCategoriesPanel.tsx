import React from "react";
import "./dataCategoriesPanel.scss";

const DataCategoriesPanel: React.FC = () => {
  const dataCategories: Array<string> = [
    "Quality of care",
    "User outcomes",
    "Financial health of the ASC sector",
    "ASC capacity",
    "ASC workforce",
    "Demand and demographics",
  ];

  return (
    <div className="dhsc-data-category-panel-container">
      <h1 className="govuk-heading-m dhsc-!-text-white">Data categories</h1>
      <ul className="govuk-list govuk-list--bullet">
        {dataCategories.map((dataCategory) => (
          <li className="govuk-!-margin-bottom-0 dhsc-!-text-white">
            <a
              className="govuk-link dhsc-!-text-white govuk-!-font-weight-bold"
              href="#"
            >
              {dataCategory}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataCategoriesPanel;
