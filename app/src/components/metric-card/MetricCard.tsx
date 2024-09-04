import React from "react";
import Details from "../details/Details";
import cardPlaceHolderImage from "../../assets/images/metricCardPlaceholder.svg";

const MetricCard: React.FC = () => {
  return (
    <div className="dhsc-grey-panel-container">
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          <h3 className="govuk-heading-s">Qol by expenditure</h3>
        </div>
      </div>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          <img src={cardPlaceHolderImage} alt="" />
        </div>
      </div>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          <p className="govuk-body-s">
            Comparing social care quality of life to total expenditure on care
            at your authority
          </p>
        </div>
      </div>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-half">
          <p className="govuk-body-s">
            <a href="#" className="govuk-link">
              View metric
            </a>
          </p>
        </div>
        <div className="govuk-grid-column-one-half govuk-!-text-align-right">
          <p className="govuk-body-s">
            Source:{" "}
            <a href="#" className="govuk-link">
              XXX
            </a>
          </p>
        </div>
      </div>
      <div className="govuk-grid-row govuk-!-margin-bottom-2">
        <div className="govuk-grid-column-full">
          <Details
            link="Data limitations"
            contents="lorem lorem lorem lorem lorem lorem"
          />
        </div>
      </div>
      <hr className="govuk-section-break govuk-section-break--s govuk-section-break--visible govuk-!-margin-bottom-5"></hr>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <p className="govuk-body-s">
            <a href="#" className="govuk-link">
              Add to your metrics
            </a>
          </p>
        </div>
        <div className="govuk-grid-column-one-third govuk-!-text-align-right">
          <p className="govuk-body-s">
            <a href="#" className="govuk-link">
              Share
            </a>
          </p>
        </div>
      </div>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <div className="govuk-form-group govuk-!-margin-bottom-2">
            <select className="govuk-select">
              <option>Select download type</option>
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
        </div>
        <div className="govuk-grid-column govuk-!-text-align-right">
          <button
            type="submit"
            className="govuk-button govuk-!-margin-bottom-2 govuk-!-margin-right-3"
            data-module="govuk-button"
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
