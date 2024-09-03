import React, { MouseEvent, ReactNode, useEffect, useRef } from "react";
import { initAll } from "../../assets/js/govuk-frontend.min.js";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { focusMainContent } from "../../helpers/ManageFocus.js";
import PhaseBanner from "../phase-banner/PhaseBanner.js";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs.js";
import { Breadcrumb } from "../../data/interfaces/Breadcrumb.js";

type Props = {
  children: ReactNode;
  breadcrumbs?: Array<Breadcrumb>;
};

const Layout: React.FC<Props> = ({ children, breadcrumbs }) => {
  const layoutRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    initAll();
  }, []);

  return (
    <div ref={layoutRef} tabIndex={-1} id="layout">
      <a
        href="#"
        className="govuk-skip-link"
        onClick={(e: MouseEvent<HTMLAnchorElement>) =>
          focusMainContent(e, mainRef)
        }
      >
        Skip to main content
      </a>
      <Header />
      <div className="govuk-width-container">
        <PhaseBanner />
        {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
        <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing">
          <div id="main-content">{children}</div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
