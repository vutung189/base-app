import { logout } from "api/browser";
import classNames from "classnames";
import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";

interface ProfileMenuItem {
  label: string;
  icon: string;
  redirectTo: string;
}

interface ProfileDropdownProps {
  menuItems: Array<ProfileMenuItem>;
  profilePic?: string;
  username: string;
  userTitle?: string;
}

const ProfileDropdown = (props: ProfileDropdownProps) => {
  const profilePic = props["profilePic"] || null;
  const { t } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const history = useHistory();
  /*
   * toggle profile-dropdown
   */
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
      <Dropdown.Toggle
        id="dropdown-profile"
        as="a"
        onClick={toggleDropdown}
        className={classNames(
          "nav-link nav-user me-0 waves-effect waves-light",
          { show: dropdownOpen }
        )}
      >
        <img src={profilePic!} className="rounded-circle" alt="" />
        <span className="pro-user-name ms-1">
          {props["username"]} <i className="mdi mdi-chevron-down"></i>
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu dropdown-menu-end profile-dropdown">
        <div onClick={toggleDropdown}>
          <div className="dropdown-header noti-title">
            <h6 className="text-overflow m-0">Welcome !</h6>
          </div>
          {(props.menuItems || []).map((item, i) => {
            return (
              <React.Fragment key={i}>
                {i === props["menuItems"].length - 1 && (
                  <div className="dropdown-divider"></div>
                )}
                {item.label === "Logout" ? (
                  <Dropdown.Item
                    as="div"
                    role="button"
                    key={i + "-profile-menu"}
                    className="dropdown-item notify-item"
                    onClick={async (e: React.MouseEvent<HTMLDivElement>) => {
                      e.stopPropagation();
                      await logout();
                      history.replace(item.redirectTo);
                    }}
                  >
                    <span>{t(item.label)}</span>
                  </Dropdown.Item>
                ) : (
                  <Link
                    to={item.redirectTo}
                    className="dropdown-item notify-item"
                    key={i + "-profile-menu"}
                  >
                    <span>{t(item.label)}</span>
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileDropdown;
