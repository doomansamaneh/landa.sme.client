import { menuItems } from "src/constants/menuItems";

export function useVoucherDataGridMenu(context) {
  const hasId = !!context.activeRow?.id;
  const hasSelection = context.selectedIds?.length > 0;

  return [
    {
      ...menuItems.create,
      permission: "acc.voucher.create",
      route: "/acc/voucher/create",
    },
    {
      ...menuItems.edit,
      permission: "acc.voucher.edit",
      route: `/acc/voucher/edit/${context.activeRow?.id ?? ""}`,
      visible: hasId,
    },
    {
      ...menuItems.copy,
      permission: "acc.voucher.clone",
      route: `/acc/voucher/copy/${context.activeRow?.id ?? ""}`,
      visible: hasId,
    },
    {
      ...menuItems.delete,
      permission: "acc.voucher.delete",
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
          ...menuItems.print,
          permission: "acc.voucher.print",
          handler: () => context.print?.(),
          visible: hasId,
        },
        {
          ...menuItems.printBatch,
          permission: "acc.voucher.print",
          addSeparator: true,
          handler: () => context.printBatch?.(),
        },
        {
          ...menuItems.exportExcel,
          permission: "acc.voucher.export",
          handler: () => context.exportAll?.(),
        },
        {
          ...menuItems.exportExcelCurrentPage,
          permission: "acc.voucher.export",
          handler: () => context.exportCurrentPage?.(),
        },
      ],
    },
  ];
}
