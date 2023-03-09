import { SideBarTypes } from "utils/constants";
import { LayoutActionType } from "./actions";
import { LayoutActionTypes, LayoutStateTypes } from "./constants";


const INIT_STATE = {
  leftSideBarType: SideBarTypes.LEFT_SIDEBAR_TYPE_DEFAULT,
};

const Layout = (
  state: LayoutStateTypes = INIT_STATE,
  action: LayoutActionType<string | boolean | null>
) => {
  switch (action.type) {
    case LayoutActionTypes.CHANGE_SIDEBAR_TYPE:
      return {
        ...state,
        leftSideBarType: action.payload,
      };
    default:
      return state;
  }
};

export default Layout;
