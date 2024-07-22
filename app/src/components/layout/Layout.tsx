import React, { MouseEvent, useRef } from 'react';
import type { ReactNode } from 'react';
import * as GovUK from 'govuk-react';
import { manageFocus } from '../../helpers/ManageFocus';
import { Link } from 'react-router-dom';

type Props = {
    children: ReactNode;
};

const focusMainContent = (
    e: MouseEvent<HTMLAnchorElement>,
    mainRef: React.RefObject<HTMLDivElement>
) => {
    /**
     * Note: This function relies on the `document` object.
     * In case if we migrate to SSR approach in the future, we will need to review the logic here.
     */
    e.preventDefault();

    const firstHeadingElement = document?.getElementsByTagName('h1')?.[0];
    if (firstHeadingElement) {
        manageFocus(firstHeadingElement);
    } else if (mainRef.current) {
        manageFocus(mainRef.current);
    }
};

const Layout: React.FC<Props> = ({ children }) => {
    // re-focus the layout on route change, so that skip link become the next focusable element

    const layoutRef = useRef<HTMLDivElement | null>(null);
    const mainRef = useRef<HTMLDivElement | null>(null);

    return (
        <div ref={layoutRef} tabIndex={-1} id="layout">
            <GovUK.GlobalStyle />
            <GovUK.SkipLink
                onClick={(e: MouseEvent<HTMLAnchorElement>) =>
                    focusMainContent(e, mainRef)
                }
            >
                Skip to main content
            </GovUK.SkipLink>
            <GovUK.TopNav
                serviceTitle={
                    <GovUK.TopNav.Anchor as={Link} to="/">
                        DHSC Data Access Tool Alpha
                    </GovUK.TopNav.Anchor>
                }
            />
            <GovUK.Page.WidthContainer>
                <GovUK.PhaseBanner level="alpha">
                    This part of GOV.UK is being built
                </GovUK.PhaseBanner>
                <GovUK.Page.Main>
                    <div ref={mainRef}>{children}</div>
                </GovUK.Page.Main>
            </GovUK.Page.WidthContainer>
            <GovUK.Footer />
        </div>
    );
};

export default Layout;
