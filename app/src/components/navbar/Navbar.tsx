import * as GovUK from 'govuk-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <GovUK.TopNav
            serviceTitle={
                <GovUK.TopNav.Anchor as={Link} to="/home">
                    Adult social care data access portal
                </GovUK.TopNav.Anchor>
            }
        ></GovUK.TopNav>
    );
};

export default Navbar;
