import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import SimpleBar from "simplebar-react";
import classNames from "classnames";
import profilePic from "../../assets/images/users/user-1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//interface
import { NotificationItem } from "../layouts/Topbar";
import { faBell } from "@fortawesome/free-regular-svg-icons";

// notifiaction continer styles
const notificationContainerStyle = {
  maxHeight: "230px",
  display: "none",
};

const notificationShowContainerStyle = {
  maxHeight: "230px",
};

// get the notifications
const Notifications: NotificationItem[] = [
  {
    id: 1,
    text: "Cristina Pride",
    subText: "Hi, How are you? What about our next meeting",
    avatar: profilePic,
  },
  {
    id: 2,
    text: "Caleb Flakelar commented on Admin",
    subText: "1 min ago",
    icon: "mdi mdi-comment-account-outline",
    bgColor: "primary",
  },
  {
    id: 3,
    text: "Karen Robinson",
    subText: "Wow ! this admin looks good and awesome design",
    avatar: profilePic,
  },
  {
    id: 4,
    text: "New user registered.",
    subText: "5 hours ago",
    icon: "mdi mdi-account-plus",
    bgColor: "warning",
  },
  {
    id: 5,
    text: "Caleb Flakelar commented on Admin",
    subText: "1 min ago",
    icon: "mdi mdi-comment-account-outline",
    bgColor: "info",
  },
  {
    id: 6,
    text: "Carlos Crouch liked Admin",
    subText: "13 days ago",
    icon: "mdi mdi-heart",
    bgColor: "secondary",
  },
];

interface NotificationContainerStyle {
  maxHeight?: string;
  display?: string;
}

const NotificationDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [notificationContentStyle, setNotificationContentStyles] =
    useState<NotificationContainerStyle>(notificationContainerStyle);

  /*
   * toggle notification-dropdown
   */
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    setNotificationContentStyles(
      notificationContentStyle === notificationContainerStyle
        ? notificationShowContainerStyle
        : notificationContainerStyle
    );
  };

  return (
    <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
      <Dropdown.Toggle
        id="dropdown-notification"
        as="a"
        onClick={toggleDropdown}
        className={classNames("nav-link waves-effect waves-light", {
          show: dropdownOpen,
        })}
      >
        <FontAwesomeIcon icon={faBell} />
        <span className="badge bg-danger rounded-circle noti-icon-badge">
          9
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu dropdown-menu-end dropdown-menu-animated dropdown-lg">
        <div onClick={toggleDropdown}>
          <div className="dropdown-item noti-title">
            <h5 className="m-0">
              <span className="float-end">
                <Link to="#" className="text-dark">
                  <small>Clear All</small>
                </Link>
              </span>
              Notification
            </h5>
          </div>
          <SimpleBar style={notificationContentStyle} className="overflow-auto">
            {(Notifications || []).map((item, i) => {
              return (
                <Link
                  to="#"
                  className="dropdown-item notify-item"
                  key={i + "-noti"}
                >
                  {item.avatar ? (
                    <>
                      <div className="notify-icon">
                        <img
                          src={item.avatar}
                          alt=""
                          className="img-fluid rounded-circle"
                        />
                      </div>
                      <p className="notify-details">{item.text}</p>
                      <p className="text-muted mb-0 user-msg">
                        <small>{item.subText}</small>
                      </p>
                    </>
                  ) : (
                    <>
                      <div className={`notify-icon bg-${item.bgColor}`}>
                        <i className={item.icon}></i>
                      </div>
                      <p className="notify-details">
                        {item.text}{" "}
                        <small className="text-muted">{item.subText}</small>
                      </p>
                    </>
                  )}
                </Link>
              );
            })}
          </SimpleBar>

          <Link
            to="#"
            className="dropdown-item text-center text-primary notify-item notify-all"
          >
            View All <i className="fe-arrow-right"></i>
          </Link>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NotificationDropdown;
