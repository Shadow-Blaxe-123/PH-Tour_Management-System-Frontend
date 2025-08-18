import Bookings from "@/pages/User/Bookings";
import type { ISideBarItems } from "@/types";

export const userSideBarItems: ISideBarItems[] = [
  {
    title: "History",
    items: [
      {
        title: "Bookings",
        url: "/user/bookings",
        component: Bookings,
      },
    ],
  },
];
