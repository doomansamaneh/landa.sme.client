import { useDataGridMenu } from "../../_shared/menus/useDataGridMenu";
import { menuItems } from "src/constants/menuItems";
import { menuItemType } from "src/constants";

export function useInvoiceDataGridMenu(context) {
  const hasId = !!context.activeRow?.id;
  const hasSelection = context.selectedIds?.length > 0;

  const baseMenu = useDataGridMenu(context, {
    baseRoute: "sls/invoice",
    permissionPrefix: "sls.invoice",

    overrideItems: {
      create: {
        ...menuItems.create,
        type: menuItemType.moreItem,
        permission: "sls.invoice.create",
        subItems: [
          {
            ...menuItems.defaultItem,
            label: "create",
            icon: "o_add",
            permission: "sls.invoice.create",
            route: "/sls/invoice/create",
          },
          {
            ...menuItems.defaultItem,
            label: "createV2",
            icon: "o_bolt",
            permission: "sls.invoice.create",
            route: "/sls/invoice/createV2",
          },
        ],
      },
      edit: [
        {
          ...menuItems.edit,
          permission: "sls.invoice.edit",
          route: `/sls/invoice/edit/${context.activeRow?.id}`,
          visible: hasId,
        },
        {
          ...menuItems.defaultItem,
          label: "editBatch",
          icon: "o_edit",
          permission: "sls.invoice.edit",
          badgeCount: context.selectedIds?.length,
          handler: () => context.editBatch?.(),
          visible: hasSelection,
        },
      ],
    },

    extraMoreItems: [
      {
        ...menuItems.defaultItem,
        label: "reorder",
        icon: "o_cached",
        permission: "acc.operation.reorder",
        addSeparator: true,
        handler: () => context.reorder?.(),
      },
      {
        ...menuItems.defaultItem,
        label: "cancelInvoice",
        icon: "o_close",
        permission: "sls.invoice.cancelInvoice",
        addSeparator: true,
        handler: () => context.cancelInvoice?.(),
        visible: hasId,
      },
      {
        ...menuItems.defaultItem,
        label: "copyToPurchase",
        icon: "o_shopping_cart",
        permission: "sls.purchase.create",
        route: `/sls/purchase/createFromInvoice/${context.activeRow?.id}`,
        visible: hasId,
      },
      {
        ...menuItems.defaultItem,
        label: "salesReturn",
        icon: "o_undo",
        permission: "sls.salesReturn.create",
        route: `/sls/salesReturn/createFromInvoice/${context.activeRow?.id}`,
        visible: hasId,
        addSeparator: true,
      },
    ],
  });

  return baseMenu;
}
