import React from "react";
import "./metricDetailsFilterBar.scss";

const MetricDetailsFilterBar: React.FC = () => {
  return (
    <>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-half">
          <p className="govuk-body govuk-!-margin-bottom-2">
            Data you are viewing
          </p>
        </div>
        <div className="govuk-grid-column-one-half govuk-!-text-align-right">
          <a
            href="/home"
            className="govuk-back-link govuk-!-margin-top-0  govuk-!-margin-bottom-2"
          >
            Back
          </a>
        </div>
      </div>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <div className="govuk-form-group govuk-!-margin-bottom-3">
            <select className="govuk-select dhsc-!-select-s govuk-!-margin-right-2">
              <option>Year</option>
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
            <select className="govuk-select dhsc-!-select-s govuk-!-margin-right-2">
              <option>Regional</option>
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
            <button
              type="submit"
              className="govuk-button govuk-button--secondary govuk-!-margin-bottom-3"
              data-module="govuk-button"
            >
              Update
            </button>
          </div>
        </div>
        <div className="govuk-grid-column-one-third govuk-!-padding-left-0">
          <div className="govuk-form-group govuk-!-margin-bottom-3">
            <select className="govuk-select dhsc-!-select-s govuk-!-margin-right-2">
              <option>Barchart</option>
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
            <button
              type="submit"
              className="govuk-button govuk-button--secondary govuk-!-margin-bottom-3"
              data-module="govuk-button"
            >
              Update
            </button>
          </div>
        </div>
      </div>
      <hr className="govuk-section-break govuk-section-break--s govuk-section-break--visible govuk-!-margin-bottom-5"></hr>
    </>
  );
};

export default MetricDetailsFilterBar;
