import { useDataGridMenu } from "../../_shared/menus/useDataGridMenu";
import { menuItemType } from "src/constants";
import { menuItems } from "src/constants/menuItems";

export function usePurchaseDataGridMenu(context) {
  const hasId = !!context.activeRow?.id;
  const hasSelection = context.selectedIds?.length > 0;

  return useDataGridMenu(context, {
    baseRoute: "sls/purchase",
    permissionPrefix: "sls.purchase",

    overrideItems: {
      create: {
        ...menuItems.create,
        type: menuItemType.moreItem,
        permission: "sls.purchase.create",
        subItems: [
          {
            ...menuItems.defaultItem,
            label: "create",
            icon: "o_add",
            permission: "sls.purchase.create",
            route: "/sls/purchase/create",
          },
          {
            ...menuItems.defaultItem,
            label: "createV2",
            icon: "o_bolt",
            permission: "sls.purchase.create",
            route: "/sls/purchase/createV2",
          },
        ],
      },

      edit: [
        {
          ...menuItems.edit,
          permission: "sls.purchase.edit",
          route: `/sls/purchase/edit/${context.activeRow?.id}`,
          visible: hasId,
        },
        {
          ...menuItems.defaultItem,
          label: "editBatch",
          icon: "o_edit",
          permission: "sls.purchase.edit",
          badgeCount: context.selectedIds?.length,
          handler: () => context.editBatch?.(),
          visible: hasSelection,
        },
      ],
    },

    extraMoreItems: [
      {
        ...menuItems.defaultItem,
        label: "cancelInvoice",
        icon: "o_close",
        permission: "sls.purchase.cancelInvoice",
        handler: () => context.cancelInvoice?.(),
        visible: hasId,
      },
      {
        ...menuItems.defaultItem,
        label: "copyToSales",
        icon: "o_shopping_cart",
        permission: "sls.invoice.create",
        route: `/sls/invoice/CreateFromPurchase/${context.activeRow?.id}`,
        visible: hasId,
      },
      {
        ...menuItems.defaultItem,
        label: "purchaseReturn",
        icon: "o_undo",
        permission: "sls.purchaseReturn.create",
        route: `/sls/purchaseReturn/createFromPurchase/${context.activeRow?.id}`,
        visible: hasId,
        addSeparator: true,
      },
    ],
  });
}
