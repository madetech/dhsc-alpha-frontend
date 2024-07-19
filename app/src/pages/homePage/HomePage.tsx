import React from 'react';
import Layout from '../../components/layout/Layout';
import { Link } from 'react-router-dom';
import * as GovUK from 'govuk-react';

function HomePage() {
    const pageHeader = 'Welcome to the dhsc-alpha-frontend application.';

    return (
        <>
            <Layout>
                <GovUK.H1>{pageHeader}</GovUK.H1>
                <GovUK.Paragraph> Welcome to the Example App</GovUK.Paragraph>
                <GovUK.Link as={Link} to="/about-page">
                    About us
                </GovUK.Link>
            </Layout>
        </>
    );
}

export default HomePage;
