import * as GovUK from "govuk-react";
import React from "react";
import ReactDOM from "react-dom/client";

import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <>
      <GovUK.GlobalStyle />
      <GovUK.TopNav></GovUK.TopNav>
      <GovUK.Page.WidthContainer>
        <GovUK.Page.Main>
          <GovUK.H2>Welcome to the dhsc-alpha-frontend application.</GovUK.H2>
        </GovUK.Page.Main>
      </GovUK.Page.WidthContainer>
      <GovUK.Footer />
    </>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
