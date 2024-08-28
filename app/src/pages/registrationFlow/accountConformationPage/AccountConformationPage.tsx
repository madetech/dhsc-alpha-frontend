import * as GovUK from 'govuk-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../components/layout/Layout';
const AccountConformationPage: React.FC = () => {
    const navigate = useNavigate();
    const navigateToLoginPage = () => navigate('/login');
    return (
        <>
            <Layout>
                <GovUK.GridRow>
                    <GovUK.GridCol>
                        <GovUK.Panel title="Application complete">
                            <GovUK.Paragraph>
                                Thank you for signing up to the adult social
                                care data access portal You can now login to the
                                system
                            </GovUK.Paragraph>
                            <GovUK.Button
                                onClick={navigateToLoginPage}
                                buttonColour="#000000"
                            >
                                Login
                            </GovUK.Button>
                        </GovUK.Panel>
                    </GovUK.GridCol>
                </GovUK.GridRow>
            </Layout>
        </>
    );
};

export default AccountConformationPage;
