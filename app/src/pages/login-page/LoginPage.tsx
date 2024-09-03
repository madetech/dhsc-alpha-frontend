import React, { useCallback, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import StandardButton from "../../components/buttons/functionality/standard-button/StandardButton";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const handleSubmit = useCallback(() => {
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("email", email);
    navigate("/");
  }, [email]);

  return (
    <Layout showLoginInformation={false}>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1 className="govuk-heading-l">Sign In</h1>
          <fieldset className="govuk-fieldset">
            <div className="govuk-form-group">
              <label className="govuk-label">Enter your email address</label>
              <input
                className="govuk-input govuk-input--width-20"
                type="text"
                onChange={(e: any) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="govuk-form-group">
              <label className="govuk-label">Enter your password</label>
              <input
                className="govuk-input govuk-input--width-20"
                type="password"
              />
            </div>
          </fieldset>
          <StandardButton
            buttonString="Login"
            buttonFunction={handleSubmit}
          ></StandardButton>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
