import React from 'react';
import Layout from '../../components/layout/Layout';


function StartPage() {

    const pageHeader = 'Welcome to the dhsc-alpha-frontend application.';

    return (
        <>
        <Layout>
            <h1>{pageHeader}</h1>
            <p> Welcome to the Example App</p>
        </Layout>
        </>
    );
}

export default StartPage;