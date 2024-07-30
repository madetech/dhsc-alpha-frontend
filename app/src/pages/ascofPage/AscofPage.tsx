import React from 'react';
import Layout from '../../components/layout/Layout';
import Ascofbarchart from '../../components/ascofbarchart/Ascofbarchart';
import * as GovUK from 'govuk-react';

const AscofPage: React.FC = () => {
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
                <Ascofbarchart />
            </Layout>
        </>
    );
};

export default AscofPage;
