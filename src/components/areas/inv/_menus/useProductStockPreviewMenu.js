import { usePreviewMenu } from "../../_shared/menus/usePreviewMenu";
import { menuItems } from "src/constants/menuItems";

export function useProductStockPreviewMenu(context) {
  return usePreviewMenu(context, {
    permissionPrefix: "inv.productStock",
    overrideItems: {
      edit: {
        ...menuItems.edit,
        label: "modifyStock",
        class: "primary-gradient primary-shadow text-white",
        handler: () => {
          context.modifyStock?.();
        },
        visible: true,
      },
      more: {
        ...menuItems.more,
        subItems: [
          {
            ...menuItems.exportExcel,
            label: "exportExcel",
            icon: "o_download",
            handler: () => {
              context.exportToExcel?.();
            },
            visible: true,
          },
        ],
      },
    },
    exclude: ["copy", "delete", "print", "sendMail"],
  });
}
