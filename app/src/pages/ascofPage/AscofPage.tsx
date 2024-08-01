import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import * as GovUK from 'govuk-react';
import Barchart from '../../components/barchart/Barchart';
import GetAscofData from '../../api/api';
import { ASCOFData } from '../../data/interfaces/ASCOFData';
import { ChartData } from '../../data/interfaces/BarchartProps';

const AscofPage: React.FC = () => {
    const [data, setData] = useState<ChartData[]>([]);
    const [metrics, setMetrics] = useState<string[]>([]);
    const [selectedMetric, setSelectedMetric] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseData = await GetAscofData();
                if (responseData) {
                    const uniqueMetrics = Array.from(
                        new Set(
                            responseData.map((d) => d.measure_group_description)
                        )
                    );
                    setMetrics(uniqueMetrics);
                    setSelectedMetric(uniqueMetrics[0]);

                    const transformedData: ChartData[] = responseData.map(
                        (d) => ({
                            x_axis_value: d.geographical_description,
                            metric: d.measure_group_description,
                            value: d.outcome,
                        })
                    );

                    setData(transformedData);
                }
            } catch (error) {
                console.error('Error loading or parsing data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleMetricChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSelectedMetric(event.target.value);
    };

    const filteredData = data.filter((d) => d.metric === selectedMetric);

    return (
        <>
            <Layout>
                <GovUK.H1>ASCOF Data Charts</GovUK.H1>
                <GovUK.Paragraph>
                    The Adult Social Care Outcomes Framework (ASCOF) measures
                    how well care and support services achieve the outcomes that
                    matter most to people. The ASCOF is used both locally and
                    nationally to set priorities for care and support, measure
                    progress and strengthen transparency and accountability.
                </GovUK.Paragraph>
                <GovUK.H5>Further ASCOF Information</GovUK.H5>
                <GovUK.UnorderedList>
                    <GovUK.ListItem>
                        Publication Date: 7 Dec 2023
                    </GovUK.ListItem>
                    <GovUK.ListItem>
                        Geographic Coverage: England
                    </GovUK.ListItem>
                    <GovUK.ListItem>
                        Geographical Granularity: Country, Regions, Councils
                        with Adult Social Services Responsibilities (CASSRs),
                        Local Authorities
                    </GovUK.ListItem>
                </GovUK.UnorderedList>
                <GovUK.H4>ASCOF Data Visualisation</GovUK.H4>
                <GovUK.LoadingBox loading={isLoading}>
                    <div data-testid="ascof-barchart">
                        <div style={{ margin: '20px 0' }}>
                            <label htmlFor="metric-select">
                                Select metric:
                            </label>
                            <select
                                id="metric-select"
                                value={selectedMetric}
                                onChange={handleMetricChange}
                            >
                                {metrics.map((metric) => (
                                    <option key={metric} value={metric}>
                                        {metric}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <Barchart
                            data={filteredData}
                            xKey="x_axis_value"
                            yKey="value"
                            xLabel="Region"
                            yLabel="Value"
                            title={`2023 ASCOF - ${selectedMetric} Visualisation`}
                        />
                    </div>
                </GovUK.LoadingBox>
            </Layout>
        </>
    );
};

export default AscofPage;
