import * as GovUK from 'govuk-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import './HomePage.css';

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const navigateToRegistration = () =>
        navigate('/registration/first-name-last-name');

    return (
        <>
            <Layout>
                <GovUK.GridRow>
                    <GovUK.GridCol setWidth="two-thirds">
                        <div>
                            <GovUK.H1>
                                Adult social care data access portal
                            </GovUK.H1>
                            <GovUK.Paragraph>
                                Use this service to:
                            </GovUK.Paragraph>
                            <GovUK.UnorderedList>
                                <GovUK.ListItem>
                                    view Adult Social Care summary data
                                </GovUK.ListItem>
                                <GovUK.ListItem>
                                    view Quality of Care metrics
                                </GovUK.ListItem>
                                <GovUK.ListItem>
                                    view capacity within and between areas
                                </GovUK.ListItem>
                            </GovUK.UnorderedList>
                            <GovUK.Paragraph>
                                Registering takes around 2 minutes.
                            </GovUK.Paragraph>
                            <GovUK.Button
                                onClick={navigateToRegistration}
                                icon={<GovUK.ButtonArrow />}
                                start
                            >
                                Start
                            </GovUK.Button>
                            <GovUK.H4>Before you start</GovUK.H4>
                            <GovUK.Paragraph>
                                You can also register if ...
                            </GovUK.Paragraph>
                            <GovUK.Paragraph>
                                You cannot register for this service if ...
                            </GovUK.Paragraph>
                        </div>
                    </GovUK.GridCol>
                    <GovUK.GridCol setWidth="one-third">
                        <div>
                            <GovUK.GridRow className="subsection-heading-row">
                                <GovUK.H3 className="subsection-heading">
                                    Quick Links
                                </GovUK.H3>
                            </GovUK.GridRow>
                            <GovUK.GridRow mb={3}>
                                <GovUK.Link as={Link} to="/login">
                                    Login
                                </GovUK.Link>
                            </GovUK.GridRow>
                            <GovUK.GridRow mb={3}>
                                <GovUK.Link as={Link} to="/about">
                                    About Us
                                </GovUK.Link>
                            </GovUK.GridRow>

                            <GovUK.GridRow>
                                <GovUK.Link as={Link} to="/#">
                                    <strong>More</strong>
                                </GovUK.Link>
                            </GovUK.GridRow>
                        </div>
                    </GovUK.GridCol>
                </GovUK.GridRow>
            </Layout>
        </>
    );
};

export default HomePage;
