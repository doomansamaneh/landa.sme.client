import { useDataGridMenu } from "../menus/useDataGridMenu";
import { menuItems } from "src/constants/menuItems";

export function useBaseInfoDataGridMenu(context, config) {
  const hasSelection = context.selectedIds?.length > 0;
  const permissionPrefix =
    config?.permissionPrefix ?? context.baseRoute?.replace("/", ".");
  return useDataGridMenu(context, {
    baseRoute: context.baseRoute,
    permissionPrefix: permissionPrefix,
    exclude: ["print", "printBatch"],

    extraMoreItems: [
      {
        ...menuItems.defaultItem,
        label: "activate",
        icon: "o_check",
        permission: `${permissionPrefix}.activate`,
        handler: () =>
          config?.crudStore?.activate(
            context.selectedIds,
            context.tableStore?.reloadData
          ),
        visible: hasSelection,
      },
      {
        ...menuItems.defaultItem,
        label: "deactivate",
        icon: "o_clear",
        permission: `${permissionPrefix}.activate`,
        handler: () =>
          config?.crudStore?.deactivate(
            context.selectedIds,
            context.tableStore?.reloadData
          ),
        visible: hasSelection,
        addSeparator: true,
      },
    ],
  });
}
