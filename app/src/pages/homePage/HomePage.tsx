import * as GovUK from 'govuk-react';
import React from 'react';
import Layout from '../../components/layout/Layout';

const HomePage: React.FC = () => {
    return (
        <>
            <Layout>
                <GovUK.H1>Home placeholder page</GovUK.H1>
                <GovUK.Link href="/ascof">Ascof Page Link</GovUK.Link>
            </Layout>
        </>
    );
};

export default HomePage;
