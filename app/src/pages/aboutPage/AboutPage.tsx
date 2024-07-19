import React from 'react';
import Layout from '../../components/layout/Layout';
import * as GovUK from 'govuk-react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
    const pageHeader: String = 'This is a about page to test routing';

    return (
        <>
            <Layout>
                <GovUK.H1>{pageHeader}</GovUK.H1>
                <GovUK.Paragraph>
                    Welcome to the Second App Page for About us!!
                </GovUK.Paragraph>
                <GovUK.Link as={Link} to="/">
                    Home
                </GovUK.Link>
            </Layout>
        </>
    );
};

export default AboutPage;
