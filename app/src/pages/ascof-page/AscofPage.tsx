import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { BarchartData } from "../../data/interfaces/BarchartData";
import Barchart from "../../components/barchart/Barchart";
import { useLoaderData, useNavigation } from "react-router-dom";
import { AscofData } from "../../data/interfaces/AscofData";
import { LoaderData } from "../../data/types/LoaderData";
import LoadingSpinner from "../../components/loading-spinner/LoadingSpinner";

const extractUniqueMetrics = (data: AscofData[]): string[] => {
  return Array.from(
    new Set(data.map((entry: AscofData) => entry.measure_group_description))
  );
};

const transformToChartData = (data: AscofData[]): BarchartData[] => {
  return data.map((entry: AscofData) => ({
    xAxisValue: entry.geographical_description,
    metric: entry.measure_group_description,
    value: entry.outcome,
  }));
};

const AscofPage: React.FC = () => {
  const { ascofData } = useLoaderData() as LoaderData;
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const [transformedAscofData, setTransformedAscofData] = useState<
    BarchartData[]
  >([]);
  const [ascofMetrics, setAscofMetrics] = useState<string[]>([]);
  const [selectedAscofMetric, setSelectedAscofMetric] = useState<string>("");

  useEffect(() => {
    const metrics: string[] = extractUniqueMetrics(ascofData);
    setAscofMetrics(metrics);
    setSelectedAscofMetric(metrics[0]);
    setTransformedAscofData(transformToChartData(ascofData));
  }, [ascofData]);

  const handleMetricChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAscofMetric(event.target.value);
  };

  const filteredAscofData = transformedAscofData.filter(
    (ascofEntry) => ascofEntry.metric === selectedAscofMetric
  );

  return (
    <Layout>
      {isLoading && <LoadingSpinner />}
      <h1 className="govuk-heading-l">ASCOF Data Charts</h1>
      <p className="govuk-body">
        The Adult Social Care Outcomes Framework (ASCOF) measures how well care
        and support services achieve the outcomes that matter most to people.
        The ASCOF is used both locally and nationally to set priorities for care
        and support, measure progress and strengthen transparency and
        accountability.
      </p>
      <h2 className="govuk-heading-m">Further ASCOF Information</h2>
      <ul className="govuk-list govuk-list--bullet">
        <li>Publication Date: 7 Dec 2023</li>
        <li>Geographic Coverage: England</li>
        <li>
          Geographical Granularity: Country, Regions, Councils with Adult Social
          Services Responsibilities (CASSRs), Local Authorities
        </li>
      </ul>
      <h3 className="govuk-heading-s">ASCOF Data Visualisation</h3>

      <div className="govuk-form-group">
        <label className="govuk-label" htmlFor="select-metric">
          Select Metric
        </label>
        <select
          className="govuk-select"
          id="select-metric"
          name="select-metric"
          onChange={handleMetricChange}
        >
          {ascofMetrics.map((metric) => (
            <option key={metric} value={metric}>
              {metric}
            </option>
          ))}
        </select>
        <Barchart
          data={filteredAscofData}
          xLabel="Region"
          yLabel="Value"
          title={`2023 ASCOF - ${selectedAscofMetric}`}
        />
      </div>
    </Layout>
  );
};

export default AscofPage;
