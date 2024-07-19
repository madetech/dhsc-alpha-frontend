import React, { MouseEvent, useRef } from 'react';
import type { ReactNode } from 'react';
import { SkipLink, TopNav, GlobalStyle, Page, Footer } from 'govuk-react';
import { manageFocus } from '../../helpers/ManageFocus';

type Props = {
    children: ReactNode;
};

function Layout({ children }: Props) {
    const layoutRef = useRef<HTMLDivElement | null>(null);
    const mainRef = useRef<HTMLDivElement | null>(null);

    // re-focus the layout on route change, so that skip link become the next focusable element

    const focusMainContent = (e: MouseEvent<HTMLAnchorElement>) => {
        /**
         * Note: This function relies on the `document` object.
         * In case if we migrate to SSR approach in the future, we will need to review the logic here.
         */
        e.preventDefault();

        const firstHeadingElement = document?.getElementsByTagName('h1')?.[0];
        if (firstHeadingElement) {
            manageFocus(firstHeadingElement);
        } else if (mainRef?.current) {
            manageFocus(mainRef.current);
        }
    };

    return (
        <div ref={layoutRef} tabIndex={-1} id="layout">
            <GlobalStyle />
            <SkipLink onClick={focusMainContent}>Skip to main content</SkipLink>
            <TopNav />
            <Page.WidthContainer>
                <Page.Main>
                    <div>{children}</div>
                </Page.Main>
            </Page.WidthContainer>
            <Footer />
        </div>
    );
}

export default Layout;
