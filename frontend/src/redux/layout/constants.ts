// constants

import { SideBarTypes } from "utils/constants";

  
  enum LayoutActionTypes {
    CHANGE_SIDEBAR_TYPE = "@@layout/CHANGE_SIDEBAR_TYPE",
  }
  
  export interface LayoutStateTypes {
    leftSideBarType: SideBarTypes;
  }
  
  export { LayoutActionTypes };
  