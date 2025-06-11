import { menuItemType } from "src/constants";
import { menuItems } from "src/constants/menuItems";

export function useInvoiceDataGridMenu(context) {
  const hasId = !!context.activeRow?.id;
  const hasSelection = context.selectedIds?.length > 0;

  return [
    {
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
    {
      ...menuItems.edit,
      permission: "sls.invoice.edit",
      route: `/sls/invoice/edit/${context.activeRow?.id}`,
      visible: hasId,
    },
    {
      ...menuItems.copy,
      permission: "sls.invoice.create",
      route: `/sls/invoice/copy/${context.activeRow?.id ?? ""}`,
      visible: hasId,
    },
    {
      ...menuItems.defaultItem,
      label: "editBatch",
      permission: "sls.invoice.edit",
      badgeCount: context.selectedIds?.length,
      handler: () => context.editBatch?.(),
      visible: hasSelection,
    },
    {
      ...menuItems.delete,
      permission: "sls.invoice.delete",
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
        },
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

        {
          ...menuItems.print,
          permission: "sls.invoice.print",
          handler: () => context.print?.(),
          visible: hasId,
        },
        {
          ...menuItems.printBatch,
          permission: "sls.invoice.print",
          addSeparator: true,
          handler: () => context.printBatch?.(),
        },
        {
          ...menuItems.exportExcel,
          permission: "sls.invoice.export",
          handler: () => context.exportAll?.(),
        },
        {
          ...menuItems.exportExcelCurrentPage,
          permission: "sls.invoice.export",
          handler: () => context.exportCurrentPage?.(),
        },
      ],
    },
  ];
}
