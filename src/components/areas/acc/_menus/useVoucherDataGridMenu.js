import { useDataGridMenu } from "../../_shared/menus/useDataGridMenu";
import { menuItems } from "src/constants/menuItems";

export function useVoucherDataGridMenu(context) {
  return useDataGridMenu(context, {
    baseRoute: "acc/voucher",
    permissionPrefix: "acc.voucher",

    extraMoreItems: [
      {
        ...menuItems.defaultItem,
        label: "reorder",
        icon: "o_cached",
        permission: "acc.operation.reorder",
        addSeparator: true,
        handler: () => context.reorder?.(),
      },
    ],
  });
}
