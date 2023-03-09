import React from "react";
import { Redirect } from "react-router-dom";
import { APICore } from "api/axios";
import { ScreenRoutes } from "routes";

const Root = () => {
  const api = new APICore();

  const getRootUrl = () => {
    let url = ScreenRoutes.List;

    // check if user logged in or not and return url accordingly
    if (!api.isUserAuthenticated()) {
      url = "/auth/login";
    }
    return url;
  };

  const url = getRootUrl();

  return <Redirect to={`${url}`} />;
};

export default Root;
