import Layout from '../../components/layout/Layout';
import Linechart from '../../components/linechart/Linechart';
import { LinechartData } from '../../data/interfaces/LinechartProps';
import * as GovUK from 'govuk-react';
import React from 'react';

const ChartPlaceholderPage: React.FC = () => {
    const lineChartData: LinechartData[] = [
        { x: new Date('2023-01-01'), y: 20 },
        { x: new Date('2023-02-01'), y: 25 },
        { x: new Date('2023-03-01'), y: 22 },
        { x: new Date('2023-04-01'), y: 30 },
        { x: new Date('2023-05-01'), y: 28 },
        { x: new Date('2023-06-01'), y: 35 },
    ];

    return (
        <>
            <Layout>
                <GovUK.H1>Chart Placeholder Page</GovUK.H1>
                <GovUK.Paragraph>
                    This is currently a dummy page holding different graph
                    types. This page will soon be transformed to show insights
                    to additional public data like the ASCOF page
                </GovUK.Paragraph>
                <GovUK.H4>Line Chart Dummy</GovUK.H4>
                <Linechart
                    data={lineChartData}
                    xLabel="Date"
                    yLabel="Value"
                    title="Monthly Value Changes"
                />
            </Layout>
        </>
    );
};

export default ChartPlaceholderPage;
