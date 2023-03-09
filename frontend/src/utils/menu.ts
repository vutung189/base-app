
import { MenuItemTypes, MENU_ITEMS } from "./constants/menu";
import { checkRoles } from "./user";

const getMenuItemsByRoles = (
  output: MenuItemTypes,
  menus?: MenuItemTypes[]
) => {
  if (!menus || menus.length <= 0) return { ...output, children: undefined };

  const menuFilter: MenuItemTypes[] =
    menus
      ?.filter((item) => !item.roles || checkRoles(item.roles))
      .map((itemMenu) => {
        return getMenuItemsByRoles(
          { ...itemMenu, children: [] },
          itemMenu.children
        );
      }) || [];

  return { ...output, children: menuFilter };
};

const getMenuItems = ():MenuItemTypes[]  => {
  // NOTE - You can fetch from server and return here as well
  return getMenuItemsByRoles({ key: "", label: "" }, MENU_ITEMS).children || [];
};

const findAllParent = (
  menuItems: MenuItemTypes[],
  menuItem: MenuItemTypes
): string[] => {
  let parents: string[] = [];
  const parent = findMenuItem(menuItems, menuItem["parentKey"]);

  if (parent) {
    parents.push(parent["key"]);
    if (parent["parentKey"])
      parents = [...parents, ...findAllParent(menuItems, parent)];
  }

  return parents;
};

const findAllChildren = (
  menuItem: MenuItemTypes
): MenuItemTypes[] => {
  let childKeys: MenuItemTypes[] = [];
  const childs: MenuItemTypes[] = menuItem.children || [];

  for(const child of childs) {
    childKeys.push(child);
    if (child.children) {
      childKeys = [...childKeys, ...findAllChildren(child)];
    }
  }

  return childKeys;
};

const findMenuItem = (
  menuItems: MenuItemTypes[] | undefined,
  menuItemKey: MenuItemTypes["key"] | undefined
): MenuItemTypes | null => {
  if (menuItems && menuItemKey) {
    for (let i = 0; i < menuItems.length; i++) {
      if (menuItems[i].key === menuItemKey) {
        return menuItems[i];
      }
      const found = findMenuItem(menuItems[i].children, menuItemKey);
      if (found) return found;
    }
  }
  return null;
};

/**
 * Changes the body attribute
 */
const changeBodyAttribute = (attribute: string, value: string): void => {
  if (document.body) document.body.setAttribute(attribute, value);
};

export {
  getMenuItems,
  findAllParent,
  findAllChildren,
  findMenuItem,
  changeBodyAttribute,
};
