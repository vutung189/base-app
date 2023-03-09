import { getRole } from "api/browser";
import { Role } from "./constants";

const checkRoles = (roles: Role[], usersRole?: Role[]): boolean => {
  const rolesUser = usersRole || getRole();
  return !!rolesUser?.find(item => roles.includes(item));
};

export { checkRoles };
