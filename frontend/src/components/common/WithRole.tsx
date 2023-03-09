import { Role } from "utils/constants";
import { checkRoles } from "utils/user";

const withRole = (roles: Role[]) => (Component: any) => (props: any) => {
  const isAcceptComponent = checkRoles(roles);
  if (isAcceptComponent) {
    return <Component {...props} />
  }
  return null
}

export const withAdminRole = withRole([Role.ADMIN]);

export default withRole;
