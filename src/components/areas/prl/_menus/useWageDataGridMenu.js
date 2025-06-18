import { useDataGridMenu } from "../../_shared/menus/useDataGridMenu";
import { menuItems } from "src/constants/menuItems";

export function useWageDataGridMenu(context) {
  return useDataGridMenu(context, {
    baseRoute: "prl/wage",
    permissionPrefix: "prl.wage",

    extraMoreItems: [
      {
        ...menuItems.defaultItem,
        label: "downloadInsurrance",
        icon: "o_description",
        permission: "prl.wage.export",
        handler: () => context.exportInsurance?.(),
        visible: !!context.activeRow?.id,
      },
      {
        ...menuItems.defaultItem,
        label: "downloadTax",
        icon: "o_description",
        permission: "prl.wage.export",
        handler: () => context.exportTax?.(),
        addSeparator: true,
        visible: !!context.activeRow?.id,
      },
    ],
  });
}
