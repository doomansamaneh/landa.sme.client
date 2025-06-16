import { useDataGridMenu } from "../../_shared/menus/useDataGridMenu";
import { menuItemType } from "src/constants";
import { menuItems } from "src/constants/menuItems";

export function usePurchaseReturnDataGridMenu(context) {
  const hasId = !!context.activeRow?.id;
  const hasSelection = context.selectedIds?.length > 0;

  return useDataGridMenu(context, {
    baseRoute: "sls/purchaseReturn",
    permissionPrefix: "sls.purchaseReturn",

    overrideItems: {
      create: {
        ...menuItems.create,
        type: menuItemType.moreItem,
        permission: "sls.purchaseReturn.create",
        subItems: [
          {
            ...menuItems.defaultItem,
            label: "create",
            icon: "o_add",
            permission: "sls.purchaseReturn.create",
            route: "/sls/purchaseReturn/create",
          },
          {
            ...menuItems.defaultItem,
            label: "createV2",
            icon: "o_bolt",
            permission: "sls.purchaseReturn.create",
            route: "/sls/purchaseReturn/createV2",
          },
        ],
      },

      edit: [
        {
          ...menuItems.edit,
          permission: "sls.purchaseReturn.edit",
          route: `/sls/purchaseReturn/edit/${context.activeRow?.id}`,
          visible: hasId,
        },
        {
          ...menuItems.defaultItem,
          label: "editBatch",
          icon: "o_edit",
          permission: "sls.purchaseReturn.edit",
          badgeCount: context.selectedIds?.length,
          handler: () => context.editBatch?.(),
          visible: hasSelection,
        },
      ],
    },
  });
}
