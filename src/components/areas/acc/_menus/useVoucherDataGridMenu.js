import { menuItemType } from "src/constants";
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
      route: `/acc/voucher/copy/${context.activeRow?.id ?? ""}`,
      visible: hasId,
    },
    {
      ...menuItems.delete,
      badgeCount: context.selectedIds?.length,
      handler: () => {
        if (hasSelection && context.deleteBatch) {
          context.deleteBatch(
            context.selectedIds,
            context.reloadData
          );
        } else if (hasId && context.deleteById) {
          context.deleteById(
            context.activeRow.id,
            context.reloadData
          );
        }
      },
      visible: hasId || hasSelection,
    },
    {
      type: menuItemType.moreItem,
      label: "more",
      icon: "o_more",
      subItems: [
        {
          ...menuItems.refresh,
          handler: () => context.reloadData && context.reloadData(),
        },
        {
          label: "reorder",
          icon: "o_cached",
          type: menuItemType.item,
          handler: () =>
            context.reorderHandler && context.reorderHandler(),
          visible: true,
        },
        menuItems.separator,
        {
          ...menuItems.print,
          handler: () => {
            if (context.printHandler && context.activeRow) {
              context.printHandler(context.activeRow.id);
            }
          },
          visible: hasId,
        },
        {
          ...menuItems.printBatch,
          handler: () =>
            context.printBatchHandler && context.printBatchHandler(),
        },
        menuItems.separator,
        {
          ...menuItems.exportExcel,
          handler: () => context.exportAll && context.exportAll(),
        },
        {
          ...menuItems.exportExcelCurrentPage,
          handler: () =>
            context.exportCurrentPage && context.exportCurrentPage(),
        },
      ],
    },
  ];
}
