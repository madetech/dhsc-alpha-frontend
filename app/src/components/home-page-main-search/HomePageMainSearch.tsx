import React from "react";

const HomePageMainSearch: React.FC = () => {
  return (
    <>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-half govuk-!-padding-right-0">
          <div className="govuk-form-group govuk-!-margin-bottom-2">
            <span className="govuk-body-s govuk-!-font-weight-bold govuk-!-margin-right-2">
              Search
            </span>
            <input
              className="govuk-input govuk-!-width-three-quarters"
              type="text"
            />
          </div>
        </div>
        <div className="govuk-grid-column-one-quarter govuk-!-padding-left-0">
          <div className="govuk-form-group govuk-!-margin-bottom-2">
            <select className="govuk-select">
              <option>All categories</option>
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
        </div>
        <div className="govuk-grid-column-one-quarter govuk-!-text-align-right">
          <button
            type="submit"
            className="govuk-button govuk-button--secondary govuk-!-margin-bottom-2"
            data-module="govuk-button"
          >
            Search
          </button>
        </div>
      </div>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full govuk-!-text-align-right">
          <p className="govuk-body-s">
            <a href="#" className="govuk-link">
              Advanced search
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default HomePageMainSearch;
