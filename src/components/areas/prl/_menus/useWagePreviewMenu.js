import { menuItems } from "src/constants/menuItems";
import { usePreviewMenu } from "../../_shared/menus/usePreviewMenu";

export function useWagePreviewMenu(context) {
  return usePreviewMenu(context, {
    permissionPrefix: "prl.wage",
    exclude: ["sendMail"],

    overrideItems: {
      print: {
        ...menuItems.print,
        permission: `prl.wage.print`,
        handler: () => context.print?.(),
        visible: true,
      },
      more: {
        ...menuItems.more,
        permission: `prl.wage.print`,
        subItems: [
          {
            ...menuItems.exportExcel,
            permission: `prl.wage.export`,
            handler: () => context.exportAll?.(),
            addSeparator: true,
          },
          {
            ...menuItems.defaultItem,
            label: "downloadInsurrance",
            icon: "o_save",
            permission: `prl.wage.print`,
            handler: () => context.exportInsurance?.(),
            visible: true,
          },
          {
            ...menuItems.defaultItem,
            label: "downloadTax",
            icon: "o_save",
            permission: `prl.wage.print`,
            handler: () => context.exportTax?.(),
            visible: true,
          },
        ],
      },
    },
  });
}
