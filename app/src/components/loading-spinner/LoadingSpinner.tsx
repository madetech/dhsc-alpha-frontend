import React from "react";
import "./loadingSpinner.scss";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="govuk-!-text-align-centre loading-spinner-wrapper">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
