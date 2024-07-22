import React from 'react';
import Layout from '../../components/layout/Layout';
import * as GovUK from 'govuk-react';

const AboutPage: React.FC = () => {
    return (
        <>
            <Layout>
                <GovUK.H1>About us</GovUK.H1>
                <GovUK.Paragraph>
                    We support ministers in leading the nation’s health and
                    social care to help people live more independent, healthier
                    lives for longer. DHSC have set out a commitment to launch a
                    digital product by Winter 2024 enabling the appropriate and
                    effective sharing of data and insights for priority
                    stakeholders across the adult social care (ASC) sector.
                </GovUK.Paragraph>
                <GovUK.H3>Our Goal For DHSC Data Access Tool</GovUK.H3>
                <GovUK.Paragraph>
                    To launch a digital product by winter 2024 enabling the
                    appropriate and effective sharing of data and insights for
                    priority stakeholders across the adult social care sector
                    (LAs, care providers and DHSC), with the potential for
                    expansion to wider stakeholders such as CQC, ICS’ and other
                    areas of government.
                </GovUK.Paragraph>
                <GovUK.H3>Why Are We Doing This?</GovUK.H3>
                <GovUK.UnorderedList>
                    <GovUK.ListItem>
                        To improve both quality and efficiency of data and
                        insight analysis at a local, regional and national level
                    </GovUK.ListItem>
                    <GovUK.ListItem>
                        To enable better decision making across all stakeholders
                        to improve the delivery of high-quality care across the
                        sector
                    </GovUK.ListItem>
                    <GovUK.ListItem>
                        To reduce siloed data sharing and alleviate cost and
                        effort inefficiencies
                    </GovUK.ListItem>
                    <GovUK.ListItem>
                        To enhance data and insights sharing within the adult
                        social care sector using NHS as a ‘baseline’
                    </GovUK.ListItem>
                </GovUK.UnorderedList>
                <GovUK.SectionBreak level="LARGE" visible />
                <GovUK.Caption size="M">Discovery</GovUK.Caption>
                <GovUK.Heading size="M">
                    To understand the current state and opportunities for the
                    data access solution we researched both within and outside
                    of the ASC sector
                </GovUK.Heading>
                <GovUK.GridRow>
                    <GovUK.GridCol setWidth="one-half">
                        <GovUK.H5>Objectives</GovUK.H5>
                        <GovUK.UnorderedList>
                            <GovUK.ListItem>
                                To identify the information, data, and insights
                                needed, expected, and desired to inform
                                decisions being made in the future
                            </GovUK.ListItem>
                            <GovUK.ListItem>
                                To determine the most appealing and effective
                                method of sharing information back to end-users
                            </GovUK.ListItem>
                            <GovUK.ListItem>
                                To identify stakeholder information priorities
                                to inform the first solution release/MVP,
                                backlog and future iterations
                            </GovUK.ListItem>
                        </GovUK.UnorderedList>
                    </GovUK.GridCol>
                    <GovUK.GridCol setWidth="one-half">
                        <GovUK.H5>What we did</GovUK.H5>
                        <GovUK.UnorderedList>
                            <GovUK.ListItem>
                                Conducted 33+ in-depth interviews with over 60
                                individuals across our primary end-user groups
                            </GovUK.ListItem>
                            <GovUK.ListItem>
                                Engaged ~204 end-users through a free-text
                                survey
                            </GovUK.ListItem>
                            <GovUK.ListItem>
                                Reviewed nine tools and platforms (e.g., LG
                                Inform, Capacity Tracker, SCIP)
                            </GovUK.ListItem>
                            <GovUK.ListItem>
                                Held four technical demos
                            </GovUK.ListItem>
                            <GovUK.ListItem>
                                Conducted over 15+ hours of analysis and desk
                                review
                            </GovUK.ListItem>
                        </GovUK.UnorderedList>
                    </GovUK.GridCol>
                </GovUK.GridRow>
                <GovUK.H5>Is There Demand?</GovUK.H5>
                <GovUK.UnorderedList>
                    <GovUK.ListItem>
                        All priority users describe challenges in accessing and
                        using data to support decision making in their roles and
                        ultimately in improving outcomes for people who drawn on
                        care
                    </GovUK.ListItem>
                    <GovUK.ListItem>
                        All priority users see value in a potential adult social
                        care Access Solution and can identify use cases for the
                        solution
                    </GovUK.ListItem>
                    <GovUK.ListItem>
                        A single source of the truth is universally desirable
                    </GovUK.ListItem>
                </GovUK.UnorderedList>
                <GovUK.H5>Is It Worth It?</GovUK.H5>
                <GovUK.UnorderedList>
                    <GovUK.ListItem>
                        Priority users could improve quality of care through
                        improved decision making from better access to adult
                        social care data
                    </GovUK.ListItem>
                    <GovUK.ListItem>
                        A lack of a single source of the truth, and curated
                        information means lots of time is wasted in duplication
                        efforts and pre-work which could be reduced through a
                        solution
                    </GovUK.ListItem>
                    <GovUK.ListItem>
                        Value returned to priority users depends on the nature
                        of the data and information that will be available and
                        the level it can be analysed in the solution
                    </GovUK.ListItem>
                    <GovUK.ListItem>
                        Many priority users reported that improved access to
                        data would improve data collection and quality
                    </GovUK.ListItem>
                </GovUK.UnorderedList>
            </Layout>
        </>
    );
};

export default AboutPage;
