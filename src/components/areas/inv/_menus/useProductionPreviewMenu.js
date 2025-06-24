import { usePreviewMenu } from "../../_shared/menus/usePreviewMenu";
import { menuItems } from "src/constants/menuItems";

export function useProductionPreviewMenu(context) {
  return usePreviewMenu(context, {
    permissionPrefix: "inv.production",
    exclude: ["sendMail"],

    overrideItems: {
      edit: {
        ...menuItems.edit,
        class: "primary-gradient primary-shadow text-white",
        route: `/${context.baseRoute}/edit/${context.id}`,
        visible: true,
      },
      copy: {
        ...menuItems.copy,
        route: `/${context.baseRoute}/copy/${context.id}`,
        visible: true,
      },
      delete: {
        ...menuItems.delete,
        handler: () => {
          context.delete?.();
        },
        visible: true,
      },
    },
  });
}
