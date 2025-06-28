import { useDataGridMenu } from "../../_shared/menus/useDataGridMenu";
import { menuItems } from "src/constants/menuItems";

export function useAccountDLDataGridMenu(context) {
  const hasId = !!context.activeRow?.id;
  const hasSelection = context.selectedIds?.length > 0;

  return useDataGridMenu(context, {
    baseRoute: "acc/accountDL",
    permissionPrefix: "acc.accountDL",
    exclude: ["print", "printBatch"],

    overrideItems: {
      copy: [
        {
          ...menuItems.copy,
          permission: "acc.accountDL.create",
          route: `/acc/acountDL/copy/${context.activeRow?.id}`,
          visible: hasId,
        },
        {
          ...menuItems.defaultItem,
          label: "merge",
          icon: "o_merge",
          permission: "acc.accountDL.merge",
          badgeCount: context.selectedIds?.length,
          handler: () => context?.merge?.(),
          visible: hasSelection,
        },
      ],
    },
  });
}
