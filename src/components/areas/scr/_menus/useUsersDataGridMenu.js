import { useDataGridMenu } from "../../_shared/menus/useDataGridMenu";
import { menuItems } from "src/constants/menuItems";

export function useUsersDataGridMenu(context) {
  return useDataGridMenu(context, {
    permissionPrefix: "scr.users",
    overrideItems: {
      edit: {
        ...menuItems.defaultItem,
        label: "inviteUser",
        icon: "person_add",
        class: "primary-gradient primary-shadow text-white",
        route: `/${context?.baseRoute}/create`,
        visible: true,
      },
    },
    exclude: ["create"],
  });
}
