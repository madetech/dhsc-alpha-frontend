import React from 'react';
import Layout from '../../components/layout/Layout';
import * as GovUK from 'govuk-react';

const HomePage: React.FC = () => {
    const pageHeader = 'Welcome to the dhsc-alpha-frontend application.';

    return (
        <>
            <Layout>
                <GovUK.H1>{pageHeader}</GovUK.H1>
                <GovUK.Paragraph> Welcome to the Example App</GovUK.Paragraph>
            </Layout>
        </>
    );
};

export default HomePage;
