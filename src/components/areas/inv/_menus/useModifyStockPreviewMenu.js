import { usePreviewMenu } from "../../_shared/menus/usePreviewMenu";
import { menuItems } from "src/constants/menuItems";

export function useModifyStockPreviewMenu(context) {
  return usePreviewMenu(context, {
    permissionPrefix: "inv.modifyStock",
    exclude: ["sendMail", "printPdf", "edit", "copy"],

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
