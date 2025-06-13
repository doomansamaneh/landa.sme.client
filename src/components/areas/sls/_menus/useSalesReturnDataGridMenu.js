import { menuItemType } from "src/constants";
import { menuItems } from "src/constants/menuItems";

export function useSalesReturnDataGridMenu(context) {
  const hasId = !!context.activeRow?.id;
  const hasSelection = context.selectedIds?.length > 0;

  return [
    {
      ...menuItems.create,
      type: menuItemType.moreItem,
      permission: "sls.salesReturn.create",
      subItems: [
        {
          ...menuItems.defaultItem,
          label: "create",
          icon: "o_add",
          permission: "sls.salesReturn.create",
          route: "/sls/salesReturn/create",
        },
        {
          ...menuItems.defaultItem,
          label: "createV2",
          icon: "o_bolt",
          permission: "sls.salesReturn.create",
          route: "/sls/salesReturn/createV2",
          //addSeparator: true,
        },
      ],
    },
    {
      ...menuItems.edit,
      permission: "sls.salesReturn.edit",
      route: `/sls/salesReturn/edit/${context.activeRow?.id}`,
      visible: hasId,
    },
    {
      ...menuItems.defaultItem,
      label: "editBatch",
      icon: "o_edit",
      permission: "sls.salesReturn.edit",
      badgeCount: context.selectedIds?.length,
      handler: () => context.editBatch?.(),
      visible: hasSelection,
    },
    {
      ...menuItems.copy,
      permission: "sls.salesReturn.create",
      route: `/sls/salesReturn/copy/${context.activeRow?.id ?? ""}`,
      visible: hasId,
    },
    {
      ...menuItems.delete,
      permission: "sls.salesReturn.delete",
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
          permission: "sls.salesReturn.print",
          handler: () => context.print?.(),
          visible: hasId,
        },
        {
          ...menuItems.printBatch,
          permission: "sls.salesReturn.print",
          addSeparator: true,
          handler: () => context.printBatch?.(),
        },
        {
          ...menuItems.exportExcel,
          permission: "sls.salesReturn.export",
          handler: () => context.exportAll?.(),
        },
        {
          ...menuItems.exportExcelCurrentPage,
          permission: "sls.salesReturn.export",
          handler: () => context.exportCurrentPage?.(),
        },
      ],
    },
  ];
}
