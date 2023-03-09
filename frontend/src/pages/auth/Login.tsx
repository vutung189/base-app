import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { login } from "api/Auth";
import { isLoggedIn, setLogin } from "api/browser";
import FormInput from "components/forms/FormInput";
import VerticalForm from "components/forms/VerticalForm";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Redirect, useLocation } from "react-router-dom";
import * as yup from "yup";
// components

import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import AuthLayout from "./AuthLayout";
import { ScreenRoutes } from "routes";

interface LocationState {
  from?: Location;
}

interface UserData {
  username: string;
  password: string;
  keepLogin: boolean;
}

const Login = () => {
  const { t } = useTranslation();
  const [isSubmitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  /*
    form validation schema
    */
  const schemaResolver = yupResolver(
    yup.object().shape({
      username: yup.string().required(t("Please enter Username")),
      password: yup.string().required(t("Please enter Password")),
    })
  );

  /*
    handle form submission
    */
  const onSubmit = async (formData: UserData) => {
    const { username, password } = formData;
    setSubmitting(true);
    const { statusCode, data } = await login({ username, password });
    setSubmitting(false);
    if (statusCode === 200 && data) {
      setErrorMessage("");
      setLogin(data.token);
      
      setTimeout(() => {
        // set cookie too slow
        let targetUrl = ScreenRoutes.List;
        const from = new URLSearchParams(window.location.search).get("from");
        if (from) {
          targetUrl = from;
        }
        window.open(targetUrl, "_self");
      }, 500);
    } else {
      setErrorMessage(t("Your username or password was incorrect!"));
    }
  };

  const location = useLocation<LocationState>();
  const redirectUrl =
    location.state && location.state.from ? location.state.from.pathname : "/";
  const userLoggedIn = isLoggedIn();

  return (
    <>
      {userLoggedIn && <Redirect to={redirectUrl}></Redirect>}

      <AuthLayout
        helpText={t("Enter your username and password")}
        bottomLinks={null}
      >
        <VerticalForm<UserData>
          onSubmit={onSubmit}
          resolver={schemaResolver}
          defaultValues={{ username: "", password: "", keepLogin: false }}
        >
          <Form.Control.Feedback type="invalid" className="d-block text-center">
            <>{errorMessage}</>
          </Form.Control.Feedback>
          <FormInput
            label={t("Username")}
            type="text"
            name="username"
            placeholder="Username"
            containerClass={"mb-3"}
            textGroup={<FontAwesomeIcon icon={faUser} />}
          />
          <FormInput
            label={t("Password")}
            type="password"
            name="password"
            placeholder="Password"
            containerClass={"mb-3"}
            textGroup={<FontAwesomeIcon icon={faLock} />}
          ></FormInput>
          {/* <div className="d-flex justify-content-between align-items-center mb-3">
            <FormInput
              label={t("Remember me")}
              type="checkbox"
              name="keepLogin"
            ></FormInput>
            <Button variant="link" style={{ textDecoration: "none" }}>
              {t("Forgot password?")}
            </Button>
          </div> */}
          <br />
          <div className="text-center d-grid">
            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting}
              className="btn-login"
            >
              {t("Log In").toUpperCase()}
            </Button>
          </div>
        </VerticalForm>
      </AuthLayout>
    </>
  );
};

export default Login;
