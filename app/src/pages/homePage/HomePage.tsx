import React from 'react';
import Layout from '../../components/layout/Layout';
import { Link } from 'react-router-dom';
import * as GovUK from 'govuk-react';

const HomePage: React.FC = () => {
    const pageHeader = 'Welcome to the dhsc-alpha-frontend application.';

    return (
        <>
            <Layout>
                <GovUK.H1>{pageHeader}</GovUK.H1>
                <GovUK.Paragraph> Welcome to the Example App</GovUK.Paragraph>
                <div>
                    <GovUK.Link as={Link} to="/ascof">
                        ASCOF data
                    </GovUK.Link>
                </div>
                <div>
                    <GovUK.Link as={Link} to="/about">
                        About us
                    </GovUK.Link>
                </div>
            </Layout>
        </>
    );
};

export default HomePage;
