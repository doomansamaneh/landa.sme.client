import { menuItemType } from "src/constants";
import { menuItems } from "src/constants/menuItems";

export function useQuoteDataGridMenu(context) {
  const hasId = !!context.activeRow?.id;
  const hasSelection = context.selectedIds?.length > 0;

  return [
    {
      ...menuItems.create,
      type: menuItemType.moreItem,
      permission: "sls.quote.create",
      subItems: [
        {
          ...menuItems.defaultItem,
          label: "create",
          icon: "o_add",
          permission: "sls.quote.create",
          route: "/sls/quote/create",
        },
        {
          ...menuItems.defaultItem,
          label: "createV2",
          icon: "o_bolt",
          permission: "sls.quote.create",
          route: "/sls/quote/createV2",
          //addSeparator: true,
        },
      ],
    },
    {
      ...menuItems.edit,
      permission: "sls.quote.edit",
      route: `/sls/quote/edit/${context.activeRow?.id}`,
      visible: hasId,
    },
    {
      ...menuItems.defaultItem,
      label: "editBatch",
      icon: "o_edit",
      permission: "sls.quote.edit",
      badgeCount: context.selectedIds?.length,
      handler: () => context.editBatch?.(),
      visible: hasSelection,
    },
    {
      ...menuItems.copy,
      permission: "sls.quote.create",
      route: `/sls/quote/copy/${context.activeRow?.id ?? ""}`,
      visible: hasId,
    },
    {
      ...menuItems.delete,
      permission: "sls.quote.delete",
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
          label: "convertToInvoice",
          icon: "o_receipt",
          permission: "sls.invoice.create",
          route: `/sls/invoice/createFromQuote/${context.activeRow?.id}`,
          visible: hasId,
          addSeparator: true,
        },

        {
          ...menuItems.print,
          permission: "sls.quote.print",
          handler: () => context.print?.(),
          visible: hasId,
        },
        {
          ...menuItems.exportExcel,
          permission: "sls.quote.export",
          handler: () => context.exportAll?.(),
        },
        {
          ...menuItems.exportExcelCurrentPage,
          permission: "sls.quote.export",
          handler: () => context.exportCurrentPage?.(),
        },
      ],
    },
  ];
}
