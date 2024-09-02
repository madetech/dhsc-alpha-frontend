import React from "react";
import "./loadingPage.scss";
import Layout from "../../components/layout/Layout";

const LoadingPage: React.FC = () => {
  return (
    <Layout>
      <div className="govuk-!-text-align-centre loading-spinner-wrapper">
        <div className="loading-spinner"></div>
      </div>
    </Layout>
  );
};

export default LoadingPage;
