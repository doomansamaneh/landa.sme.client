import { menuItemType } from "src/constants";
import { menuItems } from "src/constants/menuItems";

export function usePaymentDataGridMenu(context) {
  const hasId = !!context.activeRow?.id;
  const hasSelection = context.selectedIds?.length > 0;

  return [
    {
      ...menuItems.create,
      permission: "trs.payment.create",
      route: "/trs/payment/create",
    },
    {
      ...menuItems.edit,
      permission: "trs.payment.edit",
      route: `/trs/payment/edit/${context.activeRow?.id ?? ""}`,
      visible: hasId,
    },
    {
      ...menuItems.copy,
      permission: "trs.payment.create",
      route: `/trs/payment/copy/${context.activeRow?.id ?? ""}`,
      visible: hasId,
    },
    {
      ...menuItems.delete,
      permission: "trs.payment.delete",
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
          ...menuItems.print,
          permission: "trs.payment.print",
          handler: () => context.print?.(),
          visible: hasId,
        },
        {
          ...menuItems.printBatch,
          permission: "trs.payment.print",
          addSeparator: true,
          handler: () => context.printBatch?.(),
        },
        {
          ...menuItems.exportExcel,
          permission: "trs.payment.export",
          handler: () => context.exportAll?.(),
        },
        {
          ...menuItems.exportExcelCurrentPage,
          permission: "trs.payment.export",
          handler: () => context.exportCurrentPage?.(),
        },
      ],
    },
  ];
}
