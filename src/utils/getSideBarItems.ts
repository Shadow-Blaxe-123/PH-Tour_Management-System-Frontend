import { role } from "@/constants/role";
import { adminSideBarItems } from "@/routes/adminSideBarItems";
import { userSideBarItems } from "@/routes/userSideBarItems";
import type { TRole } from "@/types";

export const getSideBarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.ADMIN:
      return [...adminSideBarItems];
    case role.SUPER_ADMIN:
      return [...adminSideBarItems];

    case role.USER:
      return [...userSideBarItems];
    default:
      break;
  }
};
