import React, { Suspense, useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import { AppDispatch, RootState } from "redux/store";
import { changeBodyAttribute } from "utils/menu";
import { changeSidebarType } from "redux/layout/actions";
import { SideBarTypes } from "utils/constants";

const loading = () => <div className=""></div>;

interface VerticalLayoutProps {
  children?: any;
}

const VerticalLayout = ({ children }: VerticalLayoutProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const { leftSideBarType } = useSelector((state: RootState) => ({
    leftSideBarType: state.Layout.leftSideBarType,
  }));

  useEffect(() => {
    changeBodyAttribute("data-leftbar-size", leftSideBarType);
  }, [leftSideBarType]);

  const updateDimensions = useCallback(() => {
    // activate the condensed sidebar if smaller devices like ipad or tablet
    if (window.innerWidth > 768 && window.innerWidth <= 1028) {
      dispatch(changeSidebarType(SideBarTypes.LEFT_SIDEBAR_TYPE_CONDENSED));
    } else if (window.innerWidth > 1028) {
      dispatch(changeSidebarType(SideBarTypes.LEFT_SIDEBAR_TYPE_DEFAULT));
    }
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [dispatch, updateDimensions]);

  return (
    <>
      <div id="wrapper">
        <Container>
          <Suspense fallback={loading()}>{children}</Suspense>
        </Container>
      </div>
    </>
  );
};
export default VerticalLayout;
