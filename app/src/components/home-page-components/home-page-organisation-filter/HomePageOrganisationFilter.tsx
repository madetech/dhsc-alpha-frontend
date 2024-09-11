import React from "react";

const HomePageOrganisationFilter: React.FC = () => {
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-one-half govuk-!-text-align-right">
        <p className="govuk-body-s govuk-!-margin-top-2 govuk-!-margin-bottom-2">
          Organisation View:
        </p>
      </div>
      <div className="govuk-grid-column-one-quarter govuk-!-padding-left-0">
        <div className="govuk-form-group govuk-!-margin-bottom-3">
          <select className="govuk-select">
            <option>North Lincolnshire</option>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
        </div>
      </div>
      <div className="govuk-!-text-align-right govuk-!-margin-right-3">
        <button
          type="submit"
          className="govuk-button govuk-button--secondary govuk-!-margin-bottom-3"
          data-module="govuk-button"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default HomePageOrganisationFilter;
