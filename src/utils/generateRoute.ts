import type { ISideBarItems } from "@/types";

export default function generateRoute(sideBarItems: ISideBarItems[]) {
  return sideBarItems.flatMap((section) =>
    section.items.map((item) => ({
      path: item.url,
      Component: item.component,
    }))
  );
}
