import { Role } from "../constants";

export interface UserProfile {
  id: string;
  roles: Role[];
  userName: string;
}
