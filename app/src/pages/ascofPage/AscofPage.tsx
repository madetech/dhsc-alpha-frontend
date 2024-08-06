import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import * as GovUK from 'govuk-react';
import Barchart from '../../components/barchart/Barchart';
import GetAscofData from '../../api/api';
import { ChartData } from '../../data/interfaces/BarchartProps';
import { ASCOFData } from '../../data/interfaces/ASCOFData';

const AscofPage: React.FC = () => {
    const [ascofData, setAscofData] = useState<ChartData[]>([]);
    const [ascofMetrics, setAscofMetrics] = useState<string[]>([]);
    const [selectedAscofMetric, setSelectedAscofMetric] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchAndProcessData = async (): Promise<void> => {
            try {
                const ascofApiResponse: ASCOFData[] = await GetAscofData();
                if (ascofApiResponse) {
                    const metrics: string[] =
                        extractUniqueMetrics(ascofApiResponse);

                    const transformedData: ChartData[] =
                        transformToChartData(ascofApiResponse);

                    updateState(metrics, transformedData);
                }
            } catch (error) {
                handleError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAndProcessData();
    }, []);

    const extractUniqueMetrics = (data: ASCOFData[]): string[] => {
        return Array.from(
            new Set(
                data.map((entry: ASCOFData) => entry.measure_group_description)
            )
        );
    };

    const transformToChartData = (data: ASCOFData[]): ChartData[] => {
        return data.map((entry: ASCOFData) => ({
            xAxisValue: entry.geographical_description,
            metric: entry.measure_group_description,
            value: entry.outcome,
        }));
    };

    const updateState = (metrics: string[], data: ChartData[]): void => {
        setAscofMetrics(metrics);
        setSelectedAscofMetric(metrics[0]);
        setAscofData(data);
    };

    const handleError = (error: unknown): void => {
        console.error('Error loading or parsing data:', error);
    };

    const handleMetricChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSelectedAscofMetric(event.target.value);
    };

    const filteredAscofData = ascofData.filter(
        (ascofEntry) => ascofEntry.metric === selectedAscofMetric
    );

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
                                value={selectedAscofMetric}
                                onChange={handleMetricChange}
                                style={{ marginTop: '5px' }}
                            >
                                {ascofMetrics.map((metric) => (
                                    <option key={metric} value={metric}>
                                        {metric}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <Barchart
                            data={filteredAscofData}
                            xLabel="Region"
                            yLabel="Value"
                            title={`2023 ASCOF - ${selectedAscofMetric} Visualisation`}
                        />
                    </div>
                </GovUK.LoadingBox>
            </Layout>
        </>
    );
};

export default AscofPage;
