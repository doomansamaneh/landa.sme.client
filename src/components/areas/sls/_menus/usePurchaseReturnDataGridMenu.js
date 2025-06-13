import { menuItemType } from "src/constants";
import { menuItems } from "src/constants/menuItems";

export function usePurchaseReturnDataGridMenu(context) {
  const hasId = !!context.activeRow?.id;
  const hasSelection = context.selectedIds?.length > 0;

  return [
    {
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
          //addSeparator: true,
        },
      ],
    },
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
    {
      ...menuItems.copy,
      permission: "sls.purchaseReturn.create",
      route: `/sls/purchaseReturn/copy/${
        context.activeRow?.id ?? ""
      }`,
      visible: hasId,
    },
    {
      ...menuItems.delete,
      permission: "sls.purchaseReturn.delete",
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
          ...menuItems.print,
          permission: "sls.purchaseReturn.print",
          handler: () => context.print?.(),
          visible: hasId,
        },
        {
          ...menuItems.printBatch,
          permission: "sls.purchaseReturn.print",
          addSeparator: true,
          handler: () => context.printBatch?.(),
        },
        {
          ...menuItems.exportExcel,
          permission: "sls.purchaseReturn.export",
          handler: () => context.exportAll?.(),
        },
        {
          ...menuItems.exportExcelCurrentPage,
          permission: "sls.purchaseReturn.export",
          handler: () => context.exportCurrentPage?.(),
        },
      ],
    },
  ];
}
