import { Route, RouteProps } from "react-router-dom";

import { lazy as lazyReact } from "react";
import PrivateRoute from "./PrivateRoute";
import Root from "./Root";

// try to fix chunk error
const lazy = (componentImport: any) =>
  lazyReact(async () => {
    try {
      const component = await componentImport();
      return component;
    } catch (error) {
      return window.location.reload();
    }
  });

// components

// lazy load all the views

// auth
const Login = lazy(() => import("pages/auth/Login"));
const Logout = lazy(() => import("pages/auth/Logout"));

// extra pages
const Error404 = lazy(() => import("pages/error/Error404"));
const Error500 = lazy(() => import("pages/error/Error500"));

const Profile = lazy(() => import("pages/profile"));
const List = lazy(() => import("pages/screen"));
const Detail = lazy(() => import("pages/screen/detail"));
const Report = lazy(() => import("pages/screen/report"));

export interface RoutesProps {
  path: RouteProps["path"];
  name?: string;
  component?: RouteProps["component"];
  route?: any;
  exact?: RouteProps["exact"];
  icon?: string;
  header?: string;
  roles?: string[];
  children?: RoutesProps[];
}

export const AuthRoutes = {
  Login: "/auth/login",
  Logout: "/auth/logout",
};

export const ErrorRoutes = {
  Error404: "/error-404",
  Error500: "/error-500",
};

export const ProfileRoutes = {
  MyProfile: "/apps/my-profile",
};

export const ScreenRoutes = {
  List: "/apps/list",
  Detail: "/apps/list/:id",
  Report: "/apps/report",
};

// root routes
const rootRoute: RoutesProps = {
  path: "/",
  exact: true,
  component: () => <Root />,
  route: Route,
};
// root routes
const dashboardRoute: RoutesProps = {
  path: ScreenRoutes.List,
  exact: true,
  component: List,
  route: PrivateRoute,
};
// root routes
const invalidUrlRoute: RoutesProps = {
  path: "*",
  exact: true,
  component: () => <Root />,
  route: Route,
};

// ====================================

const profileAppRouter = {
  path: ProfileRoutes.MyProfile,
  name: "My Profile",
  route: PrivateRoute,
  component: Profile,
};

const configuarationAppRouter = {
  path: ScreenRoutes.List,
  name: "Screen",
  route: PrivateRoute,
  children: [
    {
      path: ScreenRoutes.Detail,
      name: "Detail",
      component: Detail,
      route: PrivateRoute,
    },
    {
      path: ScreenRoutes.List,
      name: "Search",
      component: List,
      route: PrivateRoute,
    },
    {
      path: ScreenRoutes.Report,
      name: "Report",
      component: Report,
      route: PrivateRoute,
    },
  ],
};
// curriculum
const appRoutes = [configuarationAppRouter, profileAppRouter];

// auth
const authRoutes: RoutesProps[] = [
  {
    path: AuthRoutes.Login,
    name: "Login",
    component: Login,
    route: Route,
  },
  {
    path: AuthRoutes.Logout,
    name: "Logout",
    component: Logout,
    route: Route,
  },
];

// public routes
const otherPublicRoutes = [
  {
    path: ErrorRoutes.Error404,
    name: "Error - 404",
    component: Error404,
    route: Route,
  },
  {
    path: ErrorRoutes.Error404,
    name: "Error - 500",
    component: Error500,
    route: Route,
  },
];

// flatten the list of all nested routes
const flattenRoutes = (routes: RoutesProps[]) => {
  let flatRoutes: RoutesProps[] = [];

  routes = routes || [];
  routes.forEach((item: RoutesProps) => {
    flatRoutes.push(item);

    if (typeof item.children !== "undefined") {
      flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
    }
  });
  return flatRoutes;
};

// All routes
const authProtectedRoutes = [
  rootRoute,
  dashboardRoute,
  ...appRoutes,
  invalidUrlRoute,
];
const publicRoutes = [...authRoutes, ...otherPublicRoutes];

const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes]);
const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes]);
export {
  publicRoutes,
  authProtectedRoutes,
  authProtectedFlattenRoutes,
  publicProtectedFlattenRoutes,
};
