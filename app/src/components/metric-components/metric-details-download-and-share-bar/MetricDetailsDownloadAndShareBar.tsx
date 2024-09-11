import React from "react";

const MetricDetailsDownloadAndShareBar: React.FC = () => {
  return (
    <>
      <hr className="govuk-section-break govuk-section-break--s govuk-section-break--visible govuk-!-margin-bottom-2"></hr>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-half">
          <div className="govuk-!-margin-top-2">
            <a href="#" className="govuk-link govuk-!-margin-right-6">
              Add to your metrics
            </a>
            <a href="#" className="govuk-link">
              Share
            </a>
          </div>
        </div>
        <div className="govuk-grid-column-one-half govuk-!-text-align-right">
          <div className="govuk-form-group govuk-!-margin-bottom-2">
            <select className="govuk-select dhsc-!-select-s govuk-!-margin-right-2">
              <option>Select download type</option>
              <option>Graph</option>
              <option>Table</option>
            </select>
            <button
              type="submit"
              className="govuk-button govuk-button--secondary govuk-!-margin-bottom-0"
              data-module="govuk-button"
            >
              Go
            </button>
          </div>
        </div>
      </div>
      <hr className="govuk-section-break govuk-section-break--s govuk-section-break--visible govuk-!-margin-bottom-5"></hr>
    </>
  );
};

export default MetricDetailsDownloadAndShareBar;
