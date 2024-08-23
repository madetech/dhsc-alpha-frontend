import React, { MouseEvent, useRef } from 'react';
import type { ReactNode } from 'react';
import * as GovUK from 'govuk-react';
import { manageFocus } from '../../helpers/ManageFocus';
import Navbar from '../navbar/Navbar';
import './layout.css';

type Props = {
    children: ReactNode;
};

const focusMainContent = (
    e: MouseEvent<HTMLAnchorElement>,
    mainRef: React.RefObject<HTMLDivElement>
) => {
    e.preventDefault();

    const firstHeadingElement = document?.getElementsByTagName('h1')?.[0];
    if (firstHeadingElement) {
        manageFocus(firstHeadingElement);
    } else if (mainRef.current) {
        manageFocus(mainRef.current);
    }
};

const Layout: React.FC<Props> = ({ children }) => {
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
            <Navbar />
            <GovUK.Page.WidthContainer>
                <GovUK.PhaseBanner level="alpha">
                    This part of GOV.UK is being built
                </GovUK.PhaseBanner>
                <GovUK.Page.Main className="main">
                    <div ref={mainRef}>{children}</div>
                </GovUK.Page.Main>
            </GovUK.Page.WidthContainer>
            <GovUK.Footer className="footer" />
        </div>
    );
};

export default Layout;
