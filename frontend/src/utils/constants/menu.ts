import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { ScreenRoutes } from "../../routes";
import { Role } from "../constants";

export interface MenuItemTypes {
  key: string;
  label: string;
  isTitle?: boolean;
  icon?: any;
  url?: string;
  badge?: {
    variant: string;
    text: string;
  };
  parentKey?: string;
  target?: string;
  children?: MenuItemTypes[];
  roles?: Role[];
}

const MENU_ITEMS: MenuItemTypes[] = [
  { key: "navigation", label: "Navigation", isTitle: true },
  {
    key: "apps",
    label: "Screen",
    isTitle: false,
    icon: faEnvelope,
    children: [
      {
        key: "apps-list",
        label: "List",
        url: ScreenRoutes.List,
        parentKey: "apps",
      },
    ],
  },
];

export { MENU_ITEMS };

