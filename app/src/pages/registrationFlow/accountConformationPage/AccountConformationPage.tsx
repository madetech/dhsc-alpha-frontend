import * as GovUK from 'govuk-react';
import React from 'react';
import Layout from '../../../components/layout/Layout';
const AccountConformationPage: React.FC = () => {
    return (
        <>
            <Layout>
                <GovUK.Panel title="Application complete">
                    <GovUK.Paragraph>
                        Thank you for signing up to DAP You can now login to the
                        system
                    </GovUK.Paragraph>
                </GovUK.Panel>
            </Layout>
        </>
    );
};

export default AccountConformationPage;
