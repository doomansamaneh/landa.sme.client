import { menuItemType } from "src/constants";
import { menuItems } from "src/constants/menuItems";

export function usePurchaseDataGridMenu(context) {
  const hasId = !!context.activeRow?.id;
  const hasSelection = context.selectedIds?.length > 0;

  return [
    {
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
          //addSeparator: true,
        },
      ],
    },
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
    {
      ...menuItems.copy,
      permission: "sls.purchase.create",
      route: `/sls/purchase/copy/${context.activeRow?.id ?? ""}`,
      visible: hasId,
    },
    {
      ...menuItems.delete,
      permission: "sls.purchase.delete",
      badgeCount: context.selectedIds?.length,
      handler: () => {
        if (hasSelection) context.deleteBatch?.();
        else if (hasId) context.deleteById?.();
      },
      visible: hasId || hasSelection,
    },
    {
      ...menuItems.more,
      subItems: [
        {
          ...menuItems.refresh,
          handler: () => context.reloadData?.(),
          addSeparator: true,
        },
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
          route: `/sls/invioce/CreateFromPurchase/${context.activeRow?.id}`,
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

        {
          ...menuItems.print,
          permission: "sls.purchase.print",
          handler: () => context.print?.(),
          visible: hasId,
        },
        {
          ...menuItems.printBatch,
          permission: "sls.purchase.print",
          addSeparator: true,
          handler: () => context.printBatch?.(),
        },
        {
          ...menuItems.exportExcel,
          permission: "sls.purchase.export",
          handler: () => context.exportAll?.(),
        },
        {
          ...menuItems.exportExcelCurrentPage,
          permission: "sls.purchase.export",
          handler: () => context.exportCurrentPage?.(),
        },
      ],
    },
  ];
}
