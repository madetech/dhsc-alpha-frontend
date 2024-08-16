import React from 'react';
import * as GovUK from 'govuk-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <GovUK.TopNav
            serviceTitle={
                <GovUK.TopNav.Anchor as={Link} to="/">
                    DHSC Data Access Tool Alpha
                </GovUK.TopNav.Anchor>
            }
        >
            <GovUK.TopNav.NavLink as={Link} to="/ascof">
                ASCOF Data Charts
            </GovUK.TopNav.NavLink>
            <GovUK.TopNav.NavLink as={Link} to="/about">
                About Us
            </GovUK.TopNav.NavLink>
            <GovUK.TopNav.NavLink as={Link} to="/chart-placeholders">
                Chart Placeholders
            </GovUK.TopNav.NavLink>
        </GovUK.TopNav>
    );
};

export default Navbar;
