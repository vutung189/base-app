import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getUserName } from "api/browser";
import logoSm from "assets/images/users/user-1.jpg";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { changeSidebarType } from "redux/layout/actions";
import { AppDispatch, RootState } from "redux/store";
import { ProfileRoutes } from "routes";
import { SideBarTypes } from "utils/constants";
import LanguageDropdown from "../common/LanguageDropdown";
import MaximizeScreen from "../common/MaximizeScreen";
import NotificationDropdown from "../common/NotificationDropdown";
import ProfileDropdown from "../common/ProfileDropdown";

export interface NotificationItem {
  id: number;
  subText: string;
  icon?: string;
  avatar?: string;
  bgColor?: string;
  text: string;
}


// get the profilemenu
const ProfileMenus = [
  {
    label: "My Account",
    icon: "fe-user",
    redirectTo: ProfileRoutes.MyProfile,
  },
  {
    label: "Settings",
    icon: "fe-settings",
    redirectTo: "#",
  },
  {
    label: "Lock Screen",
    icon: "fe-lock",
    redirectTo: "/auth/lock-screen",
  },
  {
    label: "Logout",
    icon: "fe-log-out",
    redirectTo: "/auth/login",
  },
];

interface TopbarProps {
  hideLogo?: boolean;
  navCssClasses?: string;
  openLeftMenuCallBack?: () => void;
}

const Topbar = ({
  hideLogo,
  navCssClasses,
  openLeftMenuCallBack,
}: TopbarProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [isopen, setIsopen] = useState<boolean>(false);

  const navbarCssClasses: string = navCssClasses || "";
  const containerCssClasses: string = !hideLogo ? "container-fluid" : "";

  const { leftSideBarType } = useSelector((state: RootState) => ({
    leftSideBarType: state.Layout.leftSideBarType,
  }));

  /**
   * Toggles the left sidebar width
   */
  const toggleLeftSidebarWidth = () => {
    if (leftSideBarType === SideBarTypes.LEFT_SIDEBAR_TYPE_DEFAULT)
      dispatch(changeSidebarType(SideBarTypes.LEFT_SIDEBAR_TYPE_CONDENSED));
    if (leftSideBarType === SideBarTypes.LEFT_SIDEBAR_TYPE_CONDENSED)
      dispatch(changeSidebarType(SideBarTypes.LEFT_SIDEBAR_TYPE_DEFAULT));
  };

  /**
   * Toggle the leftmenu when having mobile screen
   */
  const handleLeftMenuCallBack = () => {
    setIsopen(!isopen);
    toggleLeftSidebarWidth();
    if (openLeftMenuCallBack) openLeftMenuCallBack();
  };

  return (
    <React.Fragment>
      <div className={`navbar-custom ${navbarCssClasses}`}>
        <div className={containerCssClasses}>
          {!hideLogo && (
            <div className="logo-box">
              <Link to="/" className="logo text-center">
                <span className="logo-sm">
                  <img src={logoSm} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logoSm} alt="" height="20" />
                </span>
              </Link>
            </div>
          )}

          <ul className="list-unstyled topnav-menu float-end mb-0">
            <li className="dropdown d-none d-lg-inline-block">
              <MaximizeScreen />
            </li>
            <li className="dropdown d-none d-lg-inline-block topbar-dropdown">
              <LanguageDropdown />
            </li>
            <li className="dropdown notification-list topbar-dropdown">
              <NotificationDropdown />
            </li>
            <li className="dropdown notification-list topbar-dropdown">
              <ProfileDropdown
                profilePic={logoSm}
                menuItems={ProfileMenus}
                username={getUserName()}
                userTitle={"Founder"}
              />
            </li>
          </ul>
          <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
            <li>
              <button
                className="button-menu-mobile open-left d-bolck waves-effect waves-light"
                onClick={handleLeftMenuCallBack}
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Topbar;
