import React from "react";
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from "react-router-dom";
import { APICore } from "api/axios";
import { Role } from "utils/constants";
import { checkRoles } from "utils/user";

interface PrivateRouteProps {
  component: React.FunctionComponent<RouteProps>;
  roles?: Role[];
}

/**
 * Private Route forces the authorization before the route can be accessed
 * @param {*} param0
 * @returns
 */
const PrivateRoute = ({
  component: Component,
  roles,
  ...rest
}: PrivateRouteProps) => {
  const api = new APICore();

  return (
    <Route
      {...rest}
      render={(props: RouteComponentProps) => {
        if (
          !api.isUserAuthenticated() &&
          !props.location.pathname.startsWith("/auth/login")
        ) {
          const currentUrl = `${props.location.pathname}?${props.location.search}`;
          return (
            <Redirect
              to={`/auth/login?from=${encodeURIComponent(currentUrl)}`}
            />
          );
        }

        // check if route is restricted by role
        if (roles && !checkRoles(roles)) {
          // role not authorised so redirect to home page
          return <Redirect to={{ pathname: "/" }} />;
        }
        // authorised so return component
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
