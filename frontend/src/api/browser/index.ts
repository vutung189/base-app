import { Role } from "../../utils/constants";
import { UserProfile } from "../../utils/type/UserInterface";
let _globalAccessToken = "";
let _globalRefreshToken = "";
let _isLoggingIn = false;
let _globalUserProfile: UserProfile | undefined;

export function getAccessToken() {
  if (_globalAccessToken) return _globalAccessToken;
  const token = localStorage.getItem("accessToken");
  if (token) {
    _globalAccessToken = token;
  }
  return token;
}

export function getRefreshToken() {
  if (_globalRefreshToken) return _globalRefreshToken;
  const token = localStorage.getItem("refreshToken");
  if (token) {
    _globalRefreshToken = token;
  }
  return token;
}

export function getUserId() {
  return _globalUserProfile?.id;
}

export function getUserName() {
  return _globalUserProfile?.userName || "";
}

export function getUserDuties() {
  return _globalUserProfile?.roles;
}

export function isLoggedIn() {
  if (_isLoggingIn) return true;
  return !!getAccessToken();
}

export function setLogin(accessToken: string) {
  localStorage.setItem("accessToken", accessToken);
  _isLoggingIn = true;
  setLoginState(false);
}

function setLoginState(keepLogin: boolean) {
  let expire = "";
  if (keepLogin) {
    expire = "; Expires=Wed, 21 Oct 9999 07:28:00 GMT";
  }
  document.cookie = `login_lms2=1${expire}; path=/`;
}

export function setUserProfile(user: UserProfile) {
  _globalUserProfile = user;
}

export function getUserProfile() {
  return _globalUserProfile;
}

export function getRole() {
  return _globalUserProfile?.roles || [];
}

export function setToken(accessToken: string, refreshToken: string) {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  _globalAccessToken = accessToken;
  _globalRefreshToken = refreshToken;
}

export async function logout() {
  _globalAccessToken = "";
  _globalRefreshToken = "";
  _isLoggingIn = false;
  _globalUserProfile = undefined;
  // document.cookie =
  //   "login_lms2=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
}

export const logoutAndgoToLogin = async () => {
  await logout();
  const currentUrl = window.location.pathname + window.location.search;
  window.location.replace(`/auth/login?from=${encodeURIComponent(currentUrl)}`);
};

export function hasRoleIn(requiredRoles: Role[], givenRoles: Role[]) {
  return givenRoles.some((role) => requiredRoles.includes(role));
}
export function currentUserHasRoleIn(requiredRoles: Role[]) {
  const givenRoles = getRole();
  return hasRoleIn(requiredRoles, givenRoles);
}
export function currentUserHasOnlyRole(role: Role) {
  const currentUserRoles = getRole();
  const hasRole = currentUserRoles.includes(role);
  return (
    hasRole &&
    currentUserRoles.every((r: any) => r === role || r === Role.DEFAULT)
  );
}
