import { LayoutActionTypes } from "./constants";

export interface LayoutActionType<TPayload> {
    type:
      | LayoutActionTypes.CHANGE_SIDEBAR_TYPE,
    payload?: TPayload;
  }

export const changeSidebarType = (
    sidebarType: string
  ): LayoutActionType<string> => ({
    type: LayoutActionTypes.CHANGE_SIDEBAR_TYPE,
    payload: sidebarType,
  });